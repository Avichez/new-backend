/**
 * Создадим сервер с помощью http модуля.
 */

/**
 * Статус кода ошибка сервера.
 * 1xx - Information
 * 2xx - Success
 * 3xx - Rdirction
 * 4xx - Client Errors
 * 5xx - Server Errors
 * 
 */

const http = require("http");

// делаем мелкий рефакторинг кода.
const PORT = 3000;

// метод createServer() имеет один аргумент, а именно callback функция, которая будет отрабатывать
// каждый раз как сервер будет получать request.
const server = http.createServer((req, res) => {
  console.log("Server Request");

  // с помощью req.url и req.method мы удостоверились, что сервер работает правильно и запрос от браузера пришел верный (GET)
  console.log(req.url, req.method);

  // С помощью setHeader мы указываем бразуеру с каким типом данных ему придеться сейчас работать. Это обязательный параметр.
  res.setHeader("Content-Type", "application/json");

  const data = JSON.stringify([
    { name: "Bogdan", age: 29 },
    { name: "Yana", age: 24 },
  ]);
  //   res.write('<head><link rel="stylesheet" href="#"></head>')
  //   res.write('<h1>Hello World</h1>');
  //   res.write('<p>It\'s Me Bogdan</p>');
  res.end(data); // с помощью .end() мы говорим что ответ собран и готов к передаче данных в бразуер , а браузер уже может брать управление на себя.
});

// указываем порт который будет слушать наш сервер.
// второй это имя хоста, но по умолчанию это localhost, по сути можно и не указывтаь.
server.listen(PORT, "localhost", (error) => {
  // с помощью callback функции мы будет проверять сервер на ошибки.
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
