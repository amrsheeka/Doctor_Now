-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2023 at 11:46 PM
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
  `date_now` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`users_id`, `doctor_id`, `date`, `time`, `name_patient`, `age`, `gender`, `notes`, `date_now`) VALUES
(22, 22, '2023-03-26', '22:27:36', '', '', '', '', '2023-04-07'),
(22, 22, '0000-00-00', '11:05:00', '', '', '', '', '2023-04-07'),
(22, 22, '2020-03-11', '11:05:00', '', '', '', '', '2023-04-07'),
(183, 509, 'Sat Apr 22 2023', '5:30 PM', 'Ahmed fahim', '23', 'male', 'Gggg', '2023-04-07'),
(184, 509, 'Fri Apr 07 2023', '5:30 PM', 'ahmed fhaim', '25+', 'male', 'All is well', '2023-04-07'),
(184, 509, 'Fri Apr 07 2023', '5:30 PM', '', '25+', 'male', '', '2023-04-07'),
(184, 509, 'Fri Apr 07 2023', '5:30 PM', '', '25+', 'male', '', '2023-04-07'),
(184, 509, 'Fri Apr 07 2023', '5:30 PM', '', '25+', 'male', '', '2023-04-07'),
(184, 509, 'Fri Apr 07 2023', '5:30 PM', '', '25+', 'male', '', '2023-04-07'),
(184, 509, 'Fri Apr 07 2023', '5:30 PM', '', '25+', 'male', '', '2023-04-07'),
(184, 509, 'Fri Apr 07 2023', '5:30 PM', '', '25+', 'male', '', '2023-04-07'),
(184, 509, 'Fri Apr 07 2023', '5:30 PM', '', '25+', 'male', '', '2023-04-07');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
