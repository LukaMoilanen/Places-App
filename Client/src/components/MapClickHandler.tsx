import { useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

type MapClickHandlerProps = {
    onPick: (lat: number, lng: number) => void;
};

export function MapClickHandler({ onPick }: MapClickHandlerProps) {
    const map = useMap();

    useMapEvents({
        click: (e) => {
            // wrap() keeps the longitude between -180 and 180 (the server requires that)
            const { lat, lng } = e.latlng.wrap();
            onPick(lat, lng);
        },
    });

    // Show a crosshair cursor on the map while this component exists
    // (it only exists when the user is logged in). When it disappears, the cursor goes back to normal.
    useEffect(() => {
        const container = map.getContainer();
        container.classList.add('leaflet-crosshair');
        return () => container.classList.remove('leaflet-crosshair');
    }, [map]);

    return null;
}
