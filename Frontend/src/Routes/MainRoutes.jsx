import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import Register from '../Pages/Register'
import Login from '../Pages/Login'
import { useSelector } from 'react-redux'


const MainRoutes = () => {
  const user = useSelector(store => store.user.userData);
  return (
    <Routes>
        <Route path="/" element={user? <HomePage/> : <Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
    </Routes>
  )
}

export default MainRoutes