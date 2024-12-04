// components/SendDataToFirebase.tsx
import { getDatabase, ref, set } from 'firebase/database';
import { useEffect } from 'react';

interface SendDataToFirebaseProps {
  lat: number;
  lon: number;
  radius: number;
}

const SendDataToFirebase = ({ lat, lon, radius }: SendDataToFirebaseProps) => {
  const sendDataToFirebase = async (lat: number, lon: number, radius: number) => {
    try {
      const db = getDatabase();
      const gpsRef = ref(db, 'gps-current');
  
      const currentDate = new Date().toISOString();
  
      // Set the data to Firebase
      await set(gpsRef, {
        lat,
        lon,
        radius,
        timestamp: currentDate,
      });
  
      console.log('Data successfully sent to Firebase!');
    } catch (error) {
      console.error('Error sending data to Firebase:', error);
    }
  };

  useEffect(() => {
    if (lat && lon && radius) {
      sendDataToFirebase(lat, lon, radius);
    }
  }, [lat, lon, radius]);

  return (null);
};

export default SendDataToFirebase;