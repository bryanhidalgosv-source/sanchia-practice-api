-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_recipe_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipeId" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'UNIDAD',
    CONSTRAINT "recipe_items_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "recipe_items_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "materials" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_recipe_items" ("id", "materialId", "quantity", "recipeId", "unit") SELECT "id", "materialId", "quantity", "recipeId", "unit" FROM "recipe_items";
DROP TABLE "recipe_items";
ALTER TABLE "new_recipe_items" RENAME TO "recipe_items";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
