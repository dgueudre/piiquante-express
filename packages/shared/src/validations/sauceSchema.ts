import { z } from 'zod';

export const sauceSchema = z.object({
  name: z.string().trim().min(1),
  manufacturer: z.string().trim().min(1),
  description: z.string().trim().min(1),
  mainPepper: z.string().trim().min(1),
  heat: z.number().min(1).max(10),
});

export type ISaucePayload = z.infer<typeof sauceSchema>;
