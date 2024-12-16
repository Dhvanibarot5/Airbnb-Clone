'use client';

import L from 'leaflet';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[]
}

const Map: React.FC<MapProps> = ({ center }) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !mapRef.current) {
      const position = center ? center as L.LatLngExpression : [51, -0.09];
      mapRef.current = L.map(containerRef.current).setView(position, center ? 4 : 2);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      if (center) {
        L.marker(position).addTo(mapRef.current);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center]);

  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.setView(center as L.LatLngExpression, 4);
      
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          layer.remove();
        }
      });
      
      L.marker(center as L.LatLngExpression).addTo(mapRef.current);
    }
  }, [center]);

  return (
    <div 
      ref={containerRef} 
      className="h-[35vh] rounded-lg z-0 relative"
    />
  );
};

export default Map; 