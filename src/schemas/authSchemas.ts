import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .regex(emailRegex, "Please enter a valid email address");

export const registerSchema = z
  .object({
    fullname: z
      .string()
      .trim()
      .min(1, "Please provide your first name")
      .min(2, "Please enter a valid name")
      .max(50, "Please enter a valid name"),

    email: emailSchema,
    password: passwordSchema,

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const loginShema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginShema>;
