import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to update map center when position changes
function MapUpdater({ center }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

const MapComponent = () => {
    const [busPosition, setBusPosition] = useState([16.047079, 108.206230]); // Default to Danang
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tripsRef = ref(db, 'live_trips');
        const unsubscribe = onValue(tripsRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.lat && data.lng) {
                setBusPosition([data.lat, data.lng]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="h-full w-full rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <MapContainer center={busPosition} zoom={15} scrollWheelZoom={true} className="h-full w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={busPosition}>
                    <Popup>
                        School Bus <br /> Current Location
                    </Popup>
                </Marker>
                <MapUpdater center={busPosition} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
