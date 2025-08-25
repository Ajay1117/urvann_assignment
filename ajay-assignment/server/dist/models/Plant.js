import { Schema, model } from 'mongoose';
const PlantSchema = new Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    categories: { type: [String], required: true, default: [] },
    available: { type: Boolean, required: true, default: true },
}, { timestamps: true });
PlantSchema.index({ name: 'text', categories: 'text' });
PlantSchema.index({ available: 1 });
export const Plant = model('Plant', PlantSchema);
//# sourceMappingURL=Plant.js.map