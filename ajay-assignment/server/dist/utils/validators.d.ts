import { z } from 'zod';
export declare const plantCreateSchema: z.ZodObject<{
    name: z.ZodString;
    price: z.ZodNumber;
    categories: z.ZodArray<z.ZodString>;
    available: z.ZodBoolean;
}, z.core.$strip>;
export type PlantCreateInput = z.infer<typeof plantCreateSchema>;
export declare const plantQuerySchema: z.ZodObject<{
    q: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    available: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<boolean | undefined, string>>>;
    page: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
    limit: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>>;
}, z.core.$strip>;
export type PlantQuery = z.infer<typeof plantQuerySchema>;
//# sourceMappingURL=validators.d.ts.map