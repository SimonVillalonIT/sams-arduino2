-- MariaDB dump 10.19-11.1.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: sams
-- ------------------------------------------------------
-- Server version	11.1.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES
('11890105-0a63-4c66-b2a0-e96548d7cfc4',NULL,0,'2023-11-05 20:40:29','2023-11-05 20:40:29'),
('5c2f870f-eba5-4ea7-a439-0b5c624ca684','Prueba4',0,'2023-11-08 22:39:35','2023-11-12 14:47:36');
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historic`
--

DROP TABLE IF EXISTS `historic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `historic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sensor1` int(11) DEFAULT NULL,
  `sensor2` int(11) DEFAULT NULL,
  `sensor3` int(11) DEFAULT NULL,
  `sensor4` int(11) DEFAULT NULL,
  `sensor5` int(11) DEFAULT NULL,
  `sensor6` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `device_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `historic_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historic`
--

LOCK TABLES `historic` WRITE;
/*!40000 ALTER TABLE `historic` DISABLE KEYS */;
INSERT INTO `historic` VALUES
(1,203,84,12,131,54,123,'2023-11-11 01:11:56','2023-11-11 01:11:56','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(2,203,84,12,131,54,123,'2023-11-11 01:25:10','2023-11-11 01:25:10','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(3,203,84,12,131,54,123,'2023-11-11 01:26:27','2023-11-11 01:26:27','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(4,203,84,12,131,54,123,'2023-11-11 01:30:48','2023-11-11 01:30:48','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(5,203,84,12,131,54,123,'2023-11-11 01:32:01','2023-11-11 01:32:01','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(6,203,84,12,131,54,123,'2023-11-11 01:33:29','2023-11-11 01:33:29','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(7,203,84,12,131,54,123,'2023-11-11 01:34:48','2023-11-11 01:34:48','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(8,203,84,12,131,54,123,'2023-11-11 01:35:25','2023-11-11 01:35:25','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(9,203,84,12,131,54,123,'2023-11-11 01:35:43','2023-11-11 01:35:43','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(10,203,84,12,131,54,123,'2023-11-11 01:39:00','2023-11-11 01:39:00','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(11,203,84,12,131,54,123,'2023-11-11 01:39:15','2023-11-11 01:39:15','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(12,203,84,12,131,54,123,'2023-11-11 01:39:32','2023-11-11 01:39:32','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(13,203,84,12,131,54,123,'2023-11-11 01:39:46','2023-11-11 01:39:46','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(14,203,84,12,131,54,123,'2023-11-11 01:40:28','2023-11-11 01:40:28','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(15,203,84,12,131,54,123,'2023-11-11 01:41:02','2023-11-11 01:41:02','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(16,203,84,12,131,54,123,'2023-11-11 01:41:51','2023-11-11 01:41:51','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(17,203,84,12,131,54,123,'2023-11-11 01:41:58','2023-11-11 01:41:58','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(18,203,84,12,131,54,123,'2023-11-11 01:44:15','2023-11-11 01:44:15','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(19,203,84,12,131,54,123,'2023-11-11 01:45:01','2023-11-11 01:45:01','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(20,203,84,12,131,54,123,'2023-11-11 01:45:45','2023-11-11 01:45:45','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(21,203,84,12,131,54,123,'2023-11-11 01:47:29','2023-11-11 01:47:29','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(22,203,84,12,131,54,123,'2023-11-11 01:48:49','2023-11-11 01:48:49','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(23,203,84,12,131,54,123,'2023-11-11 14:26:10','2023-11-11 14:26:10','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(24,203,84,12,131,54,123,'2023-11-12 13:59:45','2023-11-12 13:59:45','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(25,203,84,12,131,54,123,'2023-11-12 14:03:52','2023-11-12 14:03:52','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(26,203,84,12,131,54,123,'2023-11-12 14:11:47','2023-11-12 14:11:47','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(27,203,84,12,131,54,123,'2023-11-12 14:13:12','2023-11-12 14:13:12','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(28,203,84,12,131,54,123,'2023-11-12 14:13:27','2023-11-12 14:13:27','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(29,203,84,12,131,54,123,'2023-11-12 14:13:31','2023-11-12 14:13:31','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(30,203,84,12,131,54,123,'2023-11-12 14:13:35','2023-11-12 14:13:35','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(31,203,84,12,131,54,123,'2023-11-12 14:13:39','2023-11-12 14:13:39','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(32,203,84,12,131,54,123,'2023-11-12 14:13:42','2023-11-12 14:13:42','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(33,203,84,12,131,54,123,'2023-11-12 14:13:45','2023-11-12 14:13:45','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(34,203,84,12,131,54,123,'2023-11-12 14:13:48','2023-11-12 14:13:48','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(35,203,84,12,131,54,123,'2023-11-12 14:13:51','2023-11-12 14:13:51','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(36,203,84,12,131,54,123,'2023-11-12 14:44:10','2023-11-12 14:44:10','5c2f870f-eba5-4ea7-a439-0b5c624ca684'),
(37,203,84,12,131,54,123,'2023-11-12 14:47:30','2023-11-12 14:47:30','5c2f870f-eba5-4ea7-a439-0b5c624ca684');
/*!40000 ALTER TABLE `historic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accepted` tinyint(1) DEFAULT 0,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `device_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_user_device` (`user_id`,`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES
(7,1,'0f2cfe11-6793-409d-8a47-7ef607c18e7e','11890105-0a63-4c66-b2a0-e96548d7cfc4','2023-11-05 20:53:23','2023-11-05 21:36:36');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
('0f2cfe11-6793-409d-8a47-7ef607c18e7e','simonvillalon9@gmail.com','$2a$10$yoOoqkKIyOZ4u2lqtFMxpur08Suf9Qj19d2OJ1NoqQtGQtdH/50Mq','2023-11-05 20:38:57','2023-11-05 20:38:57','Simonvi'),
('137b9dab-45cd-4bd1-8ee1-f25086fe31c7','simonvillalon10@gmail.com','$2a$10$q7sFr0MkQQwdRpqZ1ly9LO2CLCDOmLr3quyLKZ5Ep.NT6JaeZVPZW','2023-11-05 20:38:06','2023-11-05 20:38:06','Simonvi'),
('c9a37459-de98-402f-ae33-bb659d440a3d','simonvillalon8@gmail.com','$2a$10$E/YMiK.bOGDA5CIDaMOT/ek1KvhJRaxafs/nGOVM2ZrOpOhWIKiQS','2023-11-13 00:06:39','2023-11-13 00:06:39','Simon vill');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user-device`
--

DROP TABLE IF EXISTS `user-device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user-device` (
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `device_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`device_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user-device_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user-device_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user-device`
--

LOCK TABLES `user-device` WRITE;
/*!40000 ALTER TABLE `user-device` DISABLE KEYS */;
INSERT INTO `user-device` VALUES
(1,'2023-11-08 22:39:53','2023-11-08 22:39:53','5c2f870f-eba5-4ea7-a439-0b5c624ca684','137b9dab-45cd-4bd1-8ee1-f25086fe31c7');
/*!40000 ALTER TABLE `user-device` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-13  1:19:49
