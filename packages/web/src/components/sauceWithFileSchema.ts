import { z } from 'zod';

import { sauceSchema } from '@piiquante/shared';

export const sauceWithFileSchema = sauceSchema.extend({
  file: z.instanceof(FileList).optional(),
});

export type ISauceWithFilePayload = z.infer<typeof sauceWithFileSchema>;
