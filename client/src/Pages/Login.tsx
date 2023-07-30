'use client'

import axios from 'axios';
import { useState } from 'react';
import { Button } from "../Components/ui/button"

function Login() {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  //middleware?
  const login = () => {
    axios.post("/api/auth/login", {
      username,
      email,
      password
    }, {
      withCredentials: true
    }).then(res=> {
      if (res.data === 'success') window.location.href = "/"
    })
  }

  const getUser = () => {
    axios.get("/api/users/me", {
      withCredentials: true
    }).then(res=> {
      console.log(res.data)
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder='username' onChange={e => setUsername(e.target.value)}></input>
      <input type="text" placeholder='email' onChange={e => setEmail(e.target.value)}></input>
      <input type="text" placeholder='password' onChange={e => setPassword(e.target.value)}></input>
      <Button onClick={login}>Login</Button>
      <Button onClick={getUser}>get user thats logged in</Button>
    </div>
  )
}

export default Login