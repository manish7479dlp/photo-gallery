const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../middlewares/auth.middlewares");
const { upload } = require("../middlewares/multer.middlewares");

const {
  createUser,
  login,
  updateFirstName,
  updateLastName,
  updateEmail,
  updatePassword,
  updateUserDetails,
  deleteUser,
  getAllUser,
  addImage,
  deleteImage,
  updateAvatar,
  updateCoverImage,
  getAllImage,
} = require("../controllers/user.controllers");

//create user route
router.post(
  "/create",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  createUser
);

// login route
router.post("/login", login);

//update firstName route
router.patch("/update/first-name", verifyJWT, updateFirstName);

//update lastName route
router.patch("/update/last-name", verifyJWT, updateLastName);

//update email route
router.patch("/update/email", verifyJWT, updateEmail);

//update email route
router.patch("/update/password", verifyJWT, updatePassword);

//update full user details
router.patch(
  "/update/user-details",
  verifyJWT,
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  updateUserDetails
);

//delete user details
router.delete("/delete", verifyJWT, deleteUser);

//get all user
router.get("/", getAllUser);

//add image
router.post("/upload/image", verifyJWT, upload.single("image"), addImage);

//delete image
router.delete("/image/:imgName", verifyJWT, deleteImage);

//update avatar
router.patch(
  "/update/avatar",
  verifyJWT,
  upload.single("avatar"),
  updateAvatar
);

//update cover image
router.patch(
  "/update/cover-image",
  verifyJWT,
  upload.single("coverImage"),
  updateCoverImage
);

//get all image 
router.get("/all-image", getAllImage)

module.exports = router;
