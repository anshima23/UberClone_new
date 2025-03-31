// src/components/MapComponent.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Use public path for marker icon images
const markerIcon = `${process.env.PUBLIC_URL}/images/marker-icon.png`;
const markerIcon2x = `${process.env.PUBLIC_URL}/images/marker-icon-2x.png`;
const markerShadow = `${process.env.PUBLIC_URL}/images/marker-shadow.png`;

// Fix for default marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapComponent = ({ pickup, destination }) => {
    const position = pickup.lat && pickup.lng ? [pickup.lat, pickup.lng] : [51.505, -0.09]; // Default position

    return (
        <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            {pickup.lat && pickup.lng && (
                <Marker position={[pickup.lat, pickup.lng]}>
                    <Popup>Pickup Location</Popup>
                </Marker>
            )}
            {destination.lat && destination.lng && (
                <Marker position={[destination.lat, destination.lng]}>
                    <Popup>Destination Location</Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default MapComponent;
