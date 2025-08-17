const multer = require("multer");
const path = require("path");

// Usamos memoria para no guardar en disco
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(ext);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    // No lanzar error directamente, sino pasarlo al request
    req.fileValidationError = "Solo se permiten imágenes en formato .jpeg, .jpg, .png o .webp";
    cb(null, false);
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024 // 5 MB
};

const upload = multer({
  storage,
  fileFilter,
  limits
});

module.exports = upload;
