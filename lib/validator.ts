import { z } from "zod";

export const myidFormSchema = z.object({
  idTitle: z.string().min(2, "ID Title must be at least 2 characters."),
  idNumber: z.string().min(2, "ID Title must be at least 2 characters."),
  imageUrl: z.string(),
});
