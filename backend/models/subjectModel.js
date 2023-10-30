const { text } = require('express')
const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema(
  {
    subjectCode: {
      type: String,
      required: [true, 'Please add the Subject code'],
    },
    subjectName: {
      type: String,
      required: [true, 'Please add the Subject name'],
    },
    year: {
      type: Number,
      required:[true, 'Please add the Year']
    },
    lectureId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    semester:{
        type: Number,
    },
    academicYear:{
        type:Number,
    }

  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Subject', subjectSchema)