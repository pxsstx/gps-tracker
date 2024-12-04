'use client'

// import library
import { useState, useEffect } from 'react';
import Map, { Layer, Marker, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; //styles

// import components
import useGPSData from '../hooks/useGPSData';             // firebase fetch data
import useGPSCurrent from '../hooks/useGPSCurrent';       // firebase fetch data
import SoundToggle from './SoundToggle';                  // send sound value to firebase
import SendDataToFirebase from './SendDataToFirebase';    // send radius ,lat ,lon to firebase
import GpsData from './GpsData';                          // data from firebase show text
import CircleRadiusInput from './CircleRadiusInput';      // set CircleRadius

const MapGps = () => {
  const [sendData, setSendData] = useState(false);        // State to trigger data sending
  const [circleRadius, setCircleRadius] = useState(50);   // Default radius
  const gpsData = useGPSData();                           // set marker in map
  const gpsCurrent = useGPSCurrent();                     // set CenterCircle
  const [viewport, setViewport] = useState({              // Default map
    latitude: 13.965777000913254, // Default to Bangkok
    longitude: 100.58574661014674,
    zoom: 12,
  });

  useEffect(() => {
    if (gpsData) {
      setViewport((prev) => ({
        ...prev,
        latitude: gpsData.lat,
        longitude: gpsData.lon,
      }));
    }
  }, [gpsData]);

  const handleSetCurrentLocation = () => {
    if (gpsData?.lat && gpsData.lon) {
      setSendData(true); // Immediately trigger sending data to Firebase
      setTimeout(() => {
        setSendData(false); // You can reset the state or trigger any other behavior after the delay
      }, 1000); // 1 seconds delay
    } else {
      console.error('GPS data is not available');
    }
  };

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const radius = Number(event.target.value);
    if (!isNaN(radius)) {
      setCircleRadius(radius);
    }
  };

  return (
    <div className="w-[90%] h-[400px] md:h-[550px] mx-auto">
      {gpsData && <GpsData gpsData={gpsData} />}

      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        initialViewState={viewport}
        mapStyle="mapbox://styles/pxsstx/cm45tga7s009p01r196z8eafw"
        // onMove={(evt) => setViewport(evt.viewState)}
        doubleClickZoom
        minZoom={15}
        maxZoom={20}
      >
        {gpsData && (
          <>
            <Marker latitude={gpsData.lat} longitude={gpsData.lon}>
              <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', fontSize: '30px' }}>
                🏎️
                <div style={{ fontSize: '12px', color: 'black' }}>
                  <p>Speed: {gpsData.speed.toFixed(2)} m/s</p>
                </div>
              </div>
            </Marker>

            <Source
              id="circle-source"
              type="geojson"
              data={{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: gpsCurrent ? [gpsCurrent.lon, gpsCurrent.lat] : [gpsData.lon, gpsData.lat],
                },
              }}
            >
              <Layer
                id="circle-layer"
                type="circle"
                paint={{
                  'circle-radius': circleRadius,
                  'circle-color': 'rgba(0, 123, 255, 0.3)',
                  'circle-stroke-width': 2,
                  'circle-stroke-color': 'rgba(0, 123, 255, 1)',
                }}
              />
            </Source>
          </>
        )}
      </Map>

      <div className="w-full flex flex-col md:flex-row justify-center mt-3 gap-x-10 gap-y-5">
        <SoundToggle />

        <button
          className="px-3 py-2 bg-[#8dc2ad] rounded-xl"
          onClick={() => handleSetCurrentLocation()}
        >
          Set Current Location
        </button>

        <CircleRadiusInput value={circleRadius} onChange={handleRadiusChange} />
      </div>

      {/* Conditionally render SendDataToFirebase when the button is clicked */}
      {sendData && gpsData?.lat && gpsData?.lon && (
        <SendDataToFirebase lat={gpsData.lat} lon={gpsData.lon} radius={circleRadius} />
      )}
    </div>
  );
};

export default MapGps;