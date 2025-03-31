import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CapatainContext';
import axios from 'axios';

const CaptainSignup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const { setCaptain } = React.useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email,
            password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType
            }
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

            if (response.status === 201) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem('captain-token', data.token); // Store token correctly
                navigate('/captain-home');

                // Clear form fields after successful registration
                resetFormFields();
            }
        } catch (err) {
            // Handle Axios error gracefully
            setError(err.response ? err.response.data.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to reset form fields
    const resetFormFields = () => {
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
    };

    return (
        <div className='py-5 px-5 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

                <form onSubmit={submitHandler}>
                    <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>
                    <div className='flex gap-4 mb-7'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            type="text"
                            placeholder='First name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            type="text"
                            placeholder='Last name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com'
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="password"
                        placeholder='password'
                    />

                    {/* Vehicle Information Section */}
                    <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                    <div className='flex gap-4 mb-7'>
                        <input
                            required
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            type="text"
                            placeholder='Vehicle Color'
                        />
                        <input
                            required
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            type="text"
                            placeholder='Vehicle Plate'
                        />
                    </div>

                    {/* Vehicle Capacity and Type */}
                    <div className='flex gap-4 mb-7'>
                        <input
                            required
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            type="number"
                            placeholder='Vehicle Capacity'
                        />
                        <select
                            required
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                        >
                            <option value="" disabled>Select Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="moto">Moto</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Create Captain Account'}
                    </button>

                    {error && <p className="text-red-500 text-center">{error}</p>}
                </form>

                {/* Link to Login */}
                <p className='text-center'>
                    Already have an account? 
                    <Link to='/captain-login' className='text-blue-600'>Login here</Link>
                </p>
            </div>

            {/* ReCAPTCHA Disclaimer */}
            <div>
                <p className='text-[10px] mt-6 leading-tight'>
                    This site is protected by reCAPTCHA and the 
                    <span className='underline'>Google Privacy Policy</span> and 
                    <span className='underline'>Terms of Service apply</span>.
                </p>
            </div>
        </div>
    );
};

export default CaptainSignup;
