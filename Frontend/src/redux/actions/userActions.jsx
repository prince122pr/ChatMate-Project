import { API } from "../../axios/axios";
import { setUserData } from "../slices/userSlice";

// Get current user
export const getCurrentUser = () => async (dispatch) => {
  try {
    const res = await API.get("/user/get-current-user");
    if (res?.data?.user) {
      dispatch(setUserData(res.data.user));
    }
  } catch (error) {
    console.error("getCurrentUser error:", error.response?.data || error.message);
    // If token expired or user not found → clear state
    dispatch(setUserData(null));
  }
};

// Register new user
export const createUser = (user) => async () => {
  try {
     await API.post("/auth/register", {
      fullname: {
        firstname: user.firstName,
        lastname: user.lastName,
      },
      email: user.email,
      password: user.password,
    });
  } catch (error) {
    console.error("createUser error:", error.response?.data || error.message);
  }
};

// Logout user
export const logoutUser = () => async (dispatch) => {
  try {
    await API.get("/auth/logout");
    dispatch(setUserData(null));
  } catch (error) {
    console.error("logoutUser error:", error.response?.data || error.message);
  }
};
