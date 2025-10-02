import { z } from "zod";

export const schema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters"),

    email: z.string().email("Invalid email format"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),

    rePassword: z.string(),

    phone: z
      .string()
      .regex(/^01[0-9]{9}$/, "Phone must be a valid Egyptian number (11 digits starting with 01)"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"], // يخلي الرسالة تطلع جنب rePassword input
  });
