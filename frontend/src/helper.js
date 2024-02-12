const BASE_URL = "http://localhost:8000/api/v1/user";

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
    return responseData
  } catch (error) {
    console.log("Error in createUser function: ", error);
  }
};

//login user
const login = async (data) => {
  try {
    const url = BASE_URL + "/login"

    const response =  await fetch(url , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json()
    console.log(responseData)
    return responseData

  } catch (error) {
    console.log("Error: ", error)
  }
}

export { createUser , login };
