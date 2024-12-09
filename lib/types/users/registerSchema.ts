import { z } from "zod";

// Define Zod Schema for Validation
export const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/\d/, { message: "Password must contain at least one number" }),
    repeatPassword: z.string(),
    role: z.enum(["USER", "ADMIN"], { errorMap: () => ({ message: "Role must be 'USER' or 'ADMIN'" }) }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"], // This marks the `repeatPassword` field as invalid
  });

// Infer TypeScript Types from the Schema
export type RegisterFormData = z.infer<typeof registerSchema>;
