import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import type { Place } from '../../types';

const normalIcon = L.divIcon({
    className: 'place-marker',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
});

const selectedIcon = L.divIcon({
    className: 'place-marker place-marker-selected',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
});

type PlaceMarkerProps = {
    place: Place;
    isSelected: boolean;
    onSelect: (id: number) => void;
    children?: ReactNode;
};

export function PlaceMarker({ place, isSelected, onSelect, children }: PlaceMarkerProps) {
    const markerRef = useRef<L.Marker | null>(null);

    useEffect(() => {
        const marker = markerRef.current;
        if (!marker) return;

        if (isSelected) {
            marker.openPopup();
        } else {
            marker.closePopup();
        }
    }, [isSelected]);

    return (
        <Marker
            position={[place.Latitude, place.Longitude]}
            icon={isSelected ? selectedIcon : normalIcon}
            ref={markerRef}
            zIndexOffset={isSelected ? 1000 : 0}
            eventHandlers={{ click: () => onSelect(place.ID) }}
        >
            <Popup>
                <div className="popup-content">
                    <strong>{place.Name}</strong>
                    {children}
                </div>
            </Popup>
        </Marker>
    );
}