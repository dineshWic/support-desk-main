const { info, convert } = require('pdf-poppler');
const path = require('path');

const convertPdfToImages = async (pdfPath, outputDir) => {
  try {
    const opts = {
      format: 'png',
      out_dir: outputDir,
      out_prefix: 'image',
    };

    const { numPages } = await info(pdfPath);

    const imagePaths = [];

    for (let i = 0; i < numPages; i++) {
      const imagePath = path.join(outputDir, `image-${i + 1}.png`);
      await convert(pdfPath, opts, i + 1);
      imagePaths.push(imagePath);
    }

    return imagePaths;
  } catch (error) {
    console.error('Error converting PDF to images:', error);
    throw error;
  }
};

module.exports = convertPdfToImages;
