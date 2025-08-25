import { z } from 'zod';

export const plantCreateSchema = z.object({
  name: z.string().min(1).max(200),
  price: z.number().nonnegative(),
  categories: z.array(z.string().min(1)).min(1),
  available: z.boolean(),
});

export type PlantCreateInput = z.infer<typeof plantCreateSchema>;

export const plantQuerySchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  available: z
    .string()
    .transform((v) => (v === undefined ? undefined : v === 'true'))
    .optional(),
  page: z
    .string()
    .transform((v) => (v ? Math.max(parseInt(v, 10) || 1, 1) : 1))
    .optional(),
  limit: z
    .string()
    .transform((v) => (v ? Math.min(Math.max(parseInt(v, 10) || 20, 1), 100) : 20))
    .optional(),
});

export type PlantQuery = z.infer<typeof plantQuerySchema>;
