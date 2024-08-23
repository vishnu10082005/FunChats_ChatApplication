import React from 'react';
import { useForm } from 'react-hook-form';
import "./Forms.css"
import axios from "axios"
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [cookies, setCookie] = useCookies(['uid']);
  const navigate = useNavigate();
  const onSubmit = async(data) => {
    try {
      const response = await axios.post('http://localhost:5000/login', data);
      if (response.data.success) {
        setCookie('uid', response.data.userId, { path: '/' });
        setCookie('isLoggedIn', true, { path: '/' });
        alert('Login successful');
        navigate("/")
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
