
export async function sendRegister(userData: any) {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return await res.json();
}
export async function sendLogin(userData: any) {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return await res.json();
}
