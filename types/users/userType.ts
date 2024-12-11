import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" }),
  repeatPassword: z.string(),
});

export const userSchema = registerSchema.extend({
  role: z.enum(["USER", "ADMIN"], { errorMap: () => ({ message: "Role must be 'USER' or 'ADMIN'" }) }),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords do not match",
  path: ["repeatPassword"], // This marks the `repeatPassword` field as invalid
});

export type RegisterInput = z.infer<typeof registerSchema>;

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "USER" | "ADMIN";
  emailVerified: boolean;
  verificationCode?: string | null;
  createdAt: Date;
  updatedAt: Date;
}