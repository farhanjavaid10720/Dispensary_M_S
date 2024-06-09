const multer = require("multer");
const path = require("path");

const uploadStorage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const otherStorage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, path.join(__dirname, "../public/others"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const FilterFile = (req, file, next) => {
  let ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    return next(new Error("Only images are allowed"));
  }
  next(null, true);
};

const uploads = multer({ storage: uploadStorage, fileFilter: FilterFile });
const public = multer({ storage: otherStorage });
module.exports = { uploads, public };
