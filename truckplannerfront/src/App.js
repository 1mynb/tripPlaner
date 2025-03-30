
import React, { useState } from 'react';
import Prompts from './pages/prompts';
import ViewMap from './pages/viewMap';
import '../src/Assets/common.css'
import '../src/Assets/boxicons.min.css'
import '../src/Assets/css/prompts.css'


function App() {
  const [tripId, setTripId] = useState(null);
  const [mapMasterErrors, setMapMasterErrors] = useState({});
  
  return (
    <div className='trip-cntr'>
      <Prompts setTripId={setTripId} mapMasterErrors={mapMasterErrors} />
      {tripId && <ViewMap tripId={tripId} setMapMasterErrors={setMapMasterErrors} />}

      {/* <h2>Daily Log Sheet</h2>
      <LogSheet /> */}

    </div>
  );
}

export default App;
