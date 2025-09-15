import axios from "axios"
import { setUserData } from "../slices/userSlice";


export const getCurrentUser = () => async(dispatch) => {
    let res = await axios.get("http://localhost:8000/api/user/get-current-user", {withCredentials: true});
    dispatch(setUserData(res.data.user))
}

export const createUser = (user) => async() => {
    axios.post("http://localhost:8000/api/auth/register", {
         fullname: {
           firstname: user.firstName,
           lastname: user.lastName,
         },
         email: user.email,
         password: user.password,
       },{withCredentials: true})
} 

export const logoutUser = () => async(dispatch) => {
    try {
      let res = await axios.get('http://localhost:8000/api/auth/logout', {withCredentials: true});
      console.log(res);
      dispatch(setUserData(null))
      dispatch(getCurrentUser())
      
      return res
    } catch (error) {
      console.log(error);
      
    }
}