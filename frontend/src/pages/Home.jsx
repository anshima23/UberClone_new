import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import LiveTracking from '../components/LiveTracking';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to login if the user is not authenticated
      navigate('/login');
      return;
    }

    socket.emit('join', { userType: 'user', userId: user._id });

    socket.on('ride-confirmed', (ride) => {
      setVehicleFound(false);
      setWaitingForDriver(true);
      setRide(ride);
    });

    socket.on('ride-started', (ride) => {
      setWaitingForDriver(false);
      navigate('/riding', { state: { ride } });
    });

    return () => {
      socket.off('ride-confirmed');
      socket.off('ride-started');
    };
  }, [user, socket, navigate]);

  const handleLocationChange = async (e, type) => {
    const value = e.target.value;
    type === 'pickup' ? setPickup(value) : setDestination(value);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const suggestions = response.data.suggestions;
      type === 'pickup'
        ? setPickupSuggestions(suggestions)
        : setDestinationSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    }
  };

  return (
    <div className="relative h-screen">
      <LocationSearchPanel
        pickup={pickup}
        destination={destination}
        onPickupChange={(e) => handleLocationChange(e, 'pickup')}
        onDestinationChange={(e) => handleLocationChange(e, 'destination')}
        pickupSuggestions={pickupSuggestions}
        destinationSuggestions={destinationSuggestions}
        setPanelOpen={setPanelOpen}
      />

      {panelOpen && (
        <VehiclePanel
          ref={vehiclePanelRef}
          setPanelOpen={setPanelOpen}
          setVehiclePanel={setVehiclePanel}
          vehiclePanel={vehiclePanel}
          setVehicleType={setVehicleType}
        />
      )}

      {confirmRidePanel && (
        <ConfirmRide
          ref={confirmRidePanelRef}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          vehicleType={vehicleType}
          setFare={setFare}
          setWaitingForDriver={setWaitingForDriver}
        />
      )}

      {vehicleFound && <LookingForDriver />}
      {waitingForDriver && (
        <WaitingForDriver ref={waitingForDriverRef} ride={ride} />
      )}

      <LiveTracking ride={ride} />
    </div>
  );
};

export default Home;
