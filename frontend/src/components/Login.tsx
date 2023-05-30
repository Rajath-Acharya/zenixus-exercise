import axios from 'axios';
import React, { useState } from 'react';
import styles from '../styles/login.module.scss';
import { BASE_API } from '../utils/constants';

const Login:React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const api = `${BASE_API}login`;
      const response = await axios.post(api, {
        email,
        password
      })
      const token = response?.data?.accessToken;
      localStorage.setItem("token", token);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div  className={styles.loginContainer}>
      <form onSubmit={onSubmit} className={styles.loginForm}>
        <h1>Login</h1>
        <div>
          <label htmlFor='email'>Email</label>
          <input 
            type="email" 
            id="email"
            value={email} 
            placeholder="example@xyz.com" 
            required
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
          <input 
            type="password" 
            id="password"
            value={password} 
            placeholder="*******" 
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;
