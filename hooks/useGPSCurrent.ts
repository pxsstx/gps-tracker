// hooks/useGPSData.ts
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase'; // Import Firebase database instance

interface GPSDataCurrent {
  lat: number;
  lon: number;
}

const useGPSCurrent = () => {
  const [gpsDataCurrent, setGpsDataCurrent] = useState<GPSDataCurrent | null>(null);

  useEffect(() => {
    const gpsRef = ref(database, 'gps-current'); // Replace with your Firebase path
    const unsubscribe = onValue(gpsRef, (snapshot) => {
      const data = snapshot.val();
    //   console.log('Data from Firebase:', data);  

      if (
        data &&
        typeof data.lat === 'number' &&
        typeof data.lon === 'number'
      ) {
        setGpsDataCurrent({
          lat: data.lat,
          lon: data.lon
        });
      } else {
        console.error('Invalid GPS data:', data);
        setGpsDataCurrent(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return gpsDataCurrent;
};

export default useGPSCurrent;