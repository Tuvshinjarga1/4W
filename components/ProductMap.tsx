"use client";

import { useState, useEffect } from "react";
import { Navigation, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

interface ProductMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  location: string;
}

export default function ProductMap({ coordinates, location }: ProductMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navigateToLocation = () => {
    const { lat, lng } = coordinates;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  if (!isClient) {
    return (
      <div className="h-full bg-neutral-100 flex items-center justify-center">
        <div className="text-neutral-500">Газрын зураг уншиж байна...</div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      {/* Товчнууд */}
      <div className="absolute top-3 right-3 z-[1000] flex gap-2">
        <Button
          type="button"
          size="sm"
          onClick={navigateToLocation}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          <Navigation className="w-4 h-4 mr-1" />
          Google Maps
        </Button>
      </div>

      {/* Байршлын мэдээлэл */}
      <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-neutral-200">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-green-600" />
          <div>
            <p className="text-sm font-medium text-neutral-800">{location}</p>
            <p className="text-xs text-neutral-600">
              {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
            </p>
          </div>
        </div>
      </div>

      {/* Газрын зураг */}
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <div className="text-red-500 text-3xl drop-shadow-lg">📍</div>
        </Marker>
      </MapContainer>

      {/* Доод хэсгийн мэдээлэл */}
      <div className="absolute bottom-3 left-3 right-3 z-[1000] bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-neutral-600">
              Бүтээгдэхүүний байршил
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={navigateToLocation}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            Зам харах
          </Button>
        </div>
      </div>
    </div>
  );
}
