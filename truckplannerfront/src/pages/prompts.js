import React, { useState } from "react";
import { PromptsSchema } from "../validations/promptsValidation";
import { addTrips } from "../services/promptsService";
import PickLocations from "./pickLocations";
import Select from "react-select";

function Prompts ({ setTripId, mapMasterErrors }){
    // use state variable for locations
    const [locations, setLocations] = useState({
        current: { address: "", lat: null, lon: null },
        pickup: { address: "", lat: null, lon: null },
        dropoff: { address: "", lat: null, lon: null },
    });
    //use state variable for current cycle use
    const [current_cycle_used, setCurrentCycleUsed] = useState()
    
    const [modalOpen, setModalOpen] = useState(null); // Track which field opened the map
    const [masterErrors, setMasterErrors] = useState({});
    const [searchResultsCurrent, setSearchResultsCurrent] = useState([]);
    const [searchResultsPickup, setSearchResultsPickup] = useState([]);
    const [searchResultsDropOff, setSearchResultsDropOff] = useState([]);
    //const [searchInput, setSearchInput] = useState("");

    /**
     *method: handlePromptsChange
     description: method to set the values of location on field change
     args:
        field: which field is changed
        location: the location value
     Returns:
        nothing
     */
    const handlePromptsChange = (field, location) => {
        setLocations(prevLocations => ({
            ...prevLocations,
            [field]: {
                address: location.address,
                lat: location.lat,
                lon: location.lon
            }
        }));
        

        setModalOpen(null); // Close the modal
    };

    //on change handler for cycle use
    const handleCycleUsed = (e) =>{
        setCurrentCycleUsed(e.target.value)
    }

     
     /**
     *method: validateForm
     description: method to validate the prompts before saving
     args:
        masterData: the fields inserted by the user
     Returns:
        true if it is valide false otherwise
     */
    const validateForm = async (masterData) =>{
        try{
            //console.log('master data:', masterData)
            await PromptsSchema.validate(masterData, {abortEarly: false})
            setMasterErrors({})
            return true
        } catch(err){
            const validationErrors = {};
            err.inner?.forEach(error => {
                validationErrors[error.path] = error.message
            })
            console.log(validationErrors)
            setMasterErrors(validationErrors)
            return false;
        }
    }
   
     /**
     *method: handleSubmit
     description: method to save the inputs
     args:
        e: the event
     Returns:
        nothing
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMasterErrors({});
        setTripId(null)
        const masterData = {
            current_location: locations.current.address,
            current_location_latitude: locations.current.lat,
            current_location_longitude: locations.current.lon,

            pickup_location: locations.pickup.address,
            pickup_location_latitude: locations.pickup.lat,
            pickup_location_longitude: locations.pickup.lon,

            dropoff_location: locations.dropoff.address,
            dropoff_location_latitude: locations.dropoff.lat,
            dropoff_location_longitude: locations.dropoff.lon,
            current_cycle_used:parseFloat(current_cycle_used)
        }
       // console.log('master data:', masterData)

        const isValid = await validateForm(masterData)
        if(isValid){
            try {
                const {status, result} = await addTrips(masterData)
                if (status === 201){
                    setTripId(result.trip_id);
                } else{
                    setMasterErrors({...masterErrors, 'error': result.error})
                }
               

            } catch (error) {
                console.error("Error creating trip:", error);
                setMasterErrors(error)
            }
        }

       
    };

    /**
     *method: handleSearchCurrent
     description: method to handle for current location search
     args:
        newVal: the input characters
     Returns:
        nothing
    */
    const handleSearchCurrent = async (newVal, actionMeta) => {
        if (actionMeta.action !== "input-change") return; // Ensure it's a valid input change event
        if (typeof newVal !== "string") {
            console.error("Invalid search input:", newVal);
            return;
        }

        const formattedSearch = newVal.replace(/\s+/g, "+"); // ✅ Prevent TypeError
            
        
        //setSearchInput(newVal);
        if (!newVal) {
          setSearchResultsCurrent([]);
          return;
        }

       // const formattedQuery = encodeURIComponent(newVal);
    
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${formattedSearch}`
        );
        const data = await response.json();

        //console.log('data:', data)
    
        const options = data.map((place) => ({
          label: typeof place.display_name === 'string' ? place.display_name : '',
          value: { lat: parseFloat(place.lat), lon: parseFloat(place.lon) },
        }));
    
        //console.log('options:', options)
        setSearchResultsCurrent(options);
    };

    /**
     *method: handleSearchPickup
     description: method to handle for pickup location search
     args:
        newVal: the input characters
     Returns:
        nothing
    */
    const handleSearchPickup = async (newVal, actionMeta) => {
        if (actionMeta.action !== "input-change") return; // Ensure it's a valid input change event
        if (typeof newVal !== "string") {
            console.error("Invalid search input:", newVal);
            return;
        }

        const formattedSearch = newVal.replace(/\s+/g, "+"); // ✅ Prevent TypeError
            
        
        //setSearchInput(newVal);
        if (!newVal) {
          setSearchResultsPickup([]);
          return;
        }

       // const formattedQuery = encodeURIComponent(newVal);
    
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${formattedSearch}`
        );
        const data = await response.json();

        //console.log('data:', data)
    
        const options = data.map((place) => ({
          label: typeof place.display_name === 'string' ? place.display_name : '',
          value: { lat: parseFloat(place.lat), lon: parseFloat(place.lon) },
        }));
    
        //console.log('options:', options)
        setSearchResultsPickup(options);
    };

    /**
     *method: handleSearchDropOff
     description: method to handle for dropoff location search
     args:
        newVal: the input characters
     Returns:
        nothing
    */
    const handleSearchDropOff = async (newVal, actionMeta) => {
        if (actionMeta.action !== "input-change") return; // Ensure it's a valid input change event
        if (typeof newVal !== "string") {
            console.error("Invalid search input:", newVal);
            return;
        }

        const formattedSearch = newVal.replace(/\s+/g, "+"); // ✅ Prevent TypeError
            
        
        //setSearchInput(newVal);
        if (!newVal) {
          setSearchResultsDropOff([]);
          return;
        }

       // const formattedQuery = encodeURIComponent(newVal);
    
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${formattedSearch}`
        );
        const data = await response.json();
    
        const options = data.map((place) => ({
          label: typeof place.display_name === 'string' ? place.display_name : '',
          value: { lat: parseFloat(place.lat), lon: parseFloat(place.lon) },
        }));
    
    
        setSearchResultsDropOff(options);
    };


    /**
     *method: handleSelectSearch
     description: method to handle for the input coming from search bar
     args:
        selectedOption: the selected option
        locType: the field type
     Returns:
        nothing
    */
    const handleSelectSearch = (selectedOption, locType) => {
       // console.log(selectedOption)
       // console.log(locType)
        if (selectedOption) {
            const { lat, lon } = selectedOption.value;
            const location = {lat, lon, address: selectedOption.label}
            handlePromptsChange(locType, location)
          }
        
    };

     /**
     *method: debounce
     description: method to debounce if there are multiple input change
     args:
        func: the given function
        delay: the delay duration
     Returns:
        nothing
    */
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };
      
    const debouncedSearchCurrent = debounce((value,actionMeta)=>{handleSearchCurrent(value, actionMeta)}, 500);
    const debouncedSearchPickup = debounce((value,actionMeta)=>{handleSearchPickup(value, actionMeta)}, 500);
    const debouncedSearchDropoff = debounce((value,actionMeta)=>{handleSearchDropOff(value, actionMeta)}, 500);

    //console.log('master errors:', masterErrors)

    return (
            <div className="page-content">
                    <div className="prompts-module">
                            <p className="prompts-title">Plan your trip</p>
                            <div className="promts-body">
                                <ul className='row'>
                                    {masterErrors.error && <p className="form-error-hdr">{masterErrors.error}</p>}
                                    {mapMasterErrors.error && <p className="form-error-hdr">{mapMasterErrors.error}</p>}
                                    <li className='col-1-1'>
                                        <div className="field-input">
                                            {masterErrors['current_location'] && <span className="form-error">{masterErrors['current_location']}</span>}
                                            <div className={`add-row ${masterErrors['current_location'] ? 'validation': ''}`}>
                                                <label htmlFor="current_location">Current Location</label>
                                                <div className="field-input-group">
                                                    <Select
                                                        name="current_location"
                                                        placeholder="current location..."
                                                        options={searchResultsCurrent}
                                                        onInputChange={(value, actionMeta) => {
                                                            debouncedSearchCurrent(value, actionMeta);
                                                        }}
                                                        onChange={(selectedOption)=>handleSelectSearch(selectedOption,'current')}
                                                        value={searchResultsCurrent.find((opt) => opt.label === locations.current.address) || null}
                                                        className="select-val"
                                                        
                                                    />
                                    
                                                    <button className="btn-show-map" name="btn-location"  onClick={() => setModalOpen("current")} >...</button>    
                                                </div>
                                            </div>
                                        </div>

                                        <div className="field-input">
                                            {masterErrors['pickup_location'] && <span className="form-error">{masterErrors['pickup_location']}</span>}
                                            <div className={`add-row ${masterErrors['pickup_location'] ? 'validation': ''}`}>
                                                <label htmlFor="current_location">Pickup Location</label>
                                                <div className="field-input-group">
                                                    <Select
                                                        name="pickup_location"
                                                        placeholder="pickup location..."
                                                        options={searchResultsPickup}
                                                        onInputChange={(value, actionMeta) => {
                                                            debouncedSearchPickup(value, actionMeta);
                                                        }}
                                                        onChange={(selectedOption)=>handleSelectSearch(selectedOption,'pickup')}
                                                        value={searchResultsPickup.find((opt) => opt.label === locations.pickup.address) || null}
                                                        className="select-val"
                                                        
                                                    />
                                    
                                                    <button className="btn-show-map"  name="btn-location"  onClick={() => setModalOpen("pickup")} >...</button>   

                                                </div>
                                                
                                            </div>
                                        </div>

                                        <div className="field-input">
                                            {masterErrors['dropoff_location'] && <span className="form-error">{masterErrors['dropoff_location']}</span>}
                                            <div className={`add-row ${masterErrors['dropoff_location'] ? 'validation': ''}`}>
                                                <label htmlFor="current_location">Dropoff Location</label>
                                                <div className="field-input-group">
                                                    <Select
                                                        name="dropoff_location"
                                                        placeholder="dropoff location..."
                                                        options={searchResultsDropOff}
                                                        onInputChange={(value, actionMeta) => {
                                                            debouncedSearchDropoff(value, actionMeta);
                                                        }}
                                                        onChange={(selectedOption)=>handleSelectSearch(selectedOption,'dropoff')}
                                                        value={searchResultsDropOff.find((opt) => opt.label === locations.dropoff.address) || null}
                                                        className="select-val"
                                                        
                                                    />
                                    
                                                    <button className="btn-show-map" name="btn-location"  onClick={() => setModalOpen("dropoff")} >...</button>    

                                                </div>
                                            </div>
                                        </div>
                                        <div className="field-input">
                                            {masterErrors['current_cycle_used'] && <span className="form-error">{masterErrors['current_cycle_used']}</span>}
                                            <div className={`add-row ${masterErrors['current_cycle_used'] ? 'validation': ''}`}>
                                                <label htmlFor="current_cycle_used">Current Cycle Used (hrs)</label>
                                                <input type="number"  name="current_cycle_used" value={current_cycle_used} onChange={handleCycleUsed}  />    
                                            </div>
                                        </div>
                                    
                                    </li>
                                        
                                </ul>
                            </div>
                            
                            <div className="prompts-footer">
                                <button type="submit" onClick={handleSubmit}>Plan Trip</button> 
                            </div>
                    </div>
        
                    {/* Show Map Popup if Needed */}
                {modalOpen && (
                    <PickLocations
                        onSelect={(location) => handlePromptsChange(modalOpen, location)}
                        onClose={() => setModalOpen(null)}
                        setSearchResultsCurrent={setSearchResultsCurrent}
                        setSearchResultsPickup={setSearchResultsPickup}
                        setSearchResultsDropOff={setSearchResultsDropOff}
                        modalOpen={modalOpen}

                    />
                )}
            </div>
    );
}
export default Prompts