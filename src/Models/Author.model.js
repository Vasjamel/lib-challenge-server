const { Schema, default: mongoose } = require('mongoose')


const authorSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
})

module.exports = mongoose.model('Author', authorSchema)
