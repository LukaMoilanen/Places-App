import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles.css';
import { getPlaces } from './api';
import type { Place } from '../types';
import { PlaceMarker } from './components/PlaceMarker';
import { MapFocus } from './components/MapFocus';

const App = () => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedPlace = places.find((p) => p.ID === selectedId) ?? null;

    useEffect(() => {
        getPlaces()
            .then(setPlaces)
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <ul>
                {places.map((p) => (
                    <li
                        key={p.ID}
                        onClick={() => setSelectedId(p.ID)}
                        className={p.ID === selectedId ? 'selected' : ''}
                    >
                        {p.Name} ({p.Latitude.toFixed(4)},{' '}
                        {p.Longitude.toFixed(4)})
                    </li>
                ))}
            </ul>
            <MapContainer
                style={{ height: '400px' }}
                center={[62.59, 29.77]}
                zoom={13}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {places.map((p) => (
                    <PlaceMarker
                        key={p.ID}
                        place={p}
                        isSelected={p.ID === selectedId}
                        onSelect={setSelectedId}
                    />
                ))}
                <MapFocus selectedPlace={selectedPlace} />
            </MapContainer>
        </>
    );
};

export default App;