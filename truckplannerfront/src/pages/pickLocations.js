import React, {useState} from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function PickLocations ({onSelect, onClose, setSearchResultsCurrent, setSearchResultsPickup, setSearchResultsDropOff, modalOpen}){
    const [selectedPosition, setSelectedPosition] = useState(null);
   // const [searchResults, setSearchResults] = useState([]);
   // const [searchInput, setSearchInput] = useState("");

    // Capture user clicks to select a location
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

    
    

   /*  const handleSearch = async (newVal, actionMeta) => {
        if (actionMeta.action !== "input-change") return; // Ensure it's a valid input change event
        console.log(typeof newVal, newVal) // ✅ Should be a string, not a Promise

        if (typeof newVal !== "string") {
            console.error("Invalid search input:", newVal);
            return;
        }

        const formattedSearch = newVal.replace(/\s+/g, "+"); // ✅ Prevent TypeError
            
        
        setSearchInput(newVal);
        if (!newVal) {
          setSearchResults([]);
          return;
        }

       // const formattedQuery = encodeURIComponent(newVal);
    
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${formattedSearch}`
        );
        const data = await response.json();

        console.log('data:', data)
    
        const options = data.map((place) => ({
          label: typeof place.display_name === 'string' ? place.display_name : '',
          value: { lat: parseFloat(place.lat), lon: parseFloat(place.lon) },
        }));
    
        console.log('options:', options)
        setSearchResults(options);
    }; */
    
      // Handle selecting from the search bar
      /* const handleSelectSearch = (selectedOption) => {
        console.log('in change method:', selectedOption)
        if (!selectedOption) {
            setSelectedPosition(null);
            return;
          }

        const { lat, lon } = selectedOption.value;
        setSelectedPosition({ lat, lon });
        onSelect({ lat, lon, address: selectedOption.label });
      }; */

      /* const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => func(...args), delay);
        };
      };
      
      const debouncedSearch = debounce((value,actionMeta)=>{setSearchInput(value);handleSearch(value, actionMeta)}, 500);
     */
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