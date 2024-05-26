-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Maj 26, 2024 at 02:13 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bazanapalacza`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `rating` double NOT NULL DEFAULT 5,
  `details` varchar(191) DEFAULT NULL,
  `address` varchar(191) NOT NULL,
  `targetId` int(11) NOT NULL,
  `updatedAt` datetime(3) NOT NULL,
  `actual` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `creatorId` int(11) NOT NULL,
  `coordinates` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `rating`, `details`, `address`, `targetId`, `updatedAt`, `actual`, `createdAt`, `creatorId`, `coordinates`) VALUES
(1, 5, 'fdg', 'gfdg', 1, '2024-05-25 14:16:19.190', 1, '2024-05-25 14:16:19.190', 4, 'fdg'),
(2, 5, 'fdgdfg', 'gfd', 1, '2024-05-26 11:15:50.785', 1, '2024-05-26 11:15:50.785', 4, 'fdgfd'),
(3, 5, 'fdg', 'gbtfd', 3, '2024-05-26 11:32:35.551', 1, '2024-05-26 11:32:35.551', 4, 'gfdg'),
(4, 5, 'tgf432g', 'tutaj', 1, '2024-05-26 12:04:13.458', 1, '2024-05-26 12:04:13.458', 7, 'xd');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `locationsonusers`
--

CREATE TABLE `locationsonusers` (
  `userId` int(11) NOT NULL,
  `locationId` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `likedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `target`
--

CREATE TABLE `target` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `creatorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `target`
--

INSERT INTO `target` (`id`, `name`, `description`, `creatorId`) VALUES
(1, 'Cebula', '213', 4),
(2, 'Cebvvvula', '213', 4),
(3, 'dsfd', 'fd', 4),
(4, 'pyssa', 'poteżny dyor', 7);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `targetsonusers`
--

CREATE TABLE `targetsonusers` (
  `userId` int(11) NOT NULL,
  `targetId` int(11) NOT NULL,
  `likedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `targetsonusers`
--

INSERT INTO `targetsonusers` (`userId`, `targetId`, `likedAt`) VALUES
(4, 1, '2024-05-26 11:31:50.694'),
(4, 3, '2024-05-18 13:01:51.013'),
(7, 1, '2024-05-26 12:03:39.878'),
(7, 2, '2024-05-26 12:03:41.386');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `email` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `reliability` double NOT NULL DEFAULT 5
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `createdAt`, `email`, `name`, `password`, `reliability`) VALUES
(2, '2024-04-21 14:28:22.754', 'atomel@wp.pl', 'tomek', '$2a$10$KbCcM4d0dx0J.gxOz9Yp8ed6yusHmxjdfTOIYCfThj7kR8WUayDDi', 5),
(4, '2024-04-21 14:45:31.737', 'admin@wp.pl', 'Tomeczek', '$2a$10$Fk34irMgcxGN/rksYs8ltuqxkNRlRQkTzOxbN.Dl2t7UW4EVGjmBu', 5),
(5, '2024-04-26 14:50:04.280', 'huuj@dp.djj', 'admin@wp.pl', '$2a$10$ArfZPr/MPwqbhMIlQ1wj/.5uXl1oc/AfzA89LaIlTiRi6TTkO9HYG', 5),
(6, '2024-05-26 11:50:18.906', 'kgfd@wp.gg', 'nikt@wp.pl', '$2a$10$CwTycUXWue0Thq9StjUM0uBroupzYajcgoPfzad9vhEzOHEIAa3Cy', 5),
(7, '2024-05-26 12:02:33.744', 'test@wp.pl', 'test', '$2a$10$CwTycUXWue0Thq9StjUM0uBroupzYajcgoPfzad9vhEzOHEIAa3Cy', 5);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('5133a49d-d761-4e8e-b472-ad5a7a46ea3b', '15bfc79d152c61f3bae977a851cc5f6a62c2eb05fcb96654fdc83174940723d6', '2024-05-26 11:33:09.935', '20240415142620_', NULL, NULL, '2024-05-26 11:33:09.868', 1),
('8e8f098d-4d78-4fa1-b8d8-73003300eded', 'f0c0df471448a27a5273ad33d2ec859797b231f01c981382e56174b3249eb6d3', '2024-05-26 11:33:23.871', '20240526113323_nigration_rating', NULL, NULL, '2024-05-26 11:33:23.818', 1),
('ca4ab0cd-d84c-453a-a6c8-1896a390dbd9', '5ba782d43bc8ee9474914cd81d955215d50413ec1d5b7ff378ecab46baba9b2f', '2024-05-26 11:33:09.946', '20240525140946_migration_xd', NULL, NULL, '2024-05-26 11:33:09.937', 1),
('f22fa0d5-b493-4950-9ece-b92f045b6058', 'bceecafa58c403d1680c3ce234c629b5f467fff4075ac34820f3db74a7d96181', '2024-05-26 11:33:09.866', '20240413113601_y', NULL, NULL, '2024-05-26 11:33:09.743', 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Location_targetId_fkey` (`targetId`),
  ADD KEY `Location_creatorId_fkey` (`creatorId`);

--
-- Indeksy dla tabeli `locationsonusers`
--
ALTER TABLE `locationsonusers`
  ADD PRIMARY KEY (`userId`,`locationId`),
  ADD KEY `LocationsOnUsers_locationId_fkey` (`locationId`);

--
-- Indeksy dla tabeli `target`
--
ALTER TABLE `target`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Target_creatorId_fkey` (`creatorId`);

--
-- Indeksy dla tabeli `targetsonusers`
--
ALTER TABLE `targetsonusers`
  ADD PRIMARY KEY (`userId`,`targetId`),
  ADD KEY `TargetsOnUsers_targetId_fkey` (`targetId`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indeksy dla tabeli `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `target`
--
ALTER TABLE `target`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `Location_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Location_targetId_fkey` FOREIGN KEY (`targetId`) REFERENCES `target` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `locationsonusers`
--
ALTER TABLE `locationsonusers`
  ADD CONSTRAINT `LocationsOnUsers_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `location` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `LocationsOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `target`
--
ALTER TABLE `target`
  ADD CONSTRAINT `Target_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `targetsonusers`
--
ALTER TABLE `targetsonusers`
  ADD CONSTRAINT `TargetsOnUsers_targetId_fkey` FOREIGN KEY (`targetId`) REFERENCES `target` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `TargetsOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
