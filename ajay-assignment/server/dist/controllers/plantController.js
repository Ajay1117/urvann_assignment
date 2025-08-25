import { Plant } from '../models/Plant.js';
import { plantCreateSchema, plantQuerySchema } from '../utils/validators.js';
export async function listPlants(req, res) {
    const parseResult = plantQuerySchema.safeParse(req.query);
    if (!parseResult.success) {
        return res.status(400).json({ error: 'Invalid query', details: parseResult.error.flatten() });
    }
    const { q, category, available, page = 1, limit = 20 } = parseResult.data;
    const filter = {};
    if (typeof available === 'boolean')
        filter.available = available;
    if (category)
        filter.categories = { $regex: category, $options: 'i' };
    if (q)
        filter.$or = [
            { name: { $regex: q, $options: 'i' } },
            { categories: { $regex: q, $options: 'i' } },
        ];
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
        Plant.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        Plant.countDocuments(filter),
    ]);
    res.json({ items, total, page, limit, pages: Math.ceil(total / limit) });
}
export async function createPlant(req, res) {
    const parseResult = plantCreateSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ error: 'Invalid body', details: parseResult.error.flatten() });
    }
    const payload = parseResult.data;
    const created = await Plant.create(payload);
    res.status(201).json(created);
}
//# sourceMappingURL=plantController.js.map