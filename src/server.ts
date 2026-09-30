import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { env } from '@config/env';
import { errorHandler } from '@middlewares/error.mid';
import authRouter from '@auth/auth.router';
import usersRouter from '@users/users.router';
import warehouseRouter from '@warehouse/warehouse.router';
import materialsRouter from '@warehouse/materials.router';
import productionRouter from '@production/production.router';
import recipesRouter from '@production/recipes.router';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Servir archivos estáticos (la página web)
app.use(express.static(path.join(process.cwd(), 'public')));

// Rutas
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/warehouse', warehouseRouter);
app.use('/api/materials', materialsRouter);
app.use('/api/production', productionRouter);
app.use('/api/recipes', recipesRouter);

// Ruta de salud
app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Manejo de errores (debe ir al final)
app.use(errorHandler);

app.listen(env.PORT, () => {
    console.log(`🚀 Sanchia Practice API corriendo en http://localhost:${env.PORT}`);
    console.log(`📚 Documentación: http://localhost:${env.PORT}/api/health`);
});
