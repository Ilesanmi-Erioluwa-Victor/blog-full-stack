const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
// storage
const MulterStorage = multer.memoryStorage();

// file type checking..
const MulterFilter = (req, file, cb) => {
    // check file type
    if(file.mimetype.startsWith("image")) {
        cb(null, true)
    }else {
        cb({
         message : "Unsupported file type or format"
        },)
    }
}

const PhotoUpload = multer({
    storage: MulterStorage,
    fileFilter: MulterFilter,
    limits : {
        fileSize : 2000000
    }
})

// Image Resizing...
const ProfilePhotoResize = async (req, res, next) => {
    // Check if there is not file
    if(!req.file) return next();

    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;

    await sharp(req.file.buffer).resize(250, 250)
    .toFormat("jpeg").jpeg({quality : 90}).toFile(path.join(`public/images/profile/${req.file.filename}`));
    next();
}

// Post Image Resizing...
const PostPhotoResize = async (req, res, next) => {
    // Check if there is not file
    if(!req.file) return next();

    req.file.filename = `user-${Date.now()}-${req.file.originalname}`;

    await sharp(req.file.buffer).resize(500, 500)
    .toFormat("jpeg").jpeg({quality : 90}).toFile(path.join(`public/images/posts/${req.file.filename}`));
    next();
}

module.exports = {
    PhotoUpload,
    ProfilePhotoResize,
    PostPhotoResize
}