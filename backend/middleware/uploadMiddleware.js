const multer = require("multer");
const path = require("path");


// Where to store uploaded images
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }

});


// File validation
const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(
            new Error("Only JPG, JPEG and PNG images are allowed"),
            false
        );

    }
};


// Multer configuration
const upload = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits: {
        fileSize: 2 * 1024 * 1024
    }

});


module.exports = upload;