import dotenv from 'dotenv';
dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv === 'production' && !process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET es obligatorio en producción');
}

export const env = {
    PORT: parseInt(process.env.PORT || '3000', 10),
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    SALT: parseInt(process.env.SALT || '10', 10),
    NODE_ENV: nodeEnv,
};
