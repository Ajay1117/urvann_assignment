import 'dotenv/config';
import mongoose from 'mongoose';
import { Plant } from '../models/Plant.js';
import { seedPlants } from './plants.data.js';

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set');
  await mongoose.connect(uri);
  await Plant.deleteMany({});
  await Plant.insertMany(seedPlants);
  console.log(`Seeded ${seedPlants.length} plants`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Seed failed', err);
  process.exit(1);
});
