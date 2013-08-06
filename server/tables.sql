CREATE DATABASE `hashtaggr`;

USE `hashtaggr`;

CREATE TABLE `tracks` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`artist` varchar(255) NOT NULL,
`title` varchar(255) NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `uc_track` (`artist`,`title`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

CREATE TABLE `tags` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`track_id` int(11) NOT NULL,
`name` varchar(50) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `track_id` (`track_id`),
CONSTRAINT `Tag_ibfk_1` FOREIGN KEY (`track_id`) REFERENCES `tracks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
