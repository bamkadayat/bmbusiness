"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    setError("");
    const url = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${url}/api/users/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationCode }),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        // Check if response is JSON
        const contentType = response.headers.get("Content-Type") || "";
        if (contentType.includes("application/json")) {
          const data = await response.json();
          setError(data.error || "Verification failed. Please try again.");
        } else {
          // Handle non-JSON responses
          setError("An unexpected error occurred. Please try again.");
        }
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-9">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Email Verification</h1>
      <p className="mb-4 text-gray-800">
        Please enter the verification code sent to your email:
      </p>
      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="Enter verification code"
        className="w-full p-2 text-gray-800 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <button
        onClick={handleVerify}
        className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition duration-300"
      >
        Verify
      </button>
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}
