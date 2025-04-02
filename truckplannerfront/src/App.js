
import React, { useState } from 'react';
import Prompts from './pages/prompts';
import ViewMap from './pages/viewMap';
import LogSheet from './pages/logSheet';
import Header from './pages/header';
import Footer from './pages/footer';
import GoUp from './pages/goUp';
import '../src/Assets/common.css'
import '../src/Assets/boxicons.min.css'
import '../src/Assets/css/prompts.css'
import '../src/Assets/css/header.css'
import '../src/Assets/css/footer.css'

function App() {
  const [tripId, setTripId] = useState(null);
  const [mapMasterErrors, setMapMasterErrors] = useState({});
  const [logSheet, setLogSheet] = useState([]);
  
  return (
    <div className='trip-cntr'>
      <Header />
      <Prompts setTripId={setTripId} mapMasterErrors={mapMasterErrors} />
      {tripId && <ViewMap tripId={tripId} setMapMasterErrors={setMapMasterErrors} setLogSheet={setLogSheet} />}

      {
       tripId && logSheet && logSheet.length > 0 && <LogSheet logSheet={logSheet} /> 
      } 

     <Footer />
     <GoUp />

    </div>
  );
}

export default App;
