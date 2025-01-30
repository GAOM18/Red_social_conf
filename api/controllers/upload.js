import multer from 'multer';
import path from 'path';

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export const uploadFile = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Error al subir el archivo:', err); // Log the full error for debugging
      return res.status(500).json({ message: 'Error al subir el archivo', error: err });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
  });
};