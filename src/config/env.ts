import dotenv from 'dotenv';
dotenv.config();

export const env = {
    PORT: parseInt(process.env.PORT || '3000', 10),
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    SALT: parseInt(process.env.SALT || '10', 10),
    NODE_ENV: process.env.NODE_ENV || 'development',
};
