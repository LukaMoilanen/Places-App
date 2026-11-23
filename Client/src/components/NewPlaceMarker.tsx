import L from 'leaflet';
import { Marker } from 'react-leaflet';

const newPlaceIcon = L.divIcon({
    className: 'place-marker place-marker-new',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});

type NewPlaceMarkerProps = {
    lat: number;
    lng: number;
};

// A green dot that shows the spot the user picked for a new place
export function NewPlaceMarker({ lat, lng }: NewPlaceMarkerProps) {
    return (
        <Marker
            position={[lat, lng]}
            icon={newPlaceIcon}
            interactive={false} // clicks go through to the map, so the user can pick another spot
            zIndexOffset={1000}
        />
    );
}
