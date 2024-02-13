const User = require("../models/user.models");
const bcryptjs = require("bcryptjs");
const apiResponse = require("../utility/apiResponse");
const fs = require("fs");

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
      
    }

    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
      addData.coverImage = req?.files?.coverImage[0]?.path
    }

    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
      addData.avatar = req?.files?.avatar[0]?.path
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
    const { firstName, lastName, email , password } = req.body;

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

      if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        user.coverImage = req?.files?.coverImage[0]?.path
      }
  
      if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        user.avatar = req?.files?.avatar[0]?.path
      }

      if(password) {{
        user.password = password
      }}

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
    user.images.push(localPath);

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
    const imageName = `upload\\${imgName}`;
    fs.unlinkSync(imageName);
    const images = user?.images.filter((img) => {
      return img !== imageName;
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
      fs.unlinkSync(preImg);
    }
    user.avatar = imgPath;

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
          new apiResponse(400, "Something went wrong in update cover image controller")
        );
    }

    const user = req?.user;
    const preImg = user.coverImage;
    if (preImg) {
      fs.unlinkSync(preImg);
    }
    user.coverImage = imgPath;

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
  updateCoverImage
};
