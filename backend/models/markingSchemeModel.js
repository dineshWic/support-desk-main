const { text } = require('express')
const mongoose = require('mongoose')

const markingSchemeSchema = mongoose.Schema(
  {
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Subject',
    },
    link:{
        type:String,
    },

  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('MarkingScheme', markingSchemeSchema)
