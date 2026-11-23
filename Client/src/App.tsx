import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import '../styles.css';
import { getPlaces, addPlace, isUnauthorized } from './api';
import { loadUser, saveUser, clearUser } from './auth';
import type { Place, User } from '../types';
import { PlacesView } from './components/PlacesView';

const App = () => {
    const [places, setPlaces] = useState<Place[]>([]);
    // start with the user saved in local storage (if there is one)
    const [user, setUser] = useState<User | null>(loadUser);

    useEffect(() => {
        getPlaces()
            .then(setPlaces)
            .catch((err) => console.error(err));
    }, []);

    const handleLogin = (loggedInUser: User) => {
        saveUser(loggedInUser); // token goes to local storage
        setUser(loggedInUser);
    };

    const handleLogout = () => {
        clearUser();
        setUser(null);
    };

    const handleAddPlace = async (name: string, lat: number, lng: number) => {
        if (!user) {
            throw new Error('Please log in first');
        }

        try {
            const newPlace = await addPlace(
                { Name: name, Latitude: lat, Longitude: lng, UserID: user.ID },
                user.Token,
            );
            setPlaces((current) => [...current, newPlace]);
            return newPlace;
        } catch (err) {
            if (isUnauthorized(err)) {
                // the token is not valid (anymore) -> log the user out
                handleLogout();
                throw new Error('Your login is no longer valid. Please log in again.');
            }
            throw err;
        }
    };

    return (
        <PlacesView
            places={places}
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onAddPlace={handleAddPlace}
        />
    );
};

export default App;
