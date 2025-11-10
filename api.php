<?php
// api.php
require_once __DIR__ . '/db.php';

// ----- CORS -----
header('Access-Control-Allow-Origin: *'); // Или точный origin, если надо
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ----- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ -----
function send_json($data, int $code = 200)
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function get_json_body()
{
    $raw = file_get_contents('php://input');
    if (!$raw) {
        return null;
    }
    $data = json_decode($raw, true);
    return $data ?? null;
}

// ----- РОУТИНГ -----
// Предполагаем, что файл доступен по URL типа:
//   http://localhost/riigid-api/api.php/countries
//   http://localhost/riigid-api/api.php/countries/1

$uriPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// Убираем всё до api.php, чтобы получить "виртуальный" путь
$scriptName = $_SERVER['SCRIPT_NAME']; // /riigid-api/api.php
$basePath = rtrim($scriptName, 'api.php');
$routePath = substr($uriPath, strlen($scriptName)); // все после api.php
$routePath = trim($routePath, '/'); // countries, countries/1 и т.п.

$segments = $routePath === '' ? [] : explode('/', $routePath);

// Ожидаем первый сегмент "countries"
$resource = $segments[0] ?? null;
$id       = $segments[1] ?? null;

$method = $_SERVER['REQUEST_METHOD'];

try {
    $pdo = getPDO();
} catch (Throwable $e) {
    send_json(['error' => 'DB connection failed', 'details' => $e->getMessage()], 500);
}

// ----- ПРОВЕРКА РЕСУРСА -----
if ($resource !== 'countries' && $resource !== null) {
    send_json(['error' => 'Not found'], 404);
}

// ----- CRUD ДЛЯ /countries -----
switch ($method) {
    case 'GET':
        if ($id === null) {
            // GET /countries - список всех стран
            $stmt = $pdo->query('SELECT * FROM countries ORDER BY id');
            $rows = $stmt->fetchAll();
            send_json($rows);
        } else {
            // GET /countries/{id}
            $stmt = $pdo->prepare('SELECT * FROM countries WHERE id = ?');
            $stmt->execute([(int)$id]);
            $row = $stmt->fetch();
            if (!$row) {
                send_json(['error' => 'Country not found'], 404);
            }
            send_json($row);
        }
        break;

    case 'POST':
        // POST /countries  (JSON в теле)
        $data = get_json_body();
        if (!$data) {
            send_json(['error' => 'Invalid JSON'], 400);
        }

        // Подстрои под свои реальные поля из country.sql
        $name      = $data['name']      ?? null;
        $capital   = $data['capital']   ?? null;
        $population = $data['population'] ?? null;
        $area      = $data['area']      ?? null;
        $continent = $data['continent'] ?? null;

        if (!$name) {
            send_json(['error' => 'Field "name" is required'], 400);
        }

        $stmt = $pdo->prepare('
            INSERT INTO countries (name, capital, population, area, continent)
            VALUES (?, ?, ?, ?, ?)
        ');
        $stmt->execute([
            $name,
            $capital,
            $population,
            $area,
            $continent
        ]);

        $newId = (int)$pdo->lastInsertId();
        $stmt = $pdo->prepare('SELECT * FROM countries WHERE id = ?');
        $stmt->execute([$newId]);
        $newRow = $stmt->fetch();

        send_json($newRow, 201);
        break;

    case 'PUT':
        // PUT /countries/{id}
        if ($id === null) {
            send_json(['error' => 'ID required'], 400);
        }

        $data = get_json_body();
        if (!$data) {
            send_json(['error' => 'Invalid JSON'], 400);
        }

        // Вытаскиваем существующую запись
        $stmt = $pdo->prepare('SELECT * FROM countries WHERE id = ?');
        $stmt->execute([(int)$id]);
        $existing = $stmt->fetch();
        if (!$existing) {
            send_json(['error' => 'Country not found'], 404);
        }

        // Обновляем теми полями, которые пришли
        $name      = $data['name']      ?? $existing['name'];
        $capital   = $data['capital']   ?? $existing['capital'];
        $population = $data['population'] ?? $existing['population'];
        $area      = $data['area']      ?? $existing['area'];
        $continent = $data['continent'] ?? $existing['continent'];

        $stmt = $pdo->prepare('
            UPDATE countries
            SET name = ?, capital = ?, population = ?, area = ?, continent = ?
            WHERE id = ?
        ');
        $stmt->execute([
            $name,
            $capital,
            $population,
            $area,
            $continent,
            (int)$id
        ]);

        $stmt = $pdo->prepare('SELECT * FROM countries WHERE id = ?');
        $stmt->execute([(int)$id]);
        $updated = $stmt->fetch();

        send_json($updated);
        break;

    case 'DELETE':
        // DELETE /countries/{id}
        if ($id === null) {
            send_json(['error' => 'ID required'], 400);
        }

        $stmt = $pdo->prepare('SELECT * FROM countries WHERE id = ?');
        $stmt->execute([(int)$id]);
        $existing = $stmt->fetch();
        if (!$existing) {
            send_json(['error' => 'Country not found'], 404);
        }

        $stmt = $pdo->prepare('DELETE FROM countries WHERE id = ?');
        $stmt->execute([(int)$id]);

        send_json(['success' => true]);
        break;

    default:
        send_json(['error' => 'Method not allowed'], 405);
}
