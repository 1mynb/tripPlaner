import  { useEffect } from "react";
import { useMap } from "react-leaflet";

function MapCenter({route}) {
    const map = useMap();

    useEffect(() => {
        if (route && route.length > 0) {
            const bounds = route.map(point => [point[0], point[1]]); // Convert to LatLng array
            map.fitBounds(bounds, { padding: [50, 50] }); // Fit map to route with padding
        }
    }, [route, map]);

    return null;
}
export default MapCenter