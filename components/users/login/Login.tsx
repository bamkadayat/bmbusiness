"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { loginSuccess } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

import LoginForm from "./LoginForm";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); 
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const result = await response.json();
      dispatch(loginSuccess({ user: { email: result.email }, token: result.token }));

      // Set success message
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/overview"); // Redirect after 2 seconds
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
      {success && <p className="text-center text-green-500 mt-4">{success}</p>}
    </div>
  );
}
