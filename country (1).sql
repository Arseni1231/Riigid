-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Фев 09 2026 г., 18:03
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `country`
--

-- --------------------------------------------------------

--
-- Структура таблицы `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `country_code` varchar(5) DEFAULT NULL,
  `country_name` varchar(100) NOT NULL,
  `capital` varchar(100) DEFAULT NULL,
  `flag_url` varchar(255) DEFAULT NULL,
  `population` int(11) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `countries`
--

INSERT INTO `countries` (`id`, `country_code`, `country_name`, `capital`, `flag_url`, `population`, `region`) VALUES
(1, 'EE', 'Estonia', 'Tallinn', 'https://flagcdn.com/w320/ee.png', 1320000, 'Europe'),
(2, 'FI', 'Finland', 'Helsinki', 'https://flagcdn.com/w320/fi.png', 5540000, 'Europe'),
(3, 'JP', 'Japan', 'Tokyo', 'https://flagcdn.com/w320/jp.png', 125800000, 'Asia'),
(4, 'BR', 'Brazil', 'Brasilia', 'https://flagcdn.com/w320/br.png', 213000000, 'South America'),
(5, 'SE', 'Sweden', 'Stockholm', 'https://flagcdn.com/w320/se.png', 10300000, 'Europe'),
(6, 'NO', 'Norway', 'Oslo', 'https://flagcdn.com/w320/no.png', 5400000, 'Europe'),
(7, 'DE', 'Germany', 'Berlin', 'https://flagcdn.com/w320/de.png', 83000000, 'Europe'),
(8, 'FR', 'France', 'Paris', 'https://flagcdn.com/w320/fr.png', 67000000, 'Europe'),
(9, 'CA', 'Canada', 'Ottawa', 'https://flagcdn.com/w320/ca.png', 38000000, 'North America'),
(10, 'AU', 'Australia', 'Canberra', 'https://flagcdn.com/w320/au.png', 25600000, 'Oceania'),
(11, 'IT', 'Italy', 'Rome', 'https://flagcdn.com/w320/it.png', 59000000, 'Europe'),
(12, 'ES', 'Spain', 'Madrid', 'https://flagcdn.com/w320/es.png', 47000000, 'Europe'),
(13, 'PL', 'Poland', 'Warsaw', 'https://flagcdn.com/w320/pl.png', 38000000, 'Europe'),
(14, 'NL', 'Netherlands', 'Amsterdam', 'https://flagcdn.com/w320/nl.png', 17500000, 'Europe'),
(15, 'GB', 'United Kingdom', 'London', 'https://flagcdn.com/w320/gb.png', 68000000, 'Europe'),
(16, 'CN', 'China', 'Beijing', 'https://flagcdn.com/w320/cn.png', 1412000000, 'Asia'),
(17, 'IN', 'India', 'New Delhi', 'https://flagcdn.com/w320/in.png', 1393000000, 'Asia'),
(18, 'KR', 'South Korea', 'Seoul', 'https://flagcdn.com/w320/kr.png', 52000000, 'Asia'),
(19, 'TH', 'Thailand', 'Bangkok', 'https://flagcdn.com/w320/th.png', 70000000, 'Asia'),
(20, 'VN', 'Vietnam', 'Hanoi', 'https://flagcdn.com/w320/vn.png', 98000000, 'Asia'),
(21, 'US', 'United States', 'Washington, D.C.', 'https://flagcdn.com/w320/us.png', 331000000, 'North America'),
(22, 'MX', 'Mexico', 'Mexico City', 'https://flagcdn.com/w320/mx.png', 126000000, 'North America'),
(23, 'AR', 'Argentina', 'Buenos Aires', 'https://flagcdn.com/w320/ar.png', 46000000, 'South America'),
(24, 'CL', 'Chile', 'Santiago', 'https://flagcdn.com/w320/cl.png', 19000000, 'South America'),
(25, 'CO', 'Colombia', 'Bogotá', 'https://flagcdn.com/w320/co.png', 51500000, 'South America'),
(26, 'ZA', 'South Africa', 'Pretoria', 'https://flagcdn.com/w320/za.png', 60000000, 'Africa'),
(27, 'EG', 'Egypt', 'Cairo', 'https://flagcdn.com/w320/eg.png', 104000000, 'Africa'),
(28, 'NG', 'Nigeria', 'Abuja', 'https://flagcdn.com/w320/ng.png', 206000000, 'Africa'),
(29, 'KE', 'Kenya', 'Nairobi', 'https://flagcdn.com/w320/ke.png', 55000000, 'Africa'),
(30, 'MA', 'Morocco', 'Rabat', 'https://flagcdn.com/w320/ma.png', 37000000, 'Africa'),
(31, 'PT', 'Portugal', 'Lisbon', 'https://flagcdn.com/w320/pt.png', 10300000, 'Europe'),
(32, 'GR', 'Greece', 'Athens', 'https://flagcdn.com/w320/gr.png', 10700000, 'Europe'),
(33, 'CH', 'Switzerland', 'Bern', 'https://flagcdn.com/w320/ch.png', 8700000, 'Europe'),
(34, 'AT', 'Austria', 'Vienna', 'https://flagcdn.com/w320/at.png', 9000000, 'Europe'),
(35, 'CZ', 'Czech Republic', 'Prague', 'https://flagcdn.com/w320/cz.png', 10700000, 'Europe'),
(36, 'PK', 'Pakistan', 'Islamabad', 'https://flagcdn.com/w320/pk.png', 240000000, 'Asia'),
(37, 'BD', 'Bangladesh', 'Dhaka', 'https://flagcdn.com/w320/bd.png', 169000000, 'Asia'),
(38, 'SA', 'Saudi Arabia', 'Riyadh', 'https://flagcdn.com/w320/sa.png', 36000000, 'Asia'),
(39, 'IL', 'Israel', 'Jerusalem', 'https://flagcdn.com/w320/il.png', 9500000, 'Asia'),
(40, 'TR', 'Turkey', 'Ankara', 'https://flagcdn.com/w320/tr.png', 85000000, 'Asia'),
(41, 'DZ', 'Algeria', 'Algiers', 'https://flagcdn.com/w320/dz.png', 44000000, 'Africa'),
(42, 'ET', 'Ethiopia', 'Addis Ababa', 'https://flagcdn.com/w320/et.png', 120000000, 'Africa'),
(43, 'GH', 'Ghana', 'Accra', 'https://flagcdn.com/w320/gh.png', 32000000, 'Africa'),
(44, 'SD', 'Sudan', 'Khartoum', 'https://flagcdn.com/w320/sd.png', 45000000, 'Africa'),
(45, 'TZ', 'Tanzania', 'Dodoma', 'https://flagcdn.com/w320/tz.png', 61000000, 'Africa'),
(46, 'PE', 'Peru', 'Lima', 'https://flagcdn.com/w320/pe.png', 33000000, 'South America'),
(47, 'VE', 'Venezuela', 'Caracas', 'https://flagcdn.com/w320/ve.png', 28000000, 'South America'),
(48, 'CU', 'Cuba', 'Havana', 'https://flagcdn.com/w320/cu.png', 11300000, 'North America'),
(49, 'DO', 'Dominican Republic', 'Santo Domingo', 'https://flagcdn.com/w320/do.png', 10900000, 'North America'),
(50, 'JM', 'Jamaica', 'Kingston', 'https://flagcdn.com/w320/jm.png', 3000000, 'North America');

-- --------------------------------------------------------

--
-- Структура таблицы `facts`
--

CREATE TABLE `facts` (
  `id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `fact` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `facts`
--

INSERT INTO `facts` (`id`, `country_id`, `fact`) VALUES
(1, 1, 'Одна из самых цифровых стран мира с электронным гражданством и онлайн-услугами.'),
(2, 2, 'Славится системой образования и большим количеством саун.'),
(3, 3, 'Страна с богатой культурой аниме, видеоигр и высоких технологий.'),
(4, 4, 'Крупнейшая страна Южной Америки по населению и территории.'),
(5, 5, 'Известна высоким уровнем жизни, красивой природой и северным сиянием.'),
(6, 6, 'Славится фьордами и природными ландшафтами, популярна для туризма.'),
(7, 7, 'Родина знаменитых автомобильных брендов и инженерных технологий.'),
(8, 8, 'Знаменита модой, кухней и одной из самых узнаваемых башен в мире.'),
(9, 9, 'Имеет самую длинную береговую линию в мире и огромные лесные массивы.'),
(10, 10, 'Известна уникальной фауной — кенгуру и коалами.'),
(11, 11, 'Славится историческими памятниками, древними зданиями и кухней.'),
(12, 12, 'Известна танцами фламенко, яркой культурой и историческими фестивалями.'),
(13, 13, 'Сохранила средневековые города и соляные шахты.'),
(14, 14, 'Страна тюльпанов, ветряных мельниц и каналов.'),
(15, 15, 'Родина монархии, исторических замков и знаменитых часовых башен.'),
(16, 16, 'Самая населённая страна с древней культурой и Великой стеной.'),
(17, 17, 'Известна как страна специй, йоги и знаменитых архитектурных памятников.'),
(18, 18, 'Славится поп-культурой, технологиями и современными городами.'),
(19, 19, 'Популярна своими храмами, пляжами и уникальной кухней.'),
(20, 20, 'Известна рисовыми террасами и уличной кухней.');

-- --------------------------------------------------------

--
-- Структура таблицы `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `mode` enum('quiz','flag','reveal','fact') NOT NULL,
  `score` int(11) DEFAULT 0,
  `total_questions` int(11) DEFAULT 0,
  `correct_answers` int(11) DEFAULT 0,
  `played_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `game_questions`
--

CREATE TABLE `game_questions` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `question_type` enum('flag','capital','fact') NOT NULL,
  `is_correct` tinyint(1) DEFAULT 0,
  `answered_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `leaderboard`
--

CREATE TABLE `leaderboard` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_score` int(11) DEFAULT 0,
  `rank` int(11) DEFAULT 0,
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `last_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `created_at`, `last_login`) VALUES
(1, 'arseni', 'arseni@example.com', 'hash1', '2025-10-29 09:46:57', NULL),
(2, 'viktoria', 'viktoria@example.com', 'hash2', '2025-10-29 09:46:57', NULL),
(3, 'max', 'max@example.com', 'hash3', '2025-10-29 09:46:57', NULL),
(4, 'anna', 'anna@example.com', 'hash4', '2025-10-29 09:46:57', NULL),
(5, 'igor', 'igor@example.com', 'hash5', '2025-10-29 09:46:57', NULL),
(6, 'karl', 'karl@example.com', 'hash6', '2025-10-29 09:46:57', NULL),
(7, 'maria', 'maria@example.com', 'hash7', '2025-10-29 09:46:57', NULL),
(8, 'sofia', 'sofia@example.com', 'hash8', '2025-10-29 09:46:57', NULL),
(9, 'mark', 'mark@example.com', 'hash9', '2025-10-29 09:46:57', NULL),
(10, 'olga', 'olga@example.com', 'hash10', '2025-10-29 09:46:57', NULL),
(11, 'Arsenii', 'arseni.solovjov@ivkhk.ee', '$2b$10$HwGTwQe0CiPxfeYCAF/AHODi3y53z8pFbyQeLQGOv1O8aH.zD0K/e', '2025-11-03 14:39:49', NULL),
(12, 'Hamal', 'hamal@outlook.com', '$2b$10$kjt80YPrNEE.M5SEGxbVLOFJB.XXUdD55gmUA/E6DIl4SNeKOYWIG', '2025-11-12 02:33:35', NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `country_code` (`country_code`);

--
-- Индексы таблицы `facts`
--
ALTER TABLE `facts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country_id` (`country_id`);

--
-- Индексы таблицы `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `game_questions`
--
ALTER TABLE `game_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `game_id` (`game_id`),
  ADD KEY `country_id` (`country_id`);

--
-- Индексы таблицы `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT для таблицы `facts`
--
ALTER TABLE `facts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT для таблицы `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `game_questions`
--
ALTER TABLE `game_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `leaderboard`
--
ALTER TABLE `leaderboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `facts`
--
ALTER TABLE `facts`
  ADD CONSTRAINT `facts_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `games`
--
ALTER TABLE `games`
  ADD CONSTRAINT `games_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `game_questions`
--
ALTER TABLE `game_questions`
  ADD CONSTRAINT `game_questions_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `game_questions_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`);

--
-- Ограничения внешнего ключа таблицы `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD CONSTRAINT `leaderboard_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
