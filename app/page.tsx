import MapGps from '@/components/MapGps';

export default function Home() {
  return (
    <div className='flex flex-col items-center w-[100svw] h-[100svh] gap-y-5 overflow-hidden'>
      <h1 className='mt-5 text-4xl'>GPS Tracker</h1>
      <MapGps />
    </div>
  );
}