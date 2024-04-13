-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `reliability` DOUBLE NOT NULL DEFAULT 5,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Target` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TargetsOnUsers` (
    `userId` INTEGER NOT NULL,
    `targetId` INTEGER NOT NULL,
    `likedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userId`, `targetId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` DOUBLE NOT NULL DEFAULT 5,
    `cooridnates` VARCHAR(191) NULL,
    `details` VARCHAR(191) NULL,
    `address` VARCHAR(191) NOT NULL,
    `acctual` BOOLEAN NOT NULL DEFAULT true,
    `basedOnAI` BOOLEAN NOT NULL DEFAULT false,
    `targetId` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TargetsOnUsers` ADD CONSTRAINT `TargetsOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TargetsOnUsers` ADD CONSTRAINT `TargetsOnUsers_targetId_fkey` FOREIGN KEY (`targetId`) REFERENCES `Target`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_targetId_fkey` FOREIGN KEY (`targetId`) REFERENCES `Target`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
