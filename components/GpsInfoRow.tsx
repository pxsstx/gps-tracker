// components/GpsInfoRow.tsx

interface GpsInfoRowProps {
    label: string;
    value: string | number;
  }
  
  const GpsInfoRow: React.FC<GpsInfoRowProps> = ({ label, value }) => {
    return (
      <div className="flex gap-x-3">
        <h1>{label}:</h1>
        <p>{value}</p>
      </div>
    );
  };
  
  export default GpsInfoRow;