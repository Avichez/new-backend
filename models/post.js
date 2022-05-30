// Описываем схему для базы данных, а именно нашего обьекта поста.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Теперь эту схему необходимо применить к модели. Имя модели всегда пишется с большой буквы.

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

