-- MariaDB dump 10.19-11.2.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: sams
-- ------------------------------------------------------
-- Server version	11.2.2-MariaDB

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
('0d59f619-add2-463e-b3f1-d1bf41b2c2ba','Prueba5',0,'2023-12-10 01:05:04','2023-12-10 01:05:21');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historic`
--

LOCK TABLES `historic` WRITE;
/*!40000 ALTER TABLE `historic` DISABLE KEYS */;
/*!40000 ALTER TABLE `historic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `max_warning` int(11) NOT NULL DEFAULT 30,
  `max_accepted` int(11) NOT NULL DEFAULT 20,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES
(1,30,20,'2023-12-12 19:54:49','2023-12-12 19:54:49',NULL),
(2,30,20,'2023-12-12 19:54:50','2023-12-12 19:54:50',NULL),
(3,30,20,'2023-12-12 19:54:51','2023-12-12 19:54:51',NULL),
(4,30,20,'2023-12-12 19:54:52','2023-12-12 19:54:52',NULL),
(5,30,20,'2023-12-12 19:56:22','2023-12-12 19:56:22','5752ae60-f688-4c5a-a004-6c70083270fc'),
(6,30,20,'2023-12-12 19:57:12','2023-12-12 19:57:12','5752ae60-f688-4c5a-a004-6c70083270fc'),
(7,30,20,'2023-12-12 19:58:10','2023-12-12 19:58:10','5752ae60-f688-4c5a-a004-6c70083270fc'),
(8,30,20,'2023-12-12 19:59:17','2023-12-12 19:59:17','5752ae60-f688-4c5a-a004-6c70083270fc'),
(9,30,20,'2023-12-12 20:01:01','2023-12-12 20:01:01','5752ae60-f688-4c5a-a004-6c70083270fc'),
(10,30,20,'2023-12-12 20:01:14','2023-12-12 20:01:14','5752ae60-f688-4c5a-a004-6c70083270fc'),
(11,30,20,'2023-12-12 20:02:19','2023-12-12 20:02:19','5752ae60-f688-4c5a-a004-6c70083270fc'),
(12,30,20,'2023-12-12 20:02:50','2023-12-12 20:02:50','5752ae60-f688-4c5a-a004-6c70083270fc'),
(13,30,20,'2023-12-12 20:03:09','2023-12-12 20:03:09','5752ae60-f688-4c5a-a004-6c70083270fc'),
(14,30,20,'2023-12-12 20:06:44','2023-12-12 20:06:44','5752ae60-f688-4c5a-a004-6c70083270fc'),
(15,30,20,'2023-12-12 20:06:54','2023-12-12 20:06:54','5752ae60-f688-4c5a-a004-6c70083270fc');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
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
('5752ae60-f688-4c5a-a004-6c70083270fc','Simon','simonvillalon10@gmail.com','$2a$10$.O3hZUM0ysysK927bLnGSOvoOF1kdel6btWX5ndMKJuzgLDNBupIm','2023-12-10 01:02:14','2023-12-10 01:02:14'),
('85c3c0df-9331-45d0-b138-84b5064f66d8','Simon','simonvillalon9@gmail.com','$2a$10$iyMumPSxV6EF7ic0lVFpAOI6DSXCxWdji/vPQqjSrBOnYciGo37mW','2023-12-10 19:32:30','2023-12-10 19:32:30'),
('9146a423-e165-4f4c-ace9-0222f7010e22','SImondasd','simonvillalon8@gmail.com','$2a$10$FsDahK/1/eB5OH47W8kuq.99zJlPyRCXc7d0min5a.Uv0tOxxZNFC','2023-12-10 02:22:54','2023-12-10 02:22:54'),
('fe1f963c-c489-4e13-a9ba-b7f5e103162c','simonvasd','simonvillalon@gmail.com','$2a$10$ssXFBJjPlOZh2qSVTEIqxeVUyWSetGb8QRC6Q/UB8dL3pc83X63FK','2023-12-10 19:16:07','2023-12-10 19:16:07');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user-device`
--

DROP TABLE IF EXISTS `user-device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user-device` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `device_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  UNIQUE KEY `user-device_userId_deviceId_unique` (`device_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user-device_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user-device_ibfk_2` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user-device`
--

LOCK TABLES `user-device` WRITE;
/*!40000 ALTER TABLE `user-device` DISABLE KEYS */;
INSERT INTO `user-device` VALUES
('5752ae60-f688-4c5a-a004-6c70083270fc','0d59f619-add2-463e-b3f1-d1bf41b2c2ba',1,'2023-12-10 01:05:21','2023-12-10 01:05:21'),
('9146a423-e165-4f4c-ace9-0222f7010e22','0d59f619-add2-463e-b3f1-d1bf41b2c2ba',0,'2023-12-10 02:23:06','2023-12-10 19:14:18'),
('fe1f963c-c489-4e13-a9ba-b7f5e103162c','0d59f619-add2-463e-b3f1-d1bf41b2c2ba',0,'2023-12-10 19:16:15','2023-12-10 19:16:15'),
('85c3c0df-9331-45d0-b138-84b5064f66d8','0d59f619-add2-463e-b3f1-d1bf41b2c2ba',0,'2023-12-10 19:32:51','2023-12-10 19:32:51');
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

-- Dump completed on 2023-12-14 11:02:33
