/*
  Warnings:

  - You are about to drop the column `acctual` on the `location` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Target` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `location` DROP COLUMN `acctual`,
    ADD COLUMN `actual` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `creatorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `target` ADD COLUMN `creatorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Target` ADD CONSTRAINT `Target_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
