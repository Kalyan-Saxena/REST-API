const mongoose = require("mongoose")

const wishSchema = mongoose.Schema(
  {
      message: {
          type: String,
          required: [true, 'Please add a message']
      }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Wish', wishSchema)

