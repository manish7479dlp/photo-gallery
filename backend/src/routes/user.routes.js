const express = require("express")
const router = express.Router();
const {verifyJWT} = require("../middlewares/auth.middlewares")
const {upload} = require("../middlewares/multer.middlewares")

const {createUser, login, updateFirstName, updateLastName, updateEmail, updatePassword, updateUserDetails, deleteUser, getAllUser, addImage, deleteImage} = require("../controllers/user.controllers")

//create user route
router.post("/create" , createUser);

// login route
router.post("/login" , login)

//update firstName route
router.patch("/update/first-name" , verifyJWT , updateFirstName)

//update lastName route
router.patch("/update/last-name" , verifyJWT , updateLastName)

//update email route
router.patch("/update/email" , verifyJWT , updateEmail)

//update email route
router.patch("/update/password" , verifyJWT , updatePassword)

//update full user details
router.patch("/update/user-details",verifyJWT , updateUserDetails)

//delete user details
router.delete("/delete", verifyJWT , deleteUser)

//get all user 
router.get("/" , getAllUser)

//add image 
router.post("/upload/image",verifyJWT, upload.single("image") , addImage)

//delete image
router.delete("/image/:imgName", verifyJWT , deleteImage)


module.exports = router;