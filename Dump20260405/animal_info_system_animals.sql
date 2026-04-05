-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: animal_info_system
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `animals`
--

LOCK TABLES `animals` WRITE;
/*!40000 ALTER TABLE `animals` DISABLE KEYS */;
INSERT INTO `animals` VALUES (1,'Max','Dog','poodle','Male','2021-01-18','white',1,'Active'),(3,'Lucy','cat','persian','Female','2004-11-02','yellow',3,'Inactive'),(4,'Luna','Cat','Maine coon','Female','2009-12-12','Brown',4,'Active'),(5,'Cloe','Dog','Chihuahua','Female','2020-06-09','white',1,'Active'),(6,'Oscar','Fish','golden fish','Unknown','2007-03-04','Golden',2,'Active'),(7,'Chiachia','cat','sphynx','Female','2026-04-07','white',7,'Inactive'),(8,'Coco','Bird','Parrot','Male','2015-03-05','Green',11,'Active'),(9,'Sky','Dog','Husky','Female','2020-09-30','Gray',8,'Inactive'),(10,'Honey','Rabit','Netherland Dwarf','Female','2025-08-15','Cream',5,'Inactive'),(11,'Bella','cat','persian','Female','2025-07-01','white',3,'Active'),(12,'kitty','cat','dutch','Female','2025-07-01','pink',9,'Inactive'),(13,'nemo','fish','clownfish','Unknown','2024-03-15','brigtht Orange',1,'Active'),(14,'jen','Rabit','mini lop','Female','0215-09-17','brown',4,'Active');
/*!40000 ALTER TABLE `animals` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-05 16:50:31
