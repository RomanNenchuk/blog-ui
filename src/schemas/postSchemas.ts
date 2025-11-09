import z from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title too long"),
  body: z
    .string()
    .min(10, "Body must be at least 10 characters long")
    .max(5000, "Body too long"),
});

export type PostFormData = z.infer<typeof postSchema>;
