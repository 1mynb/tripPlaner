import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import getTrips from "../services/promptsService";
import MapCenter from "./mapCenter";

function ViewMap({tripId, setMapMasterErrors, setLogSheet}) {
    //use state constants
    const [route, setRoute] = useState([]);
    const [fuelStops, setFuelStops] = useState([]);
    const [breakStops, setBreakStops] = useState([]);
    const [mapDisplay, setMapDispaly] = useState(true);

    // Start Location (Green)
    const startIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",  // Green location pin
        iconSize: [35, 35],
        iconAnchor: [17, 34],
        popupAnchor: [0, -34]
    });

    // End Location (Red)
    const endIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Red location pin
        iconSize: [35, 35],
        iconAnchor: [17, 34],
        popupAnchor: [0, -34]
    });

    //ful icon
    const fuelIcon = new L.Icon({
        iconUrl: "https://maps.google.com/mapfiles/kml/shapes/gas_stations.png", // Gas pump icon
        iconSize: [35, 35], // Adjust size
        iconAnchor: [17, 34], // Center the icon
        popupAnchor: [0, -30] // Position popup above icon
    });

    //break Icon
    const breakIcon = new L.Icon({
        iconUrl: "/chocolate.png", 
        iconSize: [30, 30],
        iconAnchor: [15,30],
        popupAnchor: [0, -30]
    });

    useEffect(()=>{
        try{
         const tripData = async()=>{
            const{status, result} = await getTrips(tripId);
            if(status === 200){
                // const  encodedPolyline = result.routes[0].geometry;
                // const decodedCoordinates = polyline.decode(encodedPolyline); // Decode polyline to lat/lng array
                //setRoute(decodedCoordinates);
                const formattedRoute = result.route
                const formattedStops = result.fuel_stops
                const formattedBreaks = result.breaks
                const formattedLogsheet = result.log_sheet
                setRoute(formattedRoute)
                setFuelStops(formattedStops)
                setBreakStops(formattedBreaks)
                setLogSheet(formattedLogsheet)
                setMapDispaly(true)
                setMapMasterErrors({})
            } else{
                console.log('error:', result)
                setMapDispaly(false)
                setMapMasterErrors(result)
            }
            
         };
         tripData()
        } catch(err){
            console.error("Error fetching route:", err)
        } 
         
     },[tripId, setMapMasterErrors, setLogSheet])
    

    return(
        <div className="route-div" style={{ marginBottom: '20px' }}>
            {
                mapDisplay && 
                <>
                    <p className="prompts-title">Your Route Detail</p>
                    <MapContainer center={[39.5, -98.35]} zoom={4} className="view-map">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {route.length > 0 && <>
                                                <Polyline positions={route} color="blue" />
                                                <MapCenter route={route} />
                                                
                                                {/* Start Point Marker (Green) */}
                                                <Marker position={route[0]} icon={startIcon}>
                                                    <Popup>Start Location</Popup>
                                                </Marker>

                                                {/* End Point Marker (Red) */}
                                                <Marker position={route[route.length - 1]} icon={endIcon}>
                                                    <Popup>End Location</Popup>
                                                </Marker>
                                            </>
                        }
                        {fuelStops.map((stop, index) => (
                            <Marker key={index} position={stop} icon={fuelIcon}>
                            <Popup>Fuel Stop {index + 1}</Popup>
                            </Marker>
                        ))}
                        {breakStops.map((stop, index) => (
                            <Marker key={index} position={stop} color="red" icon={breakIcon}>
                            <Popup>Break {index + 1}</Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </>
            }
        </div>
    
    )
}
export default ViewMap;