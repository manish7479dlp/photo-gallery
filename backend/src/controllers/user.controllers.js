const User = require("../models/user.models");
const bcryptjs = require("bcryptjs");
const apiResponse = require("../utility/apiResponse");
const fs = require("fs");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utility/cloudinary");
const { getPublicKeyOfImage } = require("../utility/helper");

//create user
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, password, userName, email } = req.body;

    if (!firstName) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "firstName required"));
    } else if (!lastName) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "lastName required"));
    } else if (!password) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "password required"));
    } else if (!email) {
      return res.status(400).json(new apiResponse(400, null, "email required"));
    } else if (!userName) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "userName required"));
    }
    const isExistingUser = await User.find({ userName });

    if (isExistingUser.length > 0) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "userName already exist"));
    }

    // const avatar = req?.files?.avatar[0]?.path
    // const coverImage = req?.files?.coverImage[0]?.path

    let addData = {
      firstName,
      lastName,
      password,
      userName,
      email,
    };


    if (
      req.files &&
      Array.isArray(req.files.coverImage) &&
      req.files.coverImage.length > 0
    ) {
      const imgPath = req?.files?.coverImage[0]?.path;
      const { url } = await uploadOnCloudinary(imgPath);
      fs.unlinkSync(imgPath);

      addData.coverImage = url;
    }

    if (
      req.files &&
      Array.isArray(req.files.avatar) &&
      req.files.avatar.length > 0
    ) {
      const imgPath = req?.files?.avatar[0]?.path;
      const { url } = await uploadOnCloudinary(imgPath);
      fs.unlinkSync(imgPath);

      addData.avatar = url;
    }

    const user = await User.create(addData);

    if (user) {
      return res
        .status(201)
        .json(new apiResponse(201, user, "user created sucessfully"));
    }
  } catch (error) {
    console.log("Error", error);
    return res
      .status(400)
      .json(
        new apiResponse(400, null, "error in create user controller", error)
      );
  }
};

//login user
const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "userName required"));
    } else if (!password) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "password required"));
    }

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json(new apiResponse(400, null, "Invalid user"));
    }

    const isMatchPassword = await user.isPasswordCorrect(password);
    const isMatchUserName = user?.userName === userName;

    //check both password or userName match or not.
    if (isMatchPassword && isMatchUserName) {
      const token = user.generateAccessToken();

      return res
        .status(200)
        .json(
          new apiResponse(
            200,
            { user: user, accessToken: token },
            "login Sucessfully"
          )
        );
    } else {
      return res.status(400).json(new apiResponse(400, null, "Invalid user"));
    }
  } catch (error) {
    return res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          "something went wrong in login controller",
          error
        )
      );
  }
};

//update password
const updatePassword = async (req, res) => {
  try {
    const newPassword = req.body?.password;
    if (!newPassword) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "password required"));
    }

    const user = req?.user;

    user.password = newPassword;

    const respone = await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new apiResponse(200, respone, "password updated sucessfully"));
  } catch (error) {
    console.log("Error", error);
    return res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          "something went wrong in updatePassword controller",
          error
        )
      );
  }
};

//update email
const updateEmail = async (req, res) => {
  try {
    const newEmail = req.body?.email;
    if (!newEmail) {
      return res.status(400).json(new apiResponse(400, null, "email required"));
    }

    const user = req?.user;

    user.email = newEmail;

    const respone = await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new apiResponse(200, respone, "email updated sucessfully"));
  } catch (error) {
    console.log("Error", error);
    return res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          "something went wrong in updateEmail controller",
          error
        )
      );
  }
};

//update firstName
const updateFirstName = async (req, res) => {
  try {
    const firstName = req.body?.firstName;
    if (!firstName) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "firstName required"));
    }

    const user = req?.user;

    user.firstName = firstName;

    const response = await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new apiResponse(200, response, "firstName updated sucessfully"));
  } catch (error) {
    console.log("Error", error);
    return res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          "something went wrong in updateFirstName controller ",
          error
        )
      );
  }
};

//update lastName
const updateLastName = async (req, res) => {
  try {
    const lastName = req.body?.lastName;
    if (!lastName) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "lastName required"));
    }

    const user = req?.user;

    user.lastName = lastName;

    const response = await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new apiResponse(200, response, "lastName updated sucessfully"));
  } catch (error) {
    console.log("Error", error);
    return res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          "something went wrong in updateLastName controller ",
          error
        )
      );
  }
};

//Update user Details
const updateUserDetails = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "firstName required"));
    } else if (!lastName) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "lastName required"));
    } else if (!email) {
      return res.status(400).json(new apiResponse(400, null, "email required"));
    }

    const user = req?.user;

    (user.firstName = firstName),
      (user.lastName = lastName),
      (user.email = email);

    if (
      req.files &&
      Array.isArray(req.files.coverImage) &&
      req.files.coverImage.length > 0
    ) {
      const preImg = user.coverImage;

      if (preImg) {
        const preImgPublicKey = getPublicKeyOfImage(preImg);
        await deleteFromCloudinary(preImgPublicKey);
      }
      const imgPath = req?.files?.coverImage[0]?.path;
      const { url } = await uploadOnCloudinary(imgPath);
      fs.unlinkSync(imgPath);

      user.coverImage = url;
    }

    if (
      req.files &&
      Array.isArray(req.files.avatar) &&
      req.files.avatar.length > 0
    ) {
      const preImg = user.avatar;

      if (preImg) {
        const preImgPublicKey = getPublicKeyOfImage(preImg);
        await deleteFromCloudinary(preImgPublicKey);
      }
      const imgPath = req?.files?.avatar[0]?.path;
      const { url } = await uploadOnCloudinary(imgPath);
      fs.unlinkSync(imgPath);

      user.avatar = url;
    }

    if (password) {
      {
        user.password = password;
      }
    }

    const response = await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new apiResponse(200, response, "user details updated sucessfully"));
  } catch (error) {
    console.log("Error", error);
    return res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          "something went wrong in userDetailsUpdate controller ",
          error
        )
      );
  }
};

//Delete user
const deleteUser = async (req, res) => {
  try {
    const _id = req?.user._id;
    await User.findByIdAndDelete(_id);

    return res
      .status(200)
      .json(new apiResponse(200, null, "User deleted sucessfully"));
  } catch (error) {
    console.log("Error", error);
    return res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          "something went wrong in deleteUser controller ",
          error
        )
      );
  }
};

//get all user
const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(new apiResponse(200, { users }, "success"));
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          "something went wrong in getAllUser controller ",
          error
        )
      );
  }
};

//add image
const addImage = async (req, res) => {
  try {
    const localPath = req?.file?.path;

    if (!localPath) {
      return res
        .status(400)
        .json(
          new apiResponse(
            400,
            null,
            "something went wrong in addImage controller"
          )
        );
    }

    const user = req?.user;

    const { url } = await uploadOnCloudinary(localPath);
    fs.unlinkSync(localPath);

    user.images.push(url);

    const response = await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(
        new apiResponse(200, { user: response }, "image uploaded sucessfully")
      );
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          "something went wrong in addImage controller",
          error
        )
      );
  }
};

//delete image
const deleteImage = async (req, res) => {
  try {
    const imgName = req.params?.imgName;

    if (!imgName) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "imageName required"));
    }

    const user = req?.user;
    const imgPrivateKey = `Gallery-Images/${imgName}`;

    if (imgPrivateKey) {
      const preImgPublicKey = getPublicKeyOfImage(imgPrivateKey);
      await deleteFromCloudinary(preImgPublicKey);
    }

    const images = user?.images.filter((img) => {
      const arr = img.split("/");
      return arr[arr.length - 1].split(".")[0] !== imgName;
    });
    user.images = images;
    const response = await user.save(
      { validateBeforeSave: false },
      { new: true }
    );

    return res
      .status(200)
      .json(
        new apiResponse(200, { user: response }, "image deleted sucessfully")
      );
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          "something went wrong in addImage controller",
          error
        )
      );
  }
};

//update avatar image
const updateAvatar = async (req, res) => {
  try {
    const imgPath = req?.file?.path;

    if (!imgPath) {
      res
        .status(0)
        .json(
          new apiResponse(400, "Something went wrong in updateAvtar controller")
        );
    }

    const user = req?.user;
    const preImg = user.avatar;

    if (preImg) {
      const preImgPublicKey = getPublicKeyOfImage(preImg);
      await deleteFromCloudinary(preImgPublicKey);
    }

    const { url } = await uploadOnCloudinary(imgPath);
    fs.unlinkSync(imgPath);

    user.avatar = url;
    const response = await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(
        new apiResponse(200, { user: response }, "avatar updated sucessfully")
      );
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(0)
      .json(
        new apiResponse(
          400,
          "Something went wrong in updateAvtar controller",
          error
        )
      );
  }
};

//update cover image
const updateCoverImage = async (req, res) => {
  try {
    const imgPath = req?.file?.path;

    if (!imgPath) {
      res
        .status(0)
        .json(
          new apiResponse(
            400,
            "Something went wrong in update cover image controller"
          )
        );
    }

    const user = req?.user;
    const preImg = user.coverImage;

    if (preImg) {
      const preImgPublicKey = getPublicKeyOfImage(preImg);
      await deleteFromCloudinary(preImgPublicKey);
    }
    const { url } = await uploadOnCloudinary(imgPath);
    fs.unlinkSync(imgPath);

    user.coverImage = url;

    const response = await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(
        new apiResponse(200, { user: response }, "avatar updated sucessfully")
      );
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(0)
      .json(
        new apiResponse(
          400,
          "Something went wrong in updateAvtar controller",
          error
        )
      );
  }
};

//get all images
const getAllImage = async (req, res) => {
  try {
    const users = await User.find();
    let allImages = [];

    users.forEach((user) => (allImages = [...allImages, ...user.images]));

    let digitCount = 0
    let num = allImages.length

    while(num > 0) {
      digitCount++
      num = Math.floor(num / 10)
    
    }

    const randomImage = []
    for(let i = 0; i < allImages.length; i++) {
      let randomImgIdx = Math.floor((Math.random() * Math.pow(10 , digitCount - 1)));
      randomImage.push(allImages[randomImgIdx])
    }

    res
      .status(200)
      .json(new apiResponse(200, (images = { randomImage }), "Sucess"));
  } catch (error) {
    console.log("Error in get all image controller", error);
    res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          "Something went wrong in get all image controller",
          error
        )
      );
  }
};

//get user by userName
const getUserByUserName = async (req, res) => {
  try {
    const userName = req.params?.userName;
    if (!userName) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "userName required"));
    }

    const user = await User.findOne({ userName });

    if (!user) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "Invalid userName"));
    }

    return res.status(200).json(new apiResponse(200, user, "User found"));
  } catch (error) {
    console.log("Error in getUserByUserName controller", error);
  }
};

module.exports = {
  createUser,
  login,
  updateLastName,
  updateFirstName,
  updatePassword,
  updateEmail,
  updateUserDetails,
  deleteUser,
  getAllUser,
  addImage,
  deleteImage,
  updateAvatar,
  updateCoverImage,
  getAllImage,
  getUserByUserName,
};
