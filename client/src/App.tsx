import React, { RefObject } from 'react';
import { registerUser, loginUser, getUser } from './features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from './store';


const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: { auth: { email: string; }; }) => state.auth.email);
  const username = useSelector((state: { auth: { username: string; }; }) => state.auth.username);
  
  const registerEmail: RefObject<HTMLInputElement> = React.createRef();
  const registerUsername: RefObject<HTMLInputElement> = React.createRef();
  const registerPassword: RefObject<HTMLInputElement> = React.createRef();
  const loginEmail: RefObject<HTMLInputElement> = React.createRef();
  const loginUsername: RefObject<HTMLInputElement> = React.createRef();
  const loginPassword: RefObject<HTMLInputElement> = React.createRef();

  const register = () => {
    if(registerEmail.current && registerUsername.current && registerPassword.current) {
      dispatch(registerUser({
        email: registerEmail.current.value,
        username: registerUsername.current.value,
        password: registerPassword.current.value,
      }));
    }
  };

  const login = () => {
    if(loginEmail.current && loginUsername.current && loginPassword.current) {
      dispatch(loginUser({
        email: loginEmail.current.value,
        username: loginUsername.current.value,
        password: loginPassword.current.value,
      }));
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input
          placeholder="email"
          ref={registerEmail}
        />
        <input
          placeholder="username"
          ref={registerUsername}
        />
        <input
          placeholder="password"
          ref={registerPassword}
        />
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input
          placeholder="email"
          ref={loginEmail}
        />
        <input
          placeholder="username"
          ref={loginUsername}
        />
        <input
          placeholder="password"
          ref={loginPassword}
        />
        <button onClick={login}>Submit</button>
      </div>

      <div>
        <h1>Get User</h1>
        <button onClick={() => dispatch(getUser())}>Submit</button>
        {email ? <h1>Welcome Back
          Email: {email} {username}</h1> : null}
      </div>
    </div>
  );
}

export default App;
