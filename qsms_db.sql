/*
SQLyog Ultimate v11.11 (32 bit)
MySQL - 5.5.49-log : Database - qsms_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`qsms_db` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `qsms_db`;

/*Table structure for table `department` */

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `department_description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `department` */

insert  into `department`(`id`,`name`,`department_description`) values (1,'EXEC','Executive Department'),(2,'SALES','Sales Department'),(3,'MARKETING','Marketing Department'),(4,'QSD','Questronix Software Deparment'),(5,'QBS',NULL);

/*Table structure for table `opportunity` */

DROP TABLE IF EXISTS `opportunity`;

CREATE TABLE `opportunity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `color` varchar(10) DEFAULT NULL,
  `project_name` varchar(100) DEFAULT NULL,
  `project_description` longtext,
  `project_type` varchar(50) DEFAULT NULL,
  `total_revenue` double DEFAULT NULL,
  `gross_profit` double DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `industry` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_person` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `email_address` varchar(100) DEFAULT NULL,
  `lead_from` varchar(50) DEFAULT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `sc_stage` int(11) DEFAULT NULL,
  `budget` double DEFAULT NULL,
  `business_need` varchar(255) DEFAULT NULL,
  `authority` varchar(100) DEFAULT NULL,
  `timeline` datetime DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modified` datetime DEFAULT NULL,
  `isDeleted` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

/*Data for the table `opportunity` */

insert  into `opportunity`(`id`,`user_id`,`color`,`project_name`,`project_description`,`project_type`,`total_revenue`,`gross_profit`,`company`,`industry`,`address`,`contact_person`,`designation`,`contact_no`,`email_address`,`lead_from`,`assigned_to`,`sc_stage`,`budget`,`business_need`,`authority`,`timeline`,`date_created`,`date_modified`,`isDeleted`) values (1,1,'40D393','Project Saga','This project will change the world for the better. ','Hybrid Cloud',50000000,10000000,'Future Will, Inc.','Retail & Distribution',NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,100000000,NULL,NULL,'2020-01-31 00:00:00','2017-01-10 13:41:58','2017-01-17 11:55:51',0),(2,2,'45E1C3','IBM Future','Project for the future technology of IBM.','Systems Integration',10000000,5000000,'IBM','Manufacturing',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,3000000,NULL,NULL,NULL,'2017-01-10 14:14:10',NULL,0),(3,1,'12A59D','Toshiba Project','Maintenance is needed.','HS/SW Maintenance',4500000,1000000,'Toshiba','Manufacturing',NULL,NULL,NULL,NULL,NULL,NULL,2,2,21000000,NULL,NULL,NULL,'2017-01-10 15:08:05','2017-01-17 11:01:39',0),(4,1,'FFFFFF','E-Max Software',NULL,NULL,12000000,8000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,3,9000000,NULL,NULL,'2017-01-31 00:00:00','2017-01-10 15:08:08','2017-01-17 12:48:36',0),(5,1,'FFFFFF','ECO System',NULL,NULL,43000000,21000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,25000000,NULL,NULL,NULL,'2017-01-10 16:56:34','2017-01-12 09:29:41',1),(6,1,'FFFFFF','Retro Project',NULL,NULL,1000000000,75000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,30000000,NULL,NULL,NULL,'2017-01-10 17:56:45',NULL,1),(7,2,'FFFFFF','Manual Project',NULL,NULL,20000000,10000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,10000000,NULL,NULL,NULL,'2017-01-11 09:21:19',NULL,1),(8,1,'FFFFFF','Volume Up',NULL,NULL,75000000,50000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1000000,NULL,NULL,NULL,'2017-01-11 13:38:46',NULL,0),(9,1,'FFFFFF','Dope',NULL,NULL,70000000,45000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,2000000,NULL,NULL,NULL,'2017-01-11 13:39:11','2017-01-12 15:14:02',1),(10,1,'FFFFFF','Trello','Trololololololllll.',NULL,65000000,40000000,'Tero',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,3000000,NULL,NULL,NULL,'2017-01-11 13:42:37','2017-01-17 10:36:48',0),(11,1,'FFFFFF','Russian Roulette',NULL,NULL,60000000,35000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,4000000,NULL,NULL,NULL,'2017-01-11 13:47:34','2017-01-12 15:12:33',1),(12,1,'FFFFFF','The Voice',NULL,NULL,55000000,30000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,5000000,NULL,NULL,NULL,'2017-01-11 13:49:35','2017-01-12 15:14:15',0),(13,1,'FFFFFF','Red Hot Chilli Pepper',NULL,NULL,50000000,25000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,6000000,NULL,NULL,NULL,'2017-01-11 13:55:29','2017-01-12 15:12:59',1),(14,1,'FFFFFF','I Love You Project',NULL,NULL,45000000,20000000,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,7000000,NULL,NULL,NULL,'2017-01-11 13:56:15','2017-01-16 01:19:25',0),(15,1,'FFFFFF','Excuse This Card','Song by AOA. New latest.',NULL,40000000,15000000,'FNC Entertainment',NULL,NULL,NULL,NULL,'09123456789',NULL,NULL,NULL,3,8000000,NULL,NULL,NULL,'2017-01-11 15:25:52','2017-01-17 10:20:01',0),(16,1,'FFFFFF','Cooler Project',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-16 00:15:02',NULL,1),(17,1,'FFFFFF','Lacoste Project',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-16 00:17:02',NULL,1),(18,1,'FFFFFF','Automatic Project',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-16 00:19:12',NULL,1),(19,1,'FFFFFF','Paint Project',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-16 00:20:59',NULL,1),(20,1,'FFFFFF','Rat',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-16 00:22:40',NULL,1),(21,1,'FFFFFF','Boom',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-16 00:35:45',NULL,1),(22,1,'FFFFFF','Whistle',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-16 00:37:14',NULL,1),(23,1,'FFFFFF','Rhythm Ta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-16 00:37:41',NULL,1),(24,1,'FFFFFF','Sugar Free',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-16 00:39:21',NULL,1),(25,1,'FFFFFF','Ice Cream Cake',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-16 00:40:50',NULL,1),(26,1,'FFFFFF','Thriller',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-16 00:42:10',NULL,1),(27,1,'FFFFFF','Roulette',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,'2017-01-16 00:44:25','2017-01-16 00:57:01',1),(28,1,'FFFFFF','Sponge Bob',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,'2017-01-16 01:04:30','2017-01-16 01:19:21',1),(29,1,'FFFFFF','Russia Pocket',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-16 01:17:02','2017-01-16 10:25:57',1),(30,1,'FFFFFF','Shake that Brass',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-16 10:20:36',NULL,1),(31,1,'FFFFFF','Hate',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,'2017-01-16 10:25:13','2017-01-16 10:34:36',1),(32,1,'FFFFFF','Bing Bing',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-16 10:31:13',NULL,1),(33,1,'FFFFFF','Bluetooth Headphone',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-16 10:34:47','2017-01-16 16:39:28',0),(34,1,'FFFFFF','Profile Project',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,NULL,'2017-01-16 16:41:10','2017-01-16 16:41:13',0),(35,1,'FFFFFF','Zen Phone','Hasdfasdf',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,'2017-02-28 00:00:00','2017-01-19 09:38:52','2017-01-19 09:40:16',0),(36,1,'FFFFFF','Zen',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2017-01-19 09:38:52',NULL,1);

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `role_description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `role` */

insert  into `role`(`id`,`name`,`role_description`) values (1,'ADMIN','QSMS Administrator Access'),(2,'USER','QSMS User Access');

/*Table structure for table `sales_cycle` */

DROP TABLE IF EXISTS `sales_cycle`;

CREATE TABLE `sales_cycle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `sales_cycle` */

insert  into `sales_cycle`(`id`,`name`,`description`) values (1,'SC0','Prospecting'),(2,'SC1','Lead'),(3,'SC2','Validated'),(4,'SC3','Qualified'),(5,'SC4','Conditional Agreement'),(6,'SC5','Won'),(7,'SC6','Implementation'),(8,'SC7','Completed'),(9,'SC9','Collection'),(10,'SC90','No Bid'),(11,'SC91','Deferred'),(12,'SC92','Lost'),(13,'SC93','Expired'),(14,'SC94','Not Qualified');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email_address` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `roles` varchar(50) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`password`,`email_address`,`first_name`,`middle_name`,`last_name`,`roles`,`department`,`date_created`) values (1,'qnx_admin','pJxBuFVaXf17dc40a0d584be02e3209c4a12e414d','qnx_admin@questronix.com.ph','Questronix',NULL,'Corporation','1','1','2017-01-10 09:54:59'),(2,'ken_crucillo','CtjXFzkBq4ef7f9a75fc9ed886b24cee104d903fc','kendrick_crucillo@questronix.com.ph','Kendrick','Obal','Crucillo','2','5','2017-01-10 11:40:23');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
