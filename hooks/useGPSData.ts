// hooks/useGPSData.ts
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase'; // Import Firebase database instance

interface GPSData {
  lat: number;
  lon: number;
  heading: number;
  speed: number;
}

const useGPSData = () => {
  const [gpsData, setGpsData] = useState<GPSData | null>(null);

  useEffect(() => {
    const gpsRef = ref(database, 'gps-data'); // Replace with your Firebase path
    const unsubscribe = onValue(gpsRef, (snapshot) => {
      const data = snapshot.val();
      // console.log('Data from Firebase:', data);

      if (
        data &&
        typeof data.lat === 'number' &&
        typeof data.lon === 'number' &&
        typeof data.heading === 'number' &&
        typeof data.speed === 'number'
      ) {
        setGpsData({
          lat: data.lat,
          lon: data.lon,
          heading: data.heading,
          speed: data.speed,
        });
      } else {
        console.error('Invalid GPS data:', data);
        setGpsData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return gpsData;
};

export default useGPSData;