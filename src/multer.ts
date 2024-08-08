import multer from "multer";

// Configure multer for file storage
// const storage = multer.diskStorage({
//   destination: function (req: any, file: any, cb: any) {
//     cb(null, "uploads/"); // Specify the destination directory for uploaded files
//   },
//   filename: function (req: any, file: any, cb: any) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
//   },
// });

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: function (req: any, file: any, cb: any) {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only pdf files are allowed!"));
    }
  },
});

export default upload;
