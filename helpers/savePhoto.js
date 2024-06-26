const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const randomstring = require('randomstring');
const { UPLOADS_DIR } = require('../config');
const generateError = require('../helpers/generateError');
require('dotenv').config();

async function savePhoto (photo) {

  const uploadsPath = path.resolve(__dirname, '../', UPLOADS_DIR);

  try {
    await fs.access(uploadsPath);
  } catch {
    await fs.mkdir(uploadsPath);
  }

  try {
    const image = sharp(photo.data);

    const imageName = randomstring.generate(15) + path.extname(photo.name);

    const imagePath = path.join(uploadsPath, imageName);

    await image.toFile(imagePath);

    return imageName;
  } catch (error) {
    throw generateError(error, 500);
  }
}

module.exports = savePhoto;
