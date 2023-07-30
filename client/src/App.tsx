import NavBar from './Components/NavBar'
import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import HomePage from './Pages/HomePage'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import './App.css'
import { myContext } from './Pages/Context'
import Register from './Pages/Register'

function App() {
    const ctx = useContext(myContext)
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={HomePage()} />
                {ctx ? (
                    <>
                        {/* {ctx.isAdmin ? <Route path='/admin' element={AdminPage()} /> : null} */}
                        <Route path="/profile" element={Profile()} />
                    </>
                ) : (
                    <>
                        <Route path="/login" element={Login()} />
                        <Route path="/register" element={Register()} />
                    </>
                )}
            </Routes>
        </>
    )
}

export default App
