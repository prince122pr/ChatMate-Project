import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import Register from '../Pages/Register'
import Login from '../Pages/Login'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
    </Routes>
  )
}

export default MainRoutes