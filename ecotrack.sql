-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2023 at 01:02 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecotrack`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `last_login` date DEFAULT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `user_id`, `last_login`, `created_at`, `updated_at`) VALUES
(22, 73, '2023-12-22', '2023-12-22', '2023-12-22');

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `user_id`, `token`, `created_at`, `updated_at`) VALUES
(1, 65, '12345', '2023-12-23 23:40:45', '2023-12-23 23:40:45');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `user_id`, `location_id`, `created_at`, `updated_at`) VALUES
(2, 74, 1, '2023-12-22 00:00:00', '2023-12-22 00:00:00'),
(3, 75, 1, '2023-12-22 00:00:00', '2023-12-22 00:00:00'),
(5, 77, 1, '2023-12-24 00:00:00', '2023-12-24 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `concerents`
--

CREATE TABLE `concerents` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `Des` varchar(1024) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `concerents`
--

INSERT INTO `concerents` (`id`, `name`, `Des`, `created_at`, `updated_at`) VALUES
(1, 'A1', 'AAAAAAA', '2023-12-23', '2023-12-23'),
(2, 'A2', 'BBBBBBB', '2023-12-23', '2023-12-23'),
(3, 'A3', 'CCCCCCCC', '2023-12-23', '2023-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `concerent_client`
--

CREATE TABLE `concerent_client` (
  `id` int(11) NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  `concerent_id` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `concerent_client`
--

INSERT INTO `concerent_client` (`id`, `client_id`, `concerent_id`, `created_at`, `updated_at`) VALUES
(5, 2, 2, '2023-12-24', '2023-12-24'),
(7, 3, 2, '2023-12-24', '2023-12-24'),
(8, 3, 2, '2023-12-24', '2023-12-24');

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `port_code` int(11) DEFAULT NULL,
  `code` varchar(6) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `name`, `port_code`, `code`, `created_at`, `updated_at`) VALUES
(1, 'Palestine', 11, NULL, '2023-12-22 04:18:56', '2023-12-22 04:18:56');

-- --------------------------------------------------------

--
-- Table structure for table `c_alert`
--

CREATE TABLE `c_alert` (
  `id` int(11) NOT NULL,
  `concerent_id` int(11) DEFAULT NULL,
  `happened` datetime DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `educational`
--

CREATE TABLE `educational` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `urls` varchar(1024) DEFAULT NULL,
  `des` varchar(1024) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `educational`
--

INSERT INTO `educational` (`id`, `title`, `urls`, `des`, `created_at`, `updated_at`) VALUES
(2, 'Hi', 'www.aaa.com', 'aaaaaaaaaaaaaaaaaaqqqqqqqqqqqqqqqwwwwwwwwwwww', '2023-12-23', '2023-12-23'),
(3, 'Hi', 'www.aaa.com', 'aaaaaaaaaaaaaaaaaaqqqqqqqqqqqqqqqwwwwwwwwwwww', '2023-12-23', '2023-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  `rate` int(1) DEFAULT NULL,
  `comments` varchar(1024) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `client_id`, `rate`, `comments`, `created_at`, `updated_at`) VALUES
(1, 2, 4, 'WWWWWWW', '2023-12-23', '2023-12-23'),
(2, 3, 1, 'WWWWWWW', '2023-12-23', '2023-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `country_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `port_code` int(11) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `country_id`, `name`, `port_code`, `nickname`, `created_at`, `updated_at`) VALUES
(1, 1, 'Nablus', NULL, NULL, '0000-00-00', '0000-00-00'),
(2, 1, 'Tulkarm', 222, NULL, '2023-12-23', '2023-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `l_alert`
--

CREATE TABLE `l_alert` (
  `id` int(11) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `happened` datetime DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reporting`
--

CREATE TABLE `reporting` (
  `id` int(11) NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `Des` varchar(1024) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reporting`
--

INSERT INTO `reporting` (`id`, `client_id`, `title`, `Des`, `created_at`, `updated_at`) VALUES
(1, 2, 'AAAAAAAAAA', 'BBBBBBBBB', '2023-12-12', '2023-12-15'),
(2, 3, 'CCCCCCCCCCCc', 'SSSSSSS', '2023-12-12', '2023-12-15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(50) NOT NULL,
  `photo_url` varchar(255) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `facebook_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `photo_url`, `phone`, `facebook_url`) VALUES
(65, 'Q', 'A', 'V@gmail.com', '123456789', '1703215202796-403603283_254526674306534_140076168700774680_n.jpg', '32', 'waesrdtfjgh'),
(66, 'Q', 'A', 'V', 'G', '1703215280225-403603283_254526674306534_140076168700774680_n.jpg', '32', 'waesrdtfjgh'),
(67, 'Q', 'A', 'V', 'G', '1703215309046-403603283_254526674306534_140076168700774680_n.jpg', '32', 'waesrdtfjgh'),
(68, 'Mohammad', 'Ahmad', 'Ahmad@ffdsfsd', 'Aqwdfsfsfdsv', '1703215355535-403603283_254526674306534_140076168700774680_n.jpg', '23456', 'qqqqqqq'),
(73, 'Mohammad', 'Ahmad', 'Moha@gmail.com', '1234qwer', '1703288825385-Screenshot_2021-03-26 quiz 1 Attempt review(12).png', '23456', 'qqqqqqq'),
(74, 'Ahmad', 'Mohammad', 'Ah@gmail.com', 'Ah123456789', '1703275838542-403603283_254526674306534_140076168700774680_n.jpg', '32', 'waesrdtfjgh'),
(75, 'Ali', 'Ahmad', 'Alii@email.com', 'qqqq1111', '1703276991375-403603283_254526674306534_140076168700774680_n.jpg', '32', 'waesrdtfjgh'),
(77, 'Q', 'A', 'V', 'G', '1703375117758-Screenshot_2021-03-26 quiz 1 Attempt review(12).png', '32', 'waesrdtfjgh');

-- --------------------------------------------------------

--
-- Table structure for table `weather_info`
--

CREATE TABLE `weather_info` (
  `id` int(11) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `happened_date` date DEFAULT NULL,
  `Temperature` int(11) NOT NULL,
  `Humidity` int(11) NOT NULL,
  `Wind_Speed` int(11) NOT NULL,
  `Wind_Direction` varchar(255) NOT NULL,
  `Weather_Conditions_Desc` varchar(255) NOT NULL,
  `Pressure` int(11) NOT NULL,
  `Visibility` int(11) NOT NULL,
  `Sunrise` time NOT NULL,
  `Sunset` time NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `weather_info`
--

INSERT INTO `weather_info` (`id`, `location_id`, `happened_date`, `Temperature`, `Humidity`, `Wind_Speed`, `Wind_Direction`, `Weather_Conditions_Desc`, `Pressure`, `Visibility`, `Sunrise`, `Sunset`, `created_at`, `updated_at`) VALUES
(2, 1, '2023-12-24', 45, 30, 43, 'S', 'AAQQWW', 70, 12, '06:12:00', '17:42:00', '2023-12-23', '2023-12-23'),
(3, 2, '2023-12-23', 12, 32, 45, 'N', 'Hii', 31, 70, '06:15:00', '17:50:00', '2023-12-23', '2023-12-23'),
(4, 2, '2023-12-24', 12, 32, 45, 'N', 'Hii', 31, 70, '06:15:00', '17:50:00', '2023-12-23', '2023-12-23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `concerents`
--
ALTER TABLE `concerents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `concerent_client`
--
ALTER TABLE `concerent_client`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `concerent_id` (`concerent_id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `c_alert`
--
ALTER TABLE `c_alert`
  ADD PRIMARY KEY (`id`),
  ADD KEY `concerent_id` (`concerent_id`);

--
-- Indexes for table `educational`
--
ALTER TABLE `educational`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `l_alert`
--
ALTER TABLE `l_alert`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `reporting`
--
ALTER TABLE `reporting`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `weather_info`
--
ALTER TABLE `weather_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_id` (`location_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `concerents`
--
ALTER TABLE `concerents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `concerent_client`
--
ALTER TABLE `concerent_client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `c_alert`
--
ALTER TABLE `c_alert`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `educational`
--
ALTER TABLE `educational`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `l_alert`
--
ALTER TABLE `l_alert`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reporting`
--
ALTER TABLE `reporting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `weather_info`
--
ALTER TABLE `weather_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `auth`
--
ALTER TABLE `auth`
  ADD CONSTRAINT `auth_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `client_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `client_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `concerent_client`
--
ALTER TABLE `concerent_client`
  ADD CONSTRAINT `concerent_client_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `concerent_client_ibfk_2` FOREIGN KEY (`concerent_id`) REFERENCES `concerents` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `c_alert`
--
ALTER TABLE `c_alert`
  ADD CONSTRAINT `c_alert_ibfk_1` FOREIGN KEY (`concerent_id`) REFERENCES `concerents` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `l_alert`
--
ALTER TABLE `l_alert`
  ADD CONSTRAINT `l_alert_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reporting`
--
ALTER TABLE `reporting`
  ADD CONSTRAINT `reporting_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `weather_info`
--
ALTER TABLE `weather_info`
  ADD CONSTRAINT `weather_info_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
