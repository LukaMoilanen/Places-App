import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import '../styles.css';
import { getPlaces } from './api';
import type { Place } from '../types';
import { PlacesView } from './components/PlacesView';

const App = () => {
    const [places, setPlaces] = useState<Place[]>([]);

    useEffect(() => {
        getPlaces()
            .then(setPlaces)
            .catch((err) => console.error(err));
    }, []);

    return (
        <PlacesView places={places} />
    );
};

export default App;