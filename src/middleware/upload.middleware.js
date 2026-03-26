const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const { clientId, lawyerId } = req.body;

    const cleanName = file.originalname.replace(/\s+/g, '_');

    const uniqueName = `${clientId}_${lawyerId}_${Date.now()}_${cleanName}`;

    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;