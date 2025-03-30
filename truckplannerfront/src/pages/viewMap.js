import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import getTrips from "../services/promptsService";
import polyline from '@mapbox/polyline'; 
import MapCenter from "./mapCenter";

function ViewMap({tripId, setMapMasterErrors}) {
    const [route, setRoute] = useState([]);
    const [mapDisplay, setMapDispaly] = useState(true)

    useEffect(()=>{
        try{
         const tripData = async()=>{
            const{status, result} = await getTrips(tripId);
            if(status === 200){
                const  encodedPolyline = result.routes[0].geometry;
                const decodedCoordinates = polyline.decode(encodedPolyline); // Decode polyline to lat/lng array
                setRoute(decodedCoordinates); // Set decoded coordinates in state
                setMapDispaly(true)
                setMapMasterErrors({})
            } else{
                console.log('exceed error:', result)
                setMapDispaly(false)
                setMapMasterErrors(result)
            }
            
         };
         tripData()
        } catch(err){
            console.error("Error fetching route:", err)
        } 
         
     },[tripId, setMapMasterErrors])
    

    return(
        <div className="route-div">
            {
                mapDisplay && 
                <>
                    <p className="prompts-title">Your Route Detail</p>
                    <MapContainer center={[39.5, -98.35]} zoom={4} className="view-map">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {route.length > 0 && <>
                                                <Polyline positions={route} color="blue" />
                                                <MapCenter route={route} />
                                            </>
                        }
                    </MapContainer>
                </>
            }
        </div>
    
    )
}
export default ViewMap;