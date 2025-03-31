import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/MapComponent'; // Import your MapComponent

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false);
            props.setRidePopupPanel(false);
            navigate('/captain-riding', { state: { ride: props.ride } });
        }
    };

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel(false);
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>

            {/* Add Leaflet Map */}
            <MapComponent pickup={props.ride?.pickupCoordinates} destination={props.ride?.destinationCoordinates} />

            {/* Existing content */}
            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            {/* Existing form */}
            {/* ... */}
        </div>
    );
};

export default ConfirmRidePopUp;
