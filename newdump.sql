-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: localhost    Database: healthydb
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `healthydb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `healthydb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `healthydb`;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `points` int DEFAULT NULL,
  `max` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'Use routes: https://www.butler.edu/fitness/jogging-and-walking-routes',1,NULL),(2,'Walk to the CUES farm for a visit during farm stand hours',1,NULL),(3,'Participate in Center for Faith and Vocation guided meditation class',1,NULL),(4,'Eat 5 servings of fruits/vegetables in one day',1,NULL),(5,'Avoid all sugar-sweetened beverages for one day',1,NULL),(6,'Participate in an HRC fitness class (many free options for staff/faculty)',1,NULL),(7,'Pack a healthy lunch from home',1,NULL),(8,'Park far away from work/store and walk',1,NULL),(9,'Sleep 7 ½ hours or more in one night',1,NULL),(10,'Use the restroom on different floor or building from your office',1,NULL),(11,'Find and use a Health & Wellness App or Podcast daily/weekly',5,NULL),(12,'Increase your weekly step count average by 1000 steps',5,NULL),(13,'Obtain 150 minutes of exercise in one week',5,NULL),(14,'Take prescribed medications for an entire week',5,NULL),(15,'Attend a Healthy Horizons lunch and learn',25,NULL),(16,'Read an entire novel for stress relief',25,NULL),(17,'Register for Healthier BU Blog http://blogs.butler.edu/healthyhorizons/',25,NULL),(18,'Complete annual wellness consult with Healthy Horizons',50,'1'),(19,'Complete annual physical with your Primary Care Provider',50,'1');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `first` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `last` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'earlfgilliv@gmail.com','Earl','Gill'),(2,'dpurdum@butler.edu','Dave','Purdum'),(3,'aekuhn2@butler.edu','Alex','Kuhn'),(4,'superyan45@aol.com','Ryan','Graham'),(7,'test@test.com','test','test'),(12,'test@test.com','test','test'),(13,'test@test.com','test','test'),(14,'test@test.com','test','test'),(15,'test@test.com','test','test'),(16,'test@test.com','test','test'),(17,'test@test.com','test','test');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `new_user_add_usertasks` AFTER INSERT ON `user` FOR EACH ROW BEGIN
	DECLARE currenttaskid INT DEFAULT 0;
	DECLARE finished INT DEFAULT 0;
	DECLARE tasklist CURSOR FOR SELECT id FROM `task`;
	DECLARE CONTINUE HANDLER 
        FOR NOT FOUND SET finished = 1;
 
	OPEN tasklist;

	l: LOOP
		FETCH tasklist INTO currenttaskid;
		IF finished = 1 THEN 
            LEAVE l;
        END IF;
		INSERT INTO usertask (user_id, task_id, semester, frequency) 
			VALUES (NEW.id, currenttaskid, 1, 0);
	END LOOP l;

	CLOSE tasklist;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `usertask`
--

DROP TABLE IF EXISTS `usertask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertask` (
  `user_id` int NOT NULL,
  `task_id` int NOT NULL,
  `semester` int NOT NULL,
  `frequency` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`task_id`),
  KEY `fk_usertasks_tasks_idx` (`task_id`),
  KEY `fk_usertasks_users1_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertask`
--

LOCK TABLES `usertask` WRITE;
/*!40000 ALTER TABLE `usertask` DISABLE KEYS */;
INSERT INTO `usertask` VALUES (16,1,1,'0'),(16,2,1,'0'),(16,3,1,'0'),(16,4,1,'0'),(16,5,1,'0'),(16,6,1,'0'),(16,7,1,'0'),(16,8,1,'0'),(16,9,1,'0'),(16,10,1,'0'),(16,11,1,'0'),(16,12,1,'0'),(16,13,1,'0'),(16,14,1,'0'),(16,15,1,'0'),(16,16,1,'0'),(16,17,1,'0'),(16,18,1,'0'),(16,19,1,'0'),(17,1,1,'0'),(17,2,1,'0'),(17,3,1,'0'),(17,4,1,'0'),(17,5,1,'0'),(17,6,1,'0'),(17,7,1,'0'),(17,8,1,'0'),(17,9,1,'0'),(17,10,1,'0'),(17,11,1,'0'),(17,12,1,'0'),(17,13,1,'0'),(17,14,1,'0'),(17,15,1,'0'),(17,16,1,'0'),(17,17,1,'0'),(17,18,1,'0'),(17,19,1,'0');
/*!40000 ALTER TABLE `usertask` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-03 21:42:12
