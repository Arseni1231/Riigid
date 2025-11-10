<?php
// db.php

// --- НАСТРОЙКИ БД ---
// Под XAMPP по умолчанию:
//   host: localhost
//   user: root
//   password: "" (пусто)
//   dbname: то, что импортировал из country.sql
$DB_HOST = 'localhost';
$DB_NAME = 'countries_db'; // ИМЯ СВОЕЙ БД
$DB_USER = 'root';
$DB_PASS = ''; // если есть пароль - укажи

function getPDO(): PDO
{
    global $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS;

    $dsn = "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4";

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    return new PDO($dsn, $DB_USER, $DB_PASS, $options);
}
