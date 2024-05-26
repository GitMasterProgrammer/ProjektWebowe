-- CreateTable
CREATE TABLE `LocationsOnUsers` (
    `userId` INTEGER NOT NULL,
    `locationId` INTEGER NOT NULL,
    `value` INTEGER NOT NULL,
    `likedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`userId`, `locationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LocationsOnUsers` ADD CONSTRAINT `LocationsOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LocationsOnUsers` ADD CONSTRAINT `LocationsOnUsers_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
