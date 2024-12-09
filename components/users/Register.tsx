"use client";
import { useState } from "react";
import RegisterForm from "./RegisterForm";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRegister = async (formData: { name: string; email: string; password: string; role: string }) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      setSuccessMessage("Registration successful! You can now log in.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "An error occurred");
      } else {
        setErrorMessage("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Register</h1>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {/* Registration Form */}
      <RegisterForm onSubmit={handleRegister} loading={loading} />
    </div>
  );
}
