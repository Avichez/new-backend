// Описываем схему для базы данных, а именно нашего обьекта поста.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    }
  },
);

// Теперь эту схему необходимо применить к модели. Имя модели всегда пишется с большой буквы.

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;