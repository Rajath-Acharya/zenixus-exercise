import axios from 'axios';
import React, { useState } from 'react';
import styles from '../styles/signup.module.scss';
import { BASE_API } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const Signup:React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const api = `${BASE_API}register`;
      await axios.post(api, {
        username,
        email,
        password,
        role
      })
      navigate('/login'); 
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div  className={styles.signupContainer}>
      <form onSubmit={onSubmit} className={styles.signupForm}>
        <h1>Register</h1>
        <div>
          <label htmlFor='username'>Username</label>
          <input 
            type="text" 
            id="username"
            value={username} 
            placeholder="Enter your username" 
            required
            onChange={e => setUsername(e.target.value)}
          />
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
          <label htmlFor='role'>Role</label>
           <select value={role} onChange={handleSelectChange} required>
            <option value="">Select an option</option>
            <option value="MANAGER>">Manager</option>
            <option value="LEAD">Lead</option>
            <option value="DEVELOPER">Developer</option>
          </select>
        </div>
        <button type='submit'>Signup</button>
      </form>
    </div>
  );
}

export default Signup;
