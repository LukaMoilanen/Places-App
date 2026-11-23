import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { Place } from '../../types';
import { PlaceMarker } from './PlaceMarker';
import { MapFocus } from './MapFocus';

type PlacesViewProps = {
    places: Place[];
};

export function PlacesView({ places }: PlacesViewProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedPlace = places.find((p) => p.ID === selectedId) ?? null;

    return (
        <>
            <div className="layout">
                <ul className="place-list">
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
                        />
                    ))}
                    <MapFocus selectedPlace={selectedPlace} />
                </MapContainer>
            </div>
        </>
    );
}