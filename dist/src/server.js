"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./config/env");
const error_mid_1 = require("./middlewares/error.mid");
const auth_router_1 = __importDefault(require("./auth/auth.router"));
const users_router_1 = __importDefault(require("./users/users.router"));
const warehouse_router_1 = __importDefault(require("./warehouse/warehouse.router"));
const materials_router_1 = __importDefault(require("./warehouse/materials.router"));
const production_router_1 = __importDefault(require("./production/production.router"));
const recipes_router_1 = __importDefault(require("./production/recipes.router"));
const app = (0, express_1.default)();
// Middlewares globales
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Servir archivos estáticos (la página web)
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Rutas
app.use('/api/auth', auth_router_1.default);
app.use('/api/users', users_router_1.default);
app.use('/api/warehouse', warehouse_router_1.default);
app.use('/api/materials', materials_router_1.default);
app.use('/api/production', production_router_1.default);
app.use('/api/recipes', recipes_router_1.default);
// Ruta de salud
app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Manejo de errores (debe ir al final)
app.use(error_mid_1.errorHandler);
app.listen(env_1.env.PORT, () => {
    console.log(`🚀 Sanchia Practice API corriendo en http://localhost:${env_1.env.PORT}`);
    console.log(`📚 Documentación: http://localhost:${env_1.env.PORT}/api/health`);
});
//# sourceMappingURL=server.js.map