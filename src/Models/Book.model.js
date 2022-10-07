const { Schema, default: mongoose } = require('mongoose')

const bookSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String },
  year: { type: Number },
  description: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'Author' }
})

module.exports = mongoose.model('Book', bookSchema)
