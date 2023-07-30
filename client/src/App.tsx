import NavBar from './Components/NavBar'
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import HomePage from './Pages/HomePage';
import AdminPage from './Pages/AdminPage';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import './App.css'
import { myContext } from './Pages/Context';

function App() {
  const ctx = useContext(myContext)
  return (
    <> 
      <NavBar/>
      <Routes>
        
      <Route path='/' element={HomePage()} />
        {
          ctx ? 
          (<>
            {ctx.isAdmin ? <Route path='/admin' element={AdminPage()} /> : null}
            <Route path='/profile' element={Profile()} />
          </>
          )
          :
          (<>
            <Route path='/login' element={Login()} />
            <Route path='/register' element={Login()} />
          </>)
        }
      </Routes>
    </>
  )
}

export default App
