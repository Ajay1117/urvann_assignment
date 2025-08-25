import { type Document } from 'mongoose';
export interface PlantDocument extends Document {
    name: string;
    price: number;
    categories: string[];
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Plant: import("mongoose").Model<PlantDocument, {}, {}, {}, Document<unknown, {}, PlantDocument, {}, {}> & PlantDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Plant.d.ts.map