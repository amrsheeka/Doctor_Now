-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2023 at 06:02 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doctor_now`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `users_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `date` varchar(20) NOT NULL,
  `time` varchar(10) NOT NULL,
  `name_patient` varchar(100) NOT NULL,
  `age` varchar(10) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `notes` varchar(600) NOT NULL,
  `doc_name` varchar(30) NOT NULL,
  `doc_image` varchar(255) DEFAULT NULL,
  `specialization1` varchar(100) NOT NULL,
  `date_now` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`users_id`, `doctor_id`, `date`, `time`, `name_patient`, `age`, `gender`, `notes`, `doc_name`, `doc_image`, `specialization1`, `date_now`) VALUES
(183, 509, 'Fri Apr 14 2023', '5:30 PM', 'Ahmed', '25+', 'male', 'Ahmed', 'Tamer Yehia HCC', 'https://cdn-dr-images.vezeeta.com/Assets/Images/SelfServiceDoctors/ENTae5e6006161765d0/Profile/150/doctor-hcc-hamer-yehia-orthopedic-and-rheumatology_20200429112418383.jpg', 'Adult Orthopedic Surgery', '2023-04-14');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
