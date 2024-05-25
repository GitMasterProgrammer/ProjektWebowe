/*
  Warnings:

  - You are about to drop the column `basedOnAI` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `cooridnates` on the `location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `location` DROP COLUMN `basedOnAI`,
    DROP COLUMN `cooridnates`,
    ADD COLUMN `coordinates` VARCHAR(191) NULL;
