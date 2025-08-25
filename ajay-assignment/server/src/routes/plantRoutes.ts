import { Router } from 'express';
import { createPlant, listPlants } from '../controllers/plantController.js';

const router = Router();

router.get('/', listPlants);
router.post('/', createPlant);

export default router;
