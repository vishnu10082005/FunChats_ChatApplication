import React from 'react';
import { useForm } from 'react-hook-form';
import "./Forms.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const showToast = (message) => {
    toast.success(message, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        width: 'auto',
        maxWidth: '400px', 
      },
    });
  };
  const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        width: 'auto',
        maxWidth: '400px', 
      },
    });
  };
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/signUp", data);
      if (response.data.message) {
        showToast("Sign-Up Successful! Please log in.");
      }
      else{
        showErrorToast("User Already Exists Please Login to enter .")
      }
    } catch (error) {
      showErrorToast("Error during sign-up. Please try again.");
      console.error(error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Username is required' })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
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
      <ToastContainer />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
