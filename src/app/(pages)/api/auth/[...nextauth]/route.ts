
// import { FailLoginResponse, SuccessLoginResponse } from "@/interfaces";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Eman",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         const response = await fetch(
//           "https://ecommerce.routemisr.com/api/v1/auth/signin",
//           {
//             method: "POST",
//             body: JSON.stringify({
//               email: credentials?.email,
//               password: credentials?.password,
//             }),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const payload: SuccessLoginResponse | FailLoginResponse =
//           await response.json();

//         if ("token" in payload) {
//           return {
//             id: payload.user.email,
//             user: payload.user,
//             token: payload.token,
//           };
//         } else {
//           throw new Error(payload.message);
//         }
//       },
//     }),
//   ],


//   callbacks:{
//     jwt:({token,user})=>{

     
//         if (user) {
//              token.user=user.user,
//       token.token=user.token
            
//         }


//         return token
//     },
//     session:({session , token})=>{
//       session.user=token.user
//       return session
//     }
//   }
// });

// export { handler as GET, handler as POST };









import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { FailLoginResponse, SuccessLoginResponse } from "@/interfaces";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const payload: SuccessLoginResponse | FailLoginResponse = await res.json();

        if ("token" in payload) {
          return {
            id: payload.user.email,
            user: payload.user,
            token: payload.token,
          };
        }
        throw new Error(payload.message);
      },
    }),

    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = (user as any).user;
        token.token = (user as any).token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as any;
      (session as any).token = token.token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
