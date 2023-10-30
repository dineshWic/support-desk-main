const { text } = require('express')
const mongoose = require('mongoose')

const answerSchema = mongoose.Schema(
  {
    pointNo: {
      type: Number,
    },
    questionNO: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'QuestionAnswer',
    },
    text:{
        type:String,
    },
    OCR_accuracy:{
        type:Number,
    },
    OMR_accuracy:{
        type:Number,
    },
    marks:{
      type:Number,
    },


  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Answer', answerSchema)
