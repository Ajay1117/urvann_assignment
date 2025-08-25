import { Schema, model, type Document } from 'mongoose';

export interface PlantDocument extends Document {
  name: string;
  price: number;
  categories: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PlantSchema = new Schema<PlantDocument>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    categories: { type: [String], required: true, default: [] },
    available: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

PlantSchema.index({ name: 'text', categories: 'text' });
PlantSchema.index({ available: 1 });

export const Plant = model<PlantDocument>('Plant', PlantSchema);
