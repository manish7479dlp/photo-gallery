const BASE_URL = "https://gallery-apps.onrender.com/api/v1/user";
const ACCESS_TOKEN = "accessToken";

const createUser = async (data) => {
  try {
    const url = BASE_URL + "/create";

    const formData = new FormData();

    formData.set("firstName", data.firstName);
    formData.set("lastName", data.lastName);
    formData.set("userName", data.userName);
    formData.set("password", data.password);
    formData.set("email", data.email);

    if (data.avatar) {
      formData.set("avatar", data?.avatar[0]);
    }

    if (data.coverImage) {
      formData.set("coverImage", data.coverImage[0]);
    }

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("Error in createUser function: ", error);
  }
};

//login user
const login = async (data) => {
  try {
    const url = BASE_URL + "/login";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log("Error: ", error);
  }
};

//upload image
const uploadImage = async (uploadImg) => {
  try {
    const url = BASE_URL + "/upload/image";
    const formData = new FormData();
    console.log(uploadImg);
    formData.set("image", uploadImg);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        authorization: "Bearer" + localStorage.getItem(ACCESS_TOKEN),
      },
      body: formData,
    });

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log("Error in upload Image helper function: ", error);
  }
};

//delete image
const deleteImage = async (image) => {
  try {
    const url = BASE_URL + "/image/" + image;
    console.log(url);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        authorization: "Bearer" + localStorage.getItem(ACCESS_TOKEN),
      },
    });

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log("Error in upload Image helper function: ", error);
  }
};

//update cover imgae
const updateCoverImage = async (image) => {
  try {
    const url = BASE_URL + "/update/cover-image";
    const formData = new FormData();
    formData.set("coverImage", image);
    const response = await fetch(url, {
      method: "PATCH",
      body: formData,
      headers: {
        authorization: localStorage.getItem(ACCESS_TOKEN),
      },
    });
    const responseData = await response.json();
    // console.log(responseData)
    return responseData;
  } catch (error) {
    console.log("Error in update cover image: ", error);
  }
};

//update avatar imgae
const updateAvatarImage = async (image) => {
  try {
    const url = BASE_URL + "/update/avatar";
    const formData = new FormData();
    formData.set("avatar", image);
    const response = await fetch(url, {
      method: "PATCH",
      body: formData,
      headers: {
        authorization: localStorage.getItem(ACCESS_TOKEN),
      },
    });
    const responseData = await response.json();
    // console.log(responseData)
    return responseData;
  } catch (error) {
    console.log("Error in update avatar image: ", error);
  }
};

//update user details
const updateUserDetails = async (data) => {
  try {
    const url = BASE_URL + "/update/user-details";
    const formData = new FormData();

    console.log(data)

    formData.set("firstName", data.firstName);
    formData.set("lastName", data.lastName);
    formData.set("userName", data.userName);
    formData.set("email", data.email);

    if (data.avatar) {
      formData.set("avatar", data?.avatar[0]);
    }

    if (data.coverImage) {
      formData.set("coverImage", data.coverImage[0]);
    }
    if (data.password) {
      formData.set("password", data.password);
    }

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        authorization: "Bearer" + localStorage.getItem(ACCESS_TOKEN)
      },
      body: formData,
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("Error in update user detaisl helper function: ", error);
  }
};

//getAll image
const getAllImage = async () => {
  try {
    const url = BASE_URL + "/all-image"
    const response = await fetch(url)
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log("Error in get all image helper function: ", error)
  }
}

// getUser by userName
const getUserByUserName = async (userName) => {
  try {
    const url = BASE_URL + "/" + userName
    console.log(url)
    const response = await fetch(url)
    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.log("Error in getUserByUserName helper function: ", error)
  }
}

export {
  createUser,
  login,
  uploadImage,
  deleteImage,
  updateCoverImage,
  updateAvatarImage,
  updateUserDetails,
  getAllImage,
  getUserByUserName,
};
