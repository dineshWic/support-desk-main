const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { getFirebaseApp } = require('./firebaseConfig');
const { v4: uuidv4 } = require('uuid');

const uploadFileToFirebase = async (file) => {
  try {
    const storage = getStorage(getFirebaseApp());
    const storageRef = ref(storage, `uploads/pdf/${uuidv4()}_${file.originalname}`);
    // console.log("This is file",file);
    // console.log("storageRef",storageRef);

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: file.mimetype
    };

    await uploadBytes(storageRef, file.buffer,metadata);
    // console.log("file.buffer", file.buffer);

    const downloadURL = await getDownloadURL(storageRef);
    // console.log("downloadURL", downloadURL);

    return downloadURL;
  } catch (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
};

module.exports = { uploadFileToFirebase };
