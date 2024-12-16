'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';

interface MapWrapperProps {
  center?: number[]
}

const MapWrapper = ({ center }: MapWrapperProps) => {
  const Map = useMemo(() => dynamic(() => import('./Map'), { 
    ssr: false,
    loading: () => <div className="h-[35vh] rounded-lg bg-neutral-200" />
  }), []);

  return (
    <div className="h-[35vh] relative z-0">
      <Map center={center} />
    </div>
  );
};

export default MapWrapper; 