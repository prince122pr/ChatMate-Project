import { io } from "socket.io-client";


const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;  //BACKEND URL

export const socket = io(SOCKET_URL, {
  withCredentials: true, // if your token is in cookies
});
