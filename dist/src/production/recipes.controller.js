"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesController = void 0;
const recipes_service_1 = require("./recipes.service");
const service = new recipes_service_1.RecipesService();
class RecipesController {
    async findAll(_req, res) {
        const recipes = await service.findAll();
        return res.status(200).json({ success: true, data: recipes });
    }
    async findById(req, res) {
        const recipe = await service.findById(req.params.id);
        return res.status(200).json({ success: true, data: recipe });
    }
    async create(req, res) {
        const recipe = await service.create(req.body);
        return res.status(201).json({ success: true, data: recipe });
    }
    async remove(req, res) {
        await service.remove(req.params.id);
        return res.status(200).json({ success: true, message: 'Receta eliminada' });
    }
}
exports.RecipesController = RecipesController;
//# sourceMappingURL=recipes.controller.js.map