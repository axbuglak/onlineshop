import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // обязательное поле
      unique: true // уникальное поле
    },
    password: {
      type: String,
      required: true
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId, // поле со ссылкой на другой объект
        ref: 'Post' // название модели, к которой она относится
      }
    ]
  },
  { timestamps: true } // история создания и изменения объекта
)


export default mongoose.model('User', userSchema)