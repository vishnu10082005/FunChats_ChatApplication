import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import "./Signup.css"
import axios from "axios"
import logo from "../Assests/Logo.png"
// import logo from "../Assests/logo.png"
import { setAuthCookies } from './Cookiee.js';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../ParentContext.jsx';
const Signup = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/formcreation", data)
      setAuthCookies(response.data.userUid);
      if (!response.data.success) {
        alert("user Already Exist Please Login")
      }
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
    // console.log(data);
  };

return (
  <div className="form-container">
    <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
      <div className="logo" style={{
        display: "flex",
        width: "100%",
        // padding:"20px",
        justifyContent: "space-between",
        marginBottom: "30px",
        alignItems: "center"
      }}><img width={"40%"} src={logo} alt="" />
        <h2>Sign Up</h2>
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          id="name"
          type="text"
          {...register('username', { required: 'Username is required' })}
        />
        {errors.username && <p className="error-message">{errors.username.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Entered value does not match email format'
            }
          })}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must have at least 6 characters'
            }
          })}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === watch('password') || 'Passwords do not match'
          })}
        />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit" className="submit-button">Sign Up</button>
    <p>User Already Exists</p>
    </form>
  </div>
);
};

export default Signup;
