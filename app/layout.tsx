import { cookies } from "next/headers"; 
import { jwtVerify } from "jose";
import StoreProvider from "./storeProvider";
import Header from "@/components/header/Header";
import "./globals.css"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = null;
  let token = null;

  try {
    const cookieStore = await cookies(); 
    token = cookieStore.get("authToken")?.value;

    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      const { payload } = await jwtVerify(token, secret); 
      user = { email: payload.email as string, role: payload.role as string };
    }
  } catch (error) {
    console.error("Failed to verify token:", error);
  }

  return (
    <html lang="en">
      <body>
        <StoreProvider user={user} token={token ?? null}>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
