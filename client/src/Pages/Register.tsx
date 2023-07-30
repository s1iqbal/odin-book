import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { Button } from '../Components/ui/button'

function Register() {
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    //middleware?
    const register = () => {
        axios
            .post(
                '/api/users/register',
                {
                    username,
                    email,
                    password,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res: AxiosResponse) => {
                if (res.data === 'success') window.location.href = '/'
            })
    }

    const getUser = () => {
        axios
            .get('/api/users/me', {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data)
            })
    }

    return (
        <div>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="username register"
                onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input
                type="text"
                placeholder="email register"
                onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
                type="password"
                placeholder="password register"
                onChange={(e) => setPassword(e.target.value)}
            ></input>
            <Button onClick={register}>Register</Button>
            <Button onClick={getUser}>get user thats logged in</Button>
        </div>
    )
}

export default Register
