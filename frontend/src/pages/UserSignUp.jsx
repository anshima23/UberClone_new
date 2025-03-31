import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserSignup = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const [error, setError] = useState('');

  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    };

    try {
      // Add withCredentials: true to send cookies along with the request
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser,
        { withCredentials: true }
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
        
        // Clear form fields after successful registration
        resetFormFields();
      }
    } catch (err) {
      setError('Failed to create account. Please try again later.');
      console.error('Error creating account:', err);
    }
  };

  // Helper function to reset form fields
  const resetFormFields = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
  };

  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src='https://www.svgrepo.com/show/505031/uber-driver.svg' alt='' />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg w-full font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type='text'
              placeholder='First name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type='text'
              placeholder='Last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type='email'
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type='password'
            placeholder='password'
          />

          <button className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'>
            Create Account
          </button>
          
          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}
          
        </form>

        <p className='text-center'>
          Already have an account? 
          <Link to='/login' className='text-blue-600'> Login here</Link>
        </p>
      </div>

      {/* ReCAPTCHA Disclaimer */}
      <div>
        <p className='text-[10px] leading-tight'>
          This site is protected by reCAPTCHA and the{' '}
          <span className='underline'>Google Privacy Policy</span> and{' '}
          <span className='underline'>Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
