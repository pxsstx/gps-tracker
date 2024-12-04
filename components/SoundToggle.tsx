import React, { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';

interface SoundToggleProps {
    initialSound?: boolean; // Optional: Define the initial sound state
}

const SoundToggle: React.FC<SoundToggleProps> = ({ initialSound = false }) => {
    const [sound, setSound] = useState<boolean>(initialSound);

    const handleSound = async () => {
        const newSoundState = !sound; // Toggle sound state
        setSound(newSoundState);

        try {
            const db = getDatabase(); // Initialize database
            const gpsRef = ref(db, 'gps-sound'); // Path in Firebase Realtime Database

            // Get the current date and time
            const currentDate = new Date().toISOString(); // Formats as YYYY-MM-DDTHH:mm:ss.sssZ

            // Set the data to Firebase
            await set(gpsRef, {
                sound: newSoundState, // Use the new state value
                updatedAt: currentDate, // Optional timestamp for tracking
            });

            console.log('Data successfully sent to Firebase at path: gps-sound!');
        } catch (error) {
            console.error('Error sending data to Firebase:', error);
        }
    };

    return (
        <div>
            <button
                className={`px-4 py-2 rounded-xl w-full md:w-[150px] ${sound ? 'bg-lime-500' : 'bg-red-500'}`}
                onClick={() => handleSound()}
            >
                {sound ? "Sound On" : "Sound Off"}
            </button>
        </div>
    );
};

export default SoundToggle;