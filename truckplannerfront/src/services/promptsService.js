import { axiosInstance } from "../utils/axiosInstance"

export default function getTrips(id){
    //console.log('trip id:', id)
    return axiosInstance.get('/trips/' + id )
        .then(response => {
            return {
                status: response.status,
                result: response.data,
            };
        })
        .catch(err => {
           console.log('error in service:',err.response.data)
            return {
                status: err.status,
                result: err.response.data,
            }; 
        })
}


export  function addTrips(tp){
   // console.log('trips:', tp)
    return axiosInstance.post('/trips',{
        current_location: tp.current_location ,
        pickup_location: tp.pickup_location,
        dropoff_location: tp.dropoff_location,
        current_cycle_used: tp.current_cycle_used,

        current_location_latitude: tp.current_location_latitude ,
        pickup_location_latitude: tp.pickup_location_latitude,
        dropoff_location_latitude: tp.dropoff_location_latitude,
      
        current_location_longitude: tp.current_location_longitude ,
        pickup_location_longitude: tp.pickup_location_longitude,
        dropoff_location_longitude: tp.dropoff_location_longitude,
    
    })
    .then(response => {
        return {
            status: response.status,
            result: response.data,
        };
    })
    .catch(err => {
        console.log('error in service:',err.response.data)
         return {
             status: err.status,
             result: err.response.data,
         }; 
     })
}
