/*
  Warnings:

  - The primary key for the `Person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Person` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" DATETIME NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleNames" TEXT,
    "suffix" TEXT,
    "addressId" TEXT,
    "contactInfoId" TEXT,
    CONSTRAINT "Person_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Person_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Person" ("addressId", "contactInfoId", "createdAt", "firstName", "id", "lastName", "lastUpdated", "middleNames", "suffix") SELECT "addressId", "contactInfoId", "createdAt", "firstName", "id", "lastName", "lastUpdated", "middleNames", "suffix" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE UNIQUE INDEX "Person_addressId_key" ON "Person"("addressId");
CREATE UNIQUE INDEX "Person_contactInfoId_key" ON "Person"("contactInfoId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
