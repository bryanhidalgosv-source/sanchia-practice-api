# Sanchia Practice API 🚀

Mini-ERP de práctica con la **misma arquitectura y patrones** que usarás en Industrias Sanchia.

## 🎯 Objetivo

Prepararte para tu primer día de trabajo (Jueves 1 de Octubre de 2026) practicando con un sistema que replica los patrones reales de Sanchia API.

## 📋 Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| Node.js 22 | Runtime |
| TypeScript 5.1 | Lenguaje |
| Express 4 | Framework HTTP |
| Prisma | ORM |
| SQLite | Base de datos (fácil, sin instalación) |
| JWT | Autenticación |
| Joi | Validación |

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Generar cliente de Prisma
npm run prisma:generate

# 3. Crear base de datos
npm run prisma:migrate

# 4. Cargar datos de prueba
npm run db:seed

# 5. Iniciar servidor
npm run dev
```

## 🔐 Credenciales de Prueba

| Usuario | Email | Contraseña | Rol |
|---------|-------|------------|-----|
| Admin | admin@sanchia.com | admin123 | ADMIN |
| Operador | operador@sanchia.com | operador123 | OPERATOR |

## 📡 Endpoints Principales

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil

### Usuarios
- `GET /api/users` - Listar usuarios
- `POST /api/users` - Crear usuario
- `PATCH /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Almacén
- `GET /api/warehouse` - Listar almacenes
- `POST /api/warehouse` - Crear almacén
- `POST /api/warehouse/add-material` - Agregar material
- `POST /api/warehouse/movements` - Registrar movimiento
- `GET /api/warehouse/movements` - Ver movimientos

### Producción
- `GET /api/production/products` - Listar productos
- `POST /api/production/products` - Crear producto
- `GET /api/production/plans` - Listar planes
- `POST /api/production/plans` - Crear plan
- `PATCH /api/production/plans/:id/status` - Cambiar estado
- `POST /api/production/results` - Registrar resultado

## 🏗️ Arquitectura (Igual que Sanchia)

```
Request → Middleware → Router → Controller → Service → Database → Response
```

| Archivo | Responsabilidad |
|---------|-----------------|
| `*.router.ts` | Define rutas HTTP |
| `*.controller.ts` | Maneja peticiones/respuestas |
| `*.service.ts` | Lógica de negocio |
| `*.validator.ts` | Validación con Joi |

## 📝 Ejercicios para Practicar

### Ejercicio 1: Autenticación
1. Haz login con el usuario admin
2. Copia el token JWT
3. Úsalo para acceder a `/api/auth/profile`

### Ejercicio 2: CRUD de Usuarios
1. Crea un nuevo usuario
2. Lista todos los usuarios
3. Actualiza el usuario creado
4. Elimínalo (soft delete)

### Ejercicio 3: Almacén
1. Crea un nuevo almacén
2. Agrega materiales al almacén
3. Registra una entrada de stock
4. Registra una salida de stock
5. Verifica que el stock se actualizó

### Ejercicio 4: Producción
1. Crea un nuevo producto
2. Crea un plan de producción
3. Cambia el estado a IN_PROGRESS
4. Registra resultados de producción
5. Cambia el estado a COMPLETED

### Ejercicio 5: Roles y Permisos
1. Haz login como operador
2. Intenta crear un usuario (debe fallar)
3. Intenta crear un almacén (debe fallar)
4. Intenta crear un plan de producción (debe funcionar)

## 🔑 Conceptos Clave que Debes Dominar

| Concepto | Descripción |
|----------|-------------|
| **JWT** | Token de autenticación que se envía en cada petición |
| **RBAC** | Control de acceso basado en roles |
| **Soft Delete** | No se borra realmente, se marca con `deletedAt` |
| **Prisma** | ORM que genera código type-safe desde el schema |
| **Joi** | Validación de datos de entrada |
| **Arquitectura en capas** | Router → Controller → Service → DB |

## 📚 Estructura del Proyecto

```
sanchia-practice-api/
├── prisma/
│   ├── schema.prisma          # Modelos de BD
│   └── seed.ts                # Datos de prueba
├── src/
│   ├── server.ts              # Punto de entrada
│   ├── auth/                  # Módulo de autenticación
│   ├── users/                 # Módulo de usuarios
│   ├── warehouse/             # Módulo de almacén
│   ├── production/            # Módulo de producción
│   ├── common/                # Utilidades compartidas
│   ├── middlewares/           # Middlewares
│   └── config/                # Configuraciones
├── package.json
├── tsconfig.json
└── .env
```

## 💡 Tips para tu Primer Día

1. **Pregunta todo** - No te quedes con dudas
2. **Lee el código existente** - Antes de escribir, revisa cómo lo hicieron otros
3. **Sigue los patrones** - No inventes, copia la estructura
4. **Usa TypeScript** - Aprovecha el tipado fuerte
5. **Valida siempre** - Nunca confíes en datos del cliente
6. **Maneja errores** - Usa try/catch y el middleware de errores

## 🆘 Si te atascas

1. Revisa el README de Sanchia: `C:\Users\ADMIN\Desktop\sanchia-api-extracted\sanchia-api\README.md`
2. Busca en el código existente cómo hicieron algo similar
3. Pregunta a tu equipo

---

**¡Buena suerte en tu primer día! 🎉**
