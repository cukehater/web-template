/*
  Warnings:

  - Made the column `favicon` on table `Basic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logo` on table `Basic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ogImage` on table `Basic` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Basic" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'basic',
    "companyName" TEXT NOT NULL,
    "representative" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "fax" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "businessNumber" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "favicon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "ogTitle" TEXT NOT NULL,
    "ogDescription" TEXT NOT NULL,
    "ogImage" TEXT NOT NULL,
    "googleAnalyticsId" TEXT NOT NULL,
    "naverWebmasterId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Basic" ("address", "businessNumber", "companyName", "createdAt", "description", "email", "favicon", "fax", "googleAnalyticsId", "id", "industry", "keywords", "logo", "naverWebmasterId", "ogDescription", "ogImage", "ogTitle", "representative", "tel", "title", "updatedAt") SELECT "address", "businessNumber", "companyName", "createdAt", "description", "email", "favicon", "fax", "googleAnalyticsId", "id", "industry", "keywords", "logo", "naverWebmasterId", "ogDescription", "ogImage", "ogTitle", "representative", "tel", "title", "updatedAt" FROM "Basic";
DROP TABLE "Basic";
ALTER TABLE "new_Basic" RENAME TO "Basic";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
