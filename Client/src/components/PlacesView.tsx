import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { Place, User } from '../../types';
import { PlaceMarker } from './PlaceMarker';
import { MapFocus } from './MapFocus';
import { MapClickHandler } from './MapClickHandler';
import { NewPlaceMarker } from './NewPlaceMarker';
import { AuthForm } from './AuthForm';
import { AddPlaceForm } from './AddPlaceForm';
import { PlaceActions } from './PlaceActions';

type PlacesViewProps = {
    places: Place[];
    user: User | null;
    onLogin: (user: User) => void;
    onLogout: () => void;
    onAddPlace: (name: string, lat: number, lng: number) => Promise<Place>;
    onEditPlace: (id: number, name: string) => Promise<void>;
    onDeletePlace: (id: number) => Promise<void>;
};

export function PlacesView({
    places,
    user,
    onLogin,
    onLogout,
    onAddPlace,
    onEditPlace,
    onDeletePlace,
}: PlacesViewProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    // the spot the user clicked on the map for a new place
    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
    const selectedPlace = places.find((p) => p.ID === selectedId) ?? null;

    const handleAdd = async (name: string) => {
        if (!position) return;
        const newPlace = await onAddPlace(name, position.lat, position.lng);
        setPosition(null);
        setSelectedId(newPlace.ID);
    };

    const handleDelete = async (id: number) => {
        await onDeletePlace(id);
        if (id === selectedId) setSelectedId(null);
    };

    const canModify = (place: Place) => user !== null && place.UserID === user.ID;

    const handleLogout = () => {
        setPosition(null); // forget the picked spot
        onLogout();
    };

    return (
        <>
            <div className="layout">
                <div className="sidebar">
                    <div className="panel">
                        {user ? (
                            <>
                                <p>
                                    Logged in as <strong>{user.Name}</strong>{' '}
                                    <button
                                        type="button"
                                        className="link-button"
                                        onClick={handleLogout}
                                    >
                                        Log out
                                    </button>
                                </p>
                                <AddPlaceForm position={position} onAdd={handleAdd} />
                            </>
                        ) : (
                            <AuthForm onLogin={onLogin} />
                        )}
                    </div>
                    <ul className="place-list">
                        {places.map((p) => (
                            <li
                                key={p.ID}
                                onClick={() => setSelectedId(p.ID)}
                                className={p.ID === selectedId ? 'selected' : ''}
                            >
                                <span>
                                    {p.Name} ({p.Latitude.toFixed(4)},{' '}
                                    {p.Longitude.toFixed(4)})
                                </span>
                                {canModify(p) && (
                                    <PlaceActions
                                        place={p}
                                        onEdit={onEditPlace}
                                        onDelete={handleDelete}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <MapContainer
                    className="map"
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
                        >
                            {canModify(p) && (
                                <PlaceActions
                                    place={p}
                                    onEdit={onEditPlace}
                                    onDelete={handleDelete}
                                />
                            )}
                        </PlaceMarker>
                    ))}
                    <MapFocus selectedPlace={selectedPlace} />
                    {/* the spot the user picked for a new place */}
                    {user && position && (
                        <NewPlaceMarker lat={position.lat} lng={position.lng} />
                    )}
                    {/* only logged-in users can pick a spot for a new place */}
                    {user && (
                        <MapClickHandler
                            onPick={(lat, lng) => setPosition({ lat, lng })}
                        />
                    )}
                </MapContainer>
            </div>
        </>
    );
}