// components/GpsData.tsx

import GpsInfoRow from './GpsInfoRow';

interface GpsDataProps {
  gpsData: {
    lat: number;
    lon: number;
    heading: number;
    speed: number;
  };
}

const GpsData: React.FC<GpsDataProps> = ({ gpsData }) => {
  return (
    <div className="md:flex grid grid-cols-2 gap-x-5 justify-between px-5 py-3 bg-[#8dc2ad] rounded-t-xl">
      <GpsInfoRow label="Latitude" value={gpsData.lat} />
      <GpsInfoRow label="Longitude" value={gpsData.lon} />
      <GpsInfoRow label="Heading" value={gpsData.heading} />
      <GpsInfoRow label="Speed" value={gpsData.speed} />
    </div>
  );
};

export default GpsData;