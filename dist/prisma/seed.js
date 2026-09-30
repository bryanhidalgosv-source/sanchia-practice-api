"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Iniciando seed de base de datos...');
    // ============================================
    // USUARIOS
    // ============================================
    const adminPassword = await bcrypt_1.default.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@sanchia.com' },
        update: {},
        create: {
            email: 'admin@sanchia.com',
            password: adminPassword,
            name: 'Administrador',
            role: 'ADMIN',
        },
    });
    console.log('✅ Usuario admin creado:', admin.email);
    const operatorPassword = await bcrypt_1.default.hash('operador123', 10);
    const operator = await prisma.user.upsert({
        where: { email: 'operador@sanchia.com' },
        update: {},
        create: {
            email: 'operador@sanchia.com',
            password: operatorPassword,
            name: 'Operador de Prueba',
            role: 'OPERATOR',
        },
    });
    console.log('✅ Usuario operador creado:', operator.email);
    const supervisorPassword = await bcrypt_1.default.hash('supervisor123', 10);
    const supervisor = await prisma.user.upsert({
        where: { email: 'supervisor@sanchia.com' },
        update: {},
        create: {
            email: 'supervisor@sanchia.com',
            password: supervisorPassword,
            name: 'Supervisor de Producción',
            role: 'SUPERVISOR',
        },
    });
    console.log('✅ Usuario supervisor creado:', supervisor.email);
    // ============================================
    // ALMACENES
    // ============================================
    const warehouse1 = await prisma.warehouse.upsert({
        where: { code: 'ALM-001' },
        update: {},
        create: {
            name: 'Almacén Principal',
            code: 'ALM-001',
            location: 'Planta 1 - Zona A',
        },
    });
    console.log('✅ Almacén creado:', warehouse1.name);
    const warehouse2 = await prisma.warehouse.upsert({
        where: { code: 'ALM-002' },
        update: {},
        create: {
            name: 'Almacén de Materias Primas',
            code: 'ALM-002',
            location: 'Planta 1 - Zona B',
        },
    });
    console.log('✅ Almacén creado:', warehouse2.name);
    const warehouse3 = await prisma.warehouse.upsert({
        where: { code: 'ALM-003' },
        update: {},
        create: {
            name: 'Almacén de Productos Terminados',
            code: 'ALM-003',
            location: 'Planta 2 - Zona C',
        },
    });
    console.log('✅ Almacén creado:', warehouse3.name);
    // ============================================
    // MATERIALES
    // ============================================
    const material1 = await prisma.material.upsert({
        where: { code: 'MAT-001' },
        update: {},
        create: {
            name: 'Resina Plástica HDPE',
            code: 'MAT-001',
            description: 'Polietileno de alta densidad para moldeo',
            unit: 'KG',
            minStock: 100,
        },
    });
    console.log('✅ Material creado:', material1.name);
    const material2 = await prisma.material.upsert({
        where: { code: 'MAT-002' },
        update: {},
        create: {
            name: 'Pigmento Azul',
            code: 'MAT-002',
            description: 'Colorante concentrado para plástico',
            unit: 'L',
            minStock: 20,
        },
    });
    console.log('✅ Material creado:', material2.name);
    const material3 = await prisma.material.upsert({
        where: { code: 'MAT-003' },
        update: {},
        create: {
            name: 'Pigmento Rojo',
            code: 'MAT-003',
            description: 'Colorante concentrado para plástico',
            unit: 'L',
            minStock: 15,
        },
    });
    console.log('✅ Material creado:', material3.name);
    const material4 = await prisma.material.upsert({
        where: { code: 'MAT-004' },
        update: {},
        create: {
            name: 'Aditivo UV',
            code: 'MAT-004',
            description: 'Protector contra rayos ultravioleta',
            unit: 'KG',
            minStock: 5,
        },
    });
    console.log('✅ Material creado:', material4.name);
    const material5 = await prisma.material.upsert({
        where: { code: 'MAT-005' },
        update: {},
        create: {
            name: 'Tapa Plástica 500ml',
            code: 'MAT-005',
            description: 'Tapa rosca para envases de 500ml',
            unit: 'UNIDAD',
            minStock: 500,
        },
    });
    console.log('✅ Material creado:', material5.name);
    // ============================================
    // STOCK EN ALMACENES
    // ============================================
    await prisma.warehouseMaterial.upsert({
        where: { warehouseId_materialId: { warehouseId: warehouse1.id, materialId: material1.id } },
        update: {},
        create: { warehouseId: warehouse1.id, materialId: material1.id, quantity: 500 },
    });
    await prisma.warehouseMaterial.upsert({
        where: { warehouseId_materialId: { warehouseId: warehouse1.id, materialId: material2.id } },
        update: {},
        create: { warehouseId: warehouse1.id, materialId: material2.id, quantity: 50 },
    });
    await prisma.warehouseMaterial.upsert({
        where: { warehouseId_materialId: { warehouseId: warehouse2.id, materialId: material3.id } },
        update: {},
        create: { warehouseId: warehouse2.id, materialId: material3.id, quantity: 30 },
    });
    await prisma.warehouseMaterial.upsert({
        where: { warehouseId_materialId: { warehouseId: warehouse2.id, materialId: material4.id } },
        update: {},
        create: { warehouseId: warehouse2.id, materialId: material4.id, quantity: 10 },
    });
    await prisma.warehouseMaterial.upsert({
        where: { warehouseId_materialId: { warehouseId: warehouse3.id, materialId: material5.id } },
        update: {},
        create: { warehouseId: warehouse3.id, materialId: material5.id, quantity: 2000 },
    });
    console.log('✅ Stock agregado a almacenes');
    // ============================================
    // PRODUCTOS
    // ============================================
    const product1 = await prisma.product.upsert({
        where: { code: 'PROD-001' },
        update: {},
        create: {
            name: 'Envase Plástico 500ml Azul',
            code: 'PROD-001',
            description: 'Envase de 500ml con tapa, color azul',
            price: 0.75,
        },
    });
    console.log('✅ Producto creado:', product1.name);
    const product2 = await prisma.product.upsert({
        where: { code: 'PROD-002' },
        update: {},
        create: {
            name: 'Envase Plástico 500ml Rojo',
            code: 'PROD-002',
            description: 'Envase de 500ml con tapa, color rojo',
            price: 0.75,
        },
    });
    console.log('✅ Producto creado:', product2.name);
    const product3 = await prisma.product.upsert({
        where: { code: 'PROD-003' },
        update: {},
        create: {
            name: 'Envase Plástico 1L Transparente',
            code: 'PROD-003',
            description: 'Envase de 1 litro transparente con tapa',
            price: 1.00,
        },
    });
    console.log('✅ Producto creado:', product3.name);
    const product4 = await prisma.product.upsert({
        where: { code: 'PROD-004' },
        update: {},
        create: {
            name: 'Botella Deportiva 750ml',
            code: 'PROD-004',
            description: 'Botella deportiva con tapa deportiva',
            price: 1.50,
        },
    });
    console.log('✅ Producto creado:', product4.name);
    // ============================================
    // RECETAS
    // ============================================
    const recipe1 = await prisma.recipe.create({
        data: {
            productId: product1.id,
            name: 'Receta Envase Azul 500ml',
            version: '1.0',
            items: {
                create: [
                    { materialId: material1.id, quantity: 0.05, unit: 'KG' },
                    { materialId: material2.id, quantity: 0.002, unit: 'L' },
                    { materialId: material4.id, quantity: 0.001, unit: 'KG' },
                    { materialId: material5.id, quantity: 1, unit: 'UNIDAD' },
                ],
            },
        },
    });
    console.log('✅ Receta creada:', recipe1.name);
    const recipe2 = await prisma.recipe.create({
        data: {
            productId: product2.id,
            name: 'Receta Envase Rojo 500ml',
            version: '1.0',
            items: {
                create: [
                    { materialId: material1.id, quantity: 0.05, unit: 'KG' },
                    { materialId: material3.id, quantity: 0.002, unit: 'L' },
                    { materialId: material4.id, quantity: 0.001, unit: 'KG' },
                    { materialId: material5.id, quantity: 1, unit: 'UNIDAD' },
                ],
            },
        },
    });
    console.log('✅ Receta creada:', recipe2.name);
    const recipe3 = await prisma.recipe.create({
        data: {
            productId: product3.id,
            name: 'Receta Envase 1L Transparente',
            version: '1.0',
            items: {
                create: [
                    { materialId: material1.id, quantity: 0.08, unit: 'KG' },
                    { materialId: material4.id, quantity: 0.0015, unit: 'KG' },
                ],
            },
        },
    });
    console.log('✅ Receta creada:', recipe3.name);
    // ============================================
    // PLANES DE PRODUCCIÓN
    // ============================================
    const plan1 = await prisma.productionPlan.create({
        data: {
            productId: product1.id,
            quantity: 1000,
            status: 'COMPLETED',
            startDate: new Date('2026-09-20'),
            endDate: new Date('2026-09-25'),
            notes: 'Producción completada sin novedad',
        },
    });
    console.log('✅ Plan de producción creado:', plan1.id);
    const plan2 = await prisma.productionPlan.create({
        data: {
            productId: product2.id,
            quantity: 500,
            status: 'IN_PROGRESS',
            startDate: new Date('2026-09-28'),
            notes: 'Producción en curso',
        },
    });
    console.log('✅ Plan de producción creado:', plan2.id);
    const plan3 = await prisma.productionPlan.create({
        data: {
            productId: product3.id,
            quantity: 2000,
            status: 'DRAFT',
            notes: 'Pendiente de aprobación',
        },
    });
    console.log('✅ Plan de producción creado:', plan3.id);
    // ============================================
    // RESULTADOS DE PRODUCCIÓN
    // ============================================
    await prisma.productionResult.create({
        data: {
            planId: plan1.id,
            quantity: 980,
            defective: 20,
            notes: '20 unidades defectuosas por mal sellado',
        },
    });
    console.log('✅ Resultado de producción agregado');
    await prisma.productionResult.create({
        data: {
            planId: plan2.id,
            quantity: 300,
            defective: 5,
            notes: 'Primer lote completado',
        },
    });
    console.log('✅ Resultado de producción agregado');
    // ============================================
    // MOVIMIENTOS DE STOCK
    // ============================================
    await prisma.stockMovement.create({
        data: {
            materialId: material1.id,
            warehouseId: warehouse1.id,
            type: 'ENTRY',
            quantity: 500,
            reason: 'Compra inicial de resina',
        },
    });
    await prisma.stockMovement.create({
        data: {
            materialId: material2.id,
            warehouseId: warehouse1.id,
            type: 'ENTRY',
            quantity: 50,
            reason: 'Compra de pigmento azul',
        },
    });
    await prisma.stockMovement.create({
        data: {
            materialId: material1.id,
            warehouseId: warehouse1.id,
            type: 'EXIT',
            quantity: 50,
            reason: 'Producción plan 001',
        },
    });
    console.log('✅ Movimientos de stock agregados');
    console.log('');
    console.log('🎉 Seed completado!');
    console.log('');
    console.log('📋 Credenciales de prueba:');
    console.log('   Admin:      admin@sanchia.com / admin123');
    console.log('   Operador:   operador@sanchia.com / operador123');
    console.log('   Supervisor: supervisor@sanchia.com / supervisor123');
    console.log('');
    console.log('📊 Datos creados:');
    console.log('   - 3 usuarios');
    console.log('   - 3 almacenes');
    console.log('   - 5 materiales');
    console.log('   - 4 productos');
    console.log('   - 3 recetas');
    console.log('   - 3 planes de producción');
    console.log('   - 2 resultados de producción');
    console.log('   - 3 movimientos de stock');
}
main()
    .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map