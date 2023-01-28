const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_Key: process.env.CLOUDINARY_API_KEY,
    api_Secret : process.env.CLOUDINARY_API_SECRET
})

const cloudinaryUploadImage = async (fileToUpload) => {
    try {
        const data = await cloudinary.uploader.upload(fileToUpload,{
            resource_type : "auto"
        })
        return {
            url : data?.secure_url,
        };
    } catch (error) {
        return error;
    }

}

module.exports = cloudinaryUploadImage;