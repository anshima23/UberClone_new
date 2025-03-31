import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CapatainContext';

const CaptainHome = () => {
    const [position, setPosition] = useState(null);
    const { socket } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext); // Get captain data

    // Function to update the captain's location
    const updateLocation = (lat, lng) => {
        if (socket && captain) {
            socket.emit('update-location-captain', {
                userId: captain._id, // Use actual captain's ID
                location: {
                    lat,
                    lng
                }
            });
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setPosition({ lat: latitude, lng: longitude });
                updateLocation(latitude, longitude);
            });
        }

        // Update location every 10 seconds
        const locationInterval = setInterval(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    setPosition({ lat: latitude, lng: longitude });
                    updateLocation(latitude, longitude);
                });
            }
        }, 10000);

        return () => clearInterval(locationInterval);
    }, [socket, captain]);

    return (
        <div style={{ height: '100vh' }}>
            <MapContainer center={position || [51.505, -0.09]} zoom={13} style={{ height: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                {position && (
                    <Marker position={position}>
                        <Popup>Your location</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default CaptainHome;
