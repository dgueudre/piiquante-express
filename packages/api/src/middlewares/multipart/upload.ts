import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'dist/packages/api/assets/images');
  },
  filename: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    const id = Date.now() + '-' + Math.round(Math.random() * 1e9);
    callback(null, `${file.fieldname}-${id}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1 }, // 1 MB
});
