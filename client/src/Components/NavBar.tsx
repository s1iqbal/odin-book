import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { myContext } from '../Pages/Context';
import axios from 'axios';

function NavBar() {
  const ctx = useContext(myContext)

  const logout = () => {
    axios.post("/api/auth/logout", {
      ctx
    }, {
      withCredentials: true
    }).then(res=> {
      if(res.data === 'success') window.location.href = "/"
    })
  }

  return (
    <div className="NavBar">
      <Link to="/">Home</Link>
      {
        ctx ? 
        (
          <>
            <button onClick={logout}>Logout</button>
            {/* {(ctx.isAdmin ? (<Link to="/admin">Admin</Link>) : null) } */}
            <Link to="/profile">Profile</Link> 
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link> 
          </>
        )
      }
    </div>
  )
}

export default NavBar