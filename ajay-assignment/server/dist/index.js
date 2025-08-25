import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { connect } from 'mongoose';
import plantRoutes from './routes/plantRoutes.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use('/api/plants', plantRoutes);
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || '';
async function start() {
    try {
        if (!MONGODB_URI)
            throw new Error('MONGODB_URI not set');
        await connect(MONGODB_URI);
        app.listen(PORT, () => {
            console.log(`server listening on :${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
}
start();
export default app;
//# sourceMappingURL=index.js.map