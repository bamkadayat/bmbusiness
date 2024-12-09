"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/lib/types/users/registerSchema";

interface RegisterFormProps {
  onSubmit: (data: { name: string; email: string; password: string; role: string }) => void;
  loading: boolean;
}

export default function RegisterForm({ onSubmit, loading }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleFormSubmit = (data: RegisterFormData) => {
    const { name, email, password, role } = data;
    onSubmit({ name, email, password, role });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 bg-white p-6 shadow rounded-lg">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className={`mt-1 block w-full text-gray-950 rounded-md border p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your name"
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`mt-1 block w-full text-gray-950 rounded-md border p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className={`mt-1 block text-gray-950 w-full rounded-md border p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your password"
        />
        {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
      </div>

      {/* Repeat Password Input */}
      <div>
        <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">
          Repeat Password
        </label>
        <input
          id="repeatPassword"
          type="password"
          {...register("repeatPassword")}
          className={`mt-1 block text-gray-950 w-full rounded-md border p-2 focus:ring-gray-500 focus:border-gray-500 sm:text-sm ${
            errors.repeatPassword ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Repeat your password"
        />
        {errors.repeatPassword && <p className="text-sm text-red-600 mt-1">{errors.repeatPassword.message}</p>}
      </div>

      {/* Role Input */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          id="role"
          {...register("role")}
          className={`mt-1 block text-gray-950 w-full rounded-md border p-2 focus:ring-blue-500 focus:border-gray-500 sm:text-sm ${
            errors.role ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        {errors.role && <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Register"
          )}
        </button>
      </div>
    </form>
  );
}
