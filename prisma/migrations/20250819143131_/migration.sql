-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'settings',
    "companyName" TEXT NOT NULL,
    "representative" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "fax" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "businessNumber" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "favicon" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "ogTitle" TEXT NOT NULL,
    "ogDescription" TEXT NOT NULL,
    "ogImage" TEXT,
    "googleAnalyticsId" TEXT NOT NULL,
    "naverWebmasterId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Settings" ("address", "businessNumber", "companyName", "createdAt", "description", "email", "favicon", "fax", "googleAnalyticsId", "id", "industry", "keywords", "naverWebmasterId", "ogDescription", "ogImage", "ogTitle", "representative", "tel", "title", "updatedAt") SELECT "address", "businessNumber", "companyName", "createdAt", "description", "email", "favicon", "fax", "googleAnalyticsId", "id", "industry", "keywords", "naverWebmasterId", "ogDescription", "ogImage", "ogTitle", "representative", "tel", "title", "updatedAt" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
