import { z } from 'zod';
import { AdSchema } from '../Ad';

// Define a partial schema for the Zustand store
export const PartialAdSchema = AdSchema.pick({
  _id: true,
  slug: true,
  title: true,
  description: true,
  price: true,
  images: true,
  postedOn: true,
});

export type PartialAd = z.infer<typeof PartialAdSchema>;

