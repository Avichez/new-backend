/**
 * Создание сервера на NODE.JS с использование Express
 */

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require('dotenv').config();
const methodOverride = require("method-override");
const postRoutes = require("./routes/post-routes");
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require("./routes/contact-routes");
const createPath = require('./helpers/create-path');


const app = express();

//указывает шаблонизатор с которым будет работать, в нашем случае ejs.
app.set("view engine", "ejs");


mongoose
  .connect(process.env.MONGO_URL) // попробовать убрать последнии два параметра { useNewUrlParser: true, useUnifiedTopology: true}. Работает и без них!
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));



app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
});

// плюсом express будет так же то, что нам не нужно указывать setHeader как в классическом варианте.
// !Примечание. код роутинга должен быть всегда в правильном порядке,
// к примеру если метод .use() выставить выше всех остальных то,
// при запросе всегда будет выпадать страница с ошибкой.

// middleware Это функция которая выполняется между запросом к сервер и ответом обратно к браузеру.
// !Примечание, каждый middleware запрос должен создаваться перед Роутингом ответа. Либо после прослушивания порта.
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
); // заменили наш самописный логер на модуль morgan.
// app.use((req, res, next) => {
//   console.log(`path: ${req.path}`);
//   console.log(`method: ${req.method}`);
//   next();
// });

app.use(express.urlencoded({ extended: false })); // отказываемся от расширенного парсинга

// Изначально Node.js защищает все файлы и папки, и для того что бы был например доступ
// к стилям нужно в middleware дать доступ к тем файлам который браузер может прочесть.
app.use(express.static("styles")); // метод express.static  позволит нам добавить указанную папку в исключения.

app.use(methodOverride("_method"));

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});

app.get("/about-us", (req, res) => {
  res.redirect("/contacts");
});

// метод use больше относиться же как middleware, он отлавливает непонятные запросы пользователя и переводит на страницу с ошибкой.
app.use((req, res) => {
  const title = "Error Page";
  res.status(404).render(createPath("error"), { title });
});
