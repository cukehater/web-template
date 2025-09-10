/*
  Warnings:

  - Added the required column `writer` to the `Gallery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writer` to the `General` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gallery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "writer" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Gallery" ("content", "createdAt", "id", "isVisible", "order", "thumbnail", "title", "updatedAt") SELECT "content", "createdAt", "id", "isVisible", "order", "thumbnail", "title", "updatedAt" FROM "Gallery";
DROP TABLE "Gallery";
ALTER TABLE "new_Gallery" RENAME TO "Gallery";
CREATE INDEX "Gallery_order_idx" ON "Gallery"("order");
CREATE INDEX "Gallery_createdAt_idx" ON "Gallery"("createdAt");
CREATE TABLE "new_General" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "writer" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_General" ("content", "createdAt", "id", "isVisible", "order", "title", "updatedAt") SELECT "content", "createdAt", "id", "isVisible", "order", "title", "updatedAt" FROM "General";
DROP TABLE "General";
ALTER TABLE "new_General" RENAME TO "General";
CREATE INDEX "General_order_idx" ON "General"("order");
CREATE INDEX "General_createdAt_idx" ON "General"("createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
