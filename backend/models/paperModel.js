const { text } = require('express')
const mongoose = require('mongoose')

const paperSchema = mongoose.Schema(
  {
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Subject',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },  
    assignmentMarks: {
      type: Number,
    },
    systemMarks:{
      type:Number,
    },
    lectureMarks:{
      type:Number
    },

  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Paper', paperSchema)
