import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import type { Place } from '../../types';

type MapFocusProps = {
    selectedPlace: Place | null;
};

export function MapFocus({ selectedPlace }: MapFocusProps) {
    const map = useMap();

    const lat = selectedPlace?.Latitude;
    const lng = selectedPlace?.Longitude;

    useEffect(() => {
        if (lat === undefined || lng === undefined) return;
        map.flyTo([lat, lng], map.getZoom(), { duration: 0.6 });
    }, [lat, lng, map]);

    return null;
}