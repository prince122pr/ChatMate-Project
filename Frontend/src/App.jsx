import { useEffect } from "react"
import Navbar from "./components/Navbar"
import MainRoutes from "./Routes/MainRoutes"
import { getCurrentUser } from "./redux/actions/userActions"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom";


const App = () => {
    const location = useLocation();
  const isPublicRoute = ["/login", "/register"].includes(location.pathname);
  const dispatch = useDispatch();
    const user = useSelector(store => store.user.userData);

    useEffect(() => {
    if(!isPublicRoute && !user) {dispatch(getCurrentUser())}
  },[dispatch, user, isPublicRoute])
  
  return (
    <div className="w-full min-h-screen">
       {!isPublicRoute && user  && <Navbar />}
      <MainRoutes/>
    </div>
  )
}

export default App