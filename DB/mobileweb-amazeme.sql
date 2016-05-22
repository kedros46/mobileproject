-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Machine: 127.0.0.1
-- Gegenereerd op: 22 mei 2016 om 13:15
-- Serverversie: 5.6.17
-- PHP-versie: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databank: `mobileweb-amazeme`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `media`
--

CREATE TABLE IF NOT EXISTS `media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(2048) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` varchar(2048) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Gegevens worden geëxporteerd voor tabel `media`
--

INSERT INTO `media` (`id`, `img`, `name`, `description`) VALUES
(1, 'https://www.facebook.com/images/fb_icon_325x325.png', 'Facebook', 'Facebook is a popular free social networking website that allows registered users to create profiles, upload photos and video, send messages and keep in touch with friends, family and colleagues. The site, which is available in 37 different languages, includes public features '),
(2, 'https://pmcdeadline2.files.wordpress.com/2014/06/twitter-logo.png?w=970', 'Twitter', 'Twitter is an online social networking service that enables users to send and read short 140-character messages called "tweets".'),
(3, 'http://www.socialtalent.co/wp-content/uploads/2015/11/Pinterest-Logo.png', 'Pinterest', 'On Pinterest You can discover new Ideas for every project or interest, collected by people like yourself.'),
(4, 'https://pbs.twimg.com/profile_images/667516091330002944/wOaS8FKS.png', 'Reddit', ' is an entertainment, social news networking service, and news website where registered community members can submit content, such as text posts or direct links, making it essentially an online bulletin board system.'),
(5, 'http://www.techspot.com/images2/downloads/topdownload/2014/06/Instagram.png', 'Instagram', 'Instagram is an online mobile photo-sharing, video-sharing, and social networking service that enables its users to take pictures and videos, and share them either publicly or privately on the app, as well as through a variety of other social networking platforms'),
(6, 'http://7108-presscdn-0-78.pagely.netdna-cdn.com/wp-content/uploads/2013/08/google-plus.png', 'Google+', 'Google+ is an interest-based social network that is owned and operated by Google Inc'),
(7, 'http://gradle.org/wp-content/uploads/2016/02/linkedin-logo.png', 'LinkedIn', 'LinkedIn is a business-oriented social networking service. It is mainly used for professional networking. As of 2015, most of the site''s revenue came from selling access to information about its users to recruiters and sales professionals');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(64) NOT NULL,
  `firstname` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `gender` int(1) NOT NULL,
  `birthday` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Gegevens worden geëxporteerd voor tabel `user`
--

INSERT INTO `user` (`id`, `lastname`, `firstname`, `email`, `password`, `gender`, `birthday`) VALUES
(7, 'dummy', 'michiel', 'dummy.michiel@hotmail.com', '6b244b4cf6779bd98277b5e4bd7d221cb377d771', 1, '0000-00-00'),
(8, 'durnez', 'thibault', 'thibault@durnez.com', '6b244b4cf6779bd98277b5e4bd7d221cb377d771', 1, '0000-00-00'),
(11, 'dhondt', 'brecht', 'brecht46@gmail.com', '51ae54d21f8777d3eccf49ea40c41edeb54ab341', 1, '0000-00-00'),
(17, 'Dhondt', 'brecht', 'brecht46@hotmail.com', '4e720577ce4f783b22eaeaeb89c34cbbe43b5b84', 1, '0000-00-00'),
(20, 'Dhondt', 'brecht', 'brecht.dhondt@student.howest.be', '51ae54d21f8777d3eccf49ea40c41edeb54ab341', 1, '0000-00-00'),
(21, 'Dhondt', 'brecht', 'root@hotmail.com', '51ae54d21f8777d3eccf49ea40c41edeb54ab341', 1, '0000-00-00'),
(22, 'dhondt', 'brecht', 'e@mail.com', '51ae54d21f8777d3eccf49ea40c41edeb54ab341', 1, '0000-00-00'),
(24, 'Dhondt', 'Brecht', 'original@email.com', '51ae54d21f8777d3eccf49ea40c41edeb54ab341', 1, '0000-00-00');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user2media`
--

CREATE TABLE IF NOT EXISTS `user2media` (
  `userid` int(11) NOT NULL,
  `mediaid` int(11) NOT NULL,
  PRIMARY KEY (`userid`,`mediaid`),
  KEY `mediaid` (`mediaid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `user2media`
--

INSERT INTO `user2media` (`userid`, `mediaid`) VALUES
(11, 1),
(17, 1),
(20, 1),
(21, 1),
(11, 2),
(17, 2),
(20, 2),
(11, 3),
(17, 3),
(20, 3),
(11, 4),
(17, 4),
(20, 4),
(11, 5),
(17, 5),
(20, 5),
(24, 5),
(11, 6),
(17, 6),
(20, 6),
(11, 7),
(17, 7),
(20, 7);

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `user2media`
--
ALTER TABLE `user2media`
  ADD CONSTRAINT `user2media_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user2media_ibfk_2` FOREIGN KEY (`mediaid`) REFERENCES `media` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
