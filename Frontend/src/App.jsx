import Navbar from "./components/Navbar"
import MainRoutes from "./Routes/MainRoutes"

const App = () => {
  return (
    <div className="w-full min-h-screen">
      <Navbar/>
      <MainRoutes/>
    </div>
  )
}

export default App