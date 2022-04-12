const mongoose = require("mongoose")

const wishSchema = mongoose.Schema(
  {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
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

