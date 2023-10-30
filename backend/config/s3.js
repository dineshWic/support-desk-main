// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
// const { v4: uuidv4 } = require('uuid');
// const fs = require('fs');

// accessKeyId = process.env.ACCESS_KEY,
// secretAccessKey = process.env.ACCESS_SECRET,
// region = process.env.REGION
// const bucketName = process.env.BUCKET;

// // Initialize S3 client
// const s3Client = new S3Client({
//     region,
//     credentials: {
//       accessKeyId,
//       secretAccessKey
//     }
// })


// // Upload the file to S3
// const uploadFileToS3 = async (file) => {
//   console.log("This file works");
//   const fileName = `${uuidv4()}_${file.originalname}`;

//   const uploadParams = {
//     Bucket: bucketName,
//     Body: fileBuffer,
//     Key: fileName,
//     ContentType: file.mimetype
//   };

//   // Send the upload to S3
//   const response = await s3Client.send(new PutObjectCommand(uploadParams));
//   console.log(response.error);

// }

// module.exports = uploadFileToS3;

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
  },
});

const uploadFileToS3 = async (file) => {
    console.log('called this');
  const uploadParams = {
    Bucket: process.env.BUCKET,
    Key: `${uuidv4()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    const response = await s3Client.send(command);

    if (!response) {
      throw new Error("Failed to upload the file to Amazon S3.");
    }

    return `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
  } catch (error) {
    console.error("Error occurred while uploading file:", error);
    throw error;
  }
};

module.exports = uploadFileToS3;
