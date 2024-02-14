const cloudinary = require("cloudinary").v2
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});

//upload image on cloudinary
const uploadOnCloudinary = async (imgPath) => {
    try {
        const response = await cloudinary.uploader.upload(imgPath, {
            resource_type: "image",
            folder: "Gallery-Images"
        })
        return response
    } catch (error) {
        console.log("Error in uploadOnCloudinary utility function: ",error)
    }
}

//delete image from cloudinary
const deleteFromCloudinary = async (imgPath) => {
    try {
        const response = await cloudinary.uploader.destroy(imgPath, {
            resource_type: "image",
            folder: "Gallery-Images"
        })
        return response
    } catch (error) {
        console.log("Error in deleteFromCloudinary utility function: ",error)
    }
}


module.exports = {uploadOnCloudinary , deleteFromCloudinary}