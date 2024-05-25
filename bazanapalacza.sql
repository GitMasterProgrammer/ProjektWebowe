-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Maj 25, 2024 at 04:15 PM
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
  `coordinates` varchar(191) DEFAULT NULL,
  `details` varchar(191) DEFAULT NULL,
  `address` varchar(191) NOT NULL,
  `basedOnAI` tinyint(1) NOT NULL DEFAULT 0,
  `targetId` int(11) NOT NULL,
  `updatedAt` datetime(3) NOT NULL,
  `actual` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `creatorId` int(11) NOT NULL
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
(3, 'dsfd', 'fd', 4);

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
(4, 1, '2024-05-18 13:55:58.109'),
(4, 3, '2024-05-18 13:01:51.013');

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
(1, '2024-04-20 15:46:43.342', 'test@wp.pl', 'Cebula', '213', 5),
(2, '2024-04-21 14:28:22.754', 'atomel@wp.pl', 'tomek', '$2a$10$KbCcM4d0dx0J.gxOz9Yp8ed6yusHmxjdfTOIYCfThj7kR8WUayDDi', 5),
(4, '2024-04-21 14:45:31.737', 'admin@wp.pl', 'Tomeczek', '$2a$10$Fk34irMgcxGN/rksYs8ltuqxkNRlRQkTzOxbN.Dl2t7UW4EVGjmBu', 5),
(5, '2024-04-26 14:50:04.280', 'huuj@dp.djj', 'admin@wp.pl', '$2a$10$ArfZPr/MPwqbhMIlQ1wj/.5uXl1oc/AfzA89LaIlTiRi6TTkO9HYG', 5);

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
('9ea630b1-3249-443f-ae6b-50de8d837d3e', '15bfc79d152c61f3bae977a851cc5f6a62c2eb05fcb96654fdc83174940723d6', '2024-04-20 15:42:16.014', '20240415142620_', NULL, NULL, '2024-04-20 15:42:15.742', 1),
('f3bdd94e-84a2-4779-8d99-eea370d1352f', 'bceecafa58c403d1680c3ce234c629b5f467fff4075ac34820f3db74a7d96181', '2024-04-20 15:42:15.737', '20240413113601_y', NULL, NULL, '2024-04-20 15:42:15.316', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `target`
--
ALTER TABLE `target`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
