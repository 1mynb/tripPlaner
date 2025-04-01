import React, {useState} from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function PickLocations ({onSelect, onClose, setSearchResultsCurrent, setSearchResultsPickup, setSearchResultsDropOff, modalOpen}){
    //use state variable for selected positionn of the map
    const [selectedPosition, setSelectedPosition] = useState(null);
   
  
    /**
     *method: MapClickHandler
     description: method to Capture user clicks to select a location
     args:
        nothing
     Returns:
        nothing
    */
    const MapClickHandler = () => {
        useMapEvents({
        click: async (e) => {
            setSelectedPosition(e.latlng);

            // Fetch address using OpenStreetMap Nominatim API
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
            );
            const data = await response.json();
            const address = data.display_name || "Unknown Location";

            // Pass back selected location
            onSelect({ lat: e.latlng.lat, lon: e.latlng.lng, address });

            const options = {
              label: data.display_name || "Unknown Location",
              value: { lat: parseFloat(e.latlng.lat), lon: parseFloat(e.latlng.lng) },
            };
            const searchFunc = [options]

            if(modalOpen === 'current'){
              setSearchResultsCurrent(searchFunc)
            } else if(modalOpen === 'pickup'){
              setSearchResultsPickup(searchFunc)
            } else if(modalOpen === 'dropoff'){
              setSearchResultsDropOff(searchFunc)
            }
            
        },
        });
        return null;
    };

  
    return (
        <div className="div-loc-picker">
            <div className="loc-picker">
              <p className="divider-title">Select Location</p>
                <i className="bx bx-x btn-close" onClick={onClose}></i>

                <MapContainer center={[37.7749, -122.4194]} zoom={5} className="map-cntr">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapClickHandler />
                    {selectedPosition && <Marker position={selectedPosition} />}
                </MapContainer>
            </div>
        </div>
    );
}
export default PickLocations