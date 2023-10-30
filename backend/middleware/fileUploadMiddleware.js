const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { getStorage, ref, uploadBytes } = require('firebase/storage');
const { getFirebaseApp } = require('../config/firebaseConfig');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'application/pdf': 'pdf'
};

const fileUpload = multer({
  limits: 50000000,
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid mime type!');
    cb(error, isValid);
  }
});

module.exports = fileUpload;
