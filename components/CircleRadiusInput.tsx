// components/CircleRadiusInput.tsx

interface CircleRadiusInputProps {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const CircleRadiusInput: React.FC<CircleRadiusInputProps> = ({ value, onChange }) => {
    return (
      <div>
        <input
          type="number"
          value={value}
          onChange={onChange}
          min={1}
          max={200}
          className="px-3 py-2 bg-[#8dc2ad] rounded-xl lg:w-[150px] w-full"
          placeholder="Set Circle Radius"
        />
      </div>
    );
  };
  
  export default CircleRadiusInput;