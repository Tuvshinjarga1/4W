"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Search, X, Navigation, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface LocationPickerProps {
  value: string;
  onChange: (
    location: string,
    coordinates?: { lat: number; lng: number }
  ) => void;
}

// Улаанбаатарын районууд
const UB_DISTRICTS = [
  { name: "Баянзүрх дүүрэг", lat: 47.9077, lng: 106.9521 },
  { name: "Баянгол дүүрэг", lat: 47.9146, lng: 106.8897 },
  { name: "Хан-Уул дүүрэг", lat: 47.8878, lng: 106.9625 },
  { name: "Чингэлтэй дүүрэг", lat: 47.9286, lng: 106.9204 },
  { name: "Сонгинохайрхан дүүрэг", lat: 47.9024, lng: 106.8411 },
  { name: "Сүхбаатар дүүрэг", lat: 47.9186, lng: 106.9057 },
  { name: "Төв хороо", lat: 47.9216, lng: 106.9142 },
  { name: "Зайсан", lat: 47.903, lng: 106.9347 },
  { name: "4-р микрорайон", lat: 47.9239, lng: 106.8983 },
  { name: "Хорооллын зах", lat: 47.9134, lng: 106.9198 },
];

// Улаанбаатарын төв координат
const UB_CENTER = { lat: 47.9186, lng: 106.9177 };

// Map component with GPS functionality
function MapWithGPS({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
}) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );
  const [isLoadingGPS, setIsLoadingGPS] = useState(false);

  const getCurrentLocation = () => {
    setIsLoadingGPS(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          setMarkerPosition([latitude, longitude]);
          onLocationSelect(latitude, longitude);
          setIsLoadingGPS(false);
        },
        (error) => {
          console.error("GPS алдаа:", error);
          setIsLoadingGPS(false);
          alert("GPS байршил авах боломжгүй байна. Гараар байршил сонгоно уу.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    } else {
      alert("Таны төхөөрөмж GPS-д дэмжлэг үзүүлдэггүй байна.");
      setIsLoadingGPS(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-[1000] flex gap-2">
        <Button
          type="button"
          size="sm"
          onClick={getCurrentLocation}
          disabled={isLoadingGPS}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Crosshair className="w-4 h-4 mr-1" />
          {isLoadingGPS ? "Хайж байна..." : "GPS"}
        </Button>
      </div>

      <MapContainer
        center={position || UB_CENTER}
        zoom={13}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerPosition && (
          <Marker position={markerPosition}>
            <div className="text-red-500 text-2xl">📍</div>
          </Marker>
        )}
      </MapContainer>

      <div className="mt-2 text-xs text-neutral-600 text-center">
        💡 Газрын зураг дээр дарж байршил сонгох боломжтой
      </div>
    </div>
  );
}

export default function LocationPicker({
  value,
  onChange,
}: LocationPickerProps) {
  const [showMap, setShowMap] = useState(false);
  const [showList, setShowList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(value);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const filteredDistricts = UB_DISTRICTS.filter((district) =>
    district.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocationSelect = (district: (typeof UB_DISTRICTS)[0]) => {
    setSelectedLocation(district.name);
    setCoordinates({ lat: district.lat, lng: district.lng });
    onChange(district.name, { lat: district.lat, lng: district.lng });
    setShowList(false);
  };

  const handleMapLocationSelect = (lat: number, lng: number) => {
    // Reverse geocoding - find nearest district
    let nearestDistrict = UB_DISTRICTS[0];
    let minDistance = Infinity;

    UB_DISTRICTS.forEach((district) => {
      const distance = Math.sqrt(
        Math.pow(lat - district.lat, 2) + Math.pow(lng - district.lng, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestDistrict = district;
      }
    });

    setSelectedLocation(nearestDistrict.name);
    setCoordinates({ lat, lng });
    onChange(nearestDistrict.name, { lat, lng });
  };

  const handleManualInput = (inputValue: string) => {
    setSelectedLocation(inputValue);
    onChange(inputValue);
  };

  return (
    <div>
      <Label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
        <MapPin className="w-4 h-4" />
        Байршил
      </Label>

      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="жишээ нь: Төв хороо, Гүүшийн гудамж"
            value={selectedLocation}
            onChange={(e) => handleManualInput(e.target.value)}
            required
          />
          <div className="flex gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setShowMap(!showMap);
                setShowList(false);
              }}
              className="flex items-center gap-1"
            >
              <MapPin className="w-4 h-4" />
              {showMap ? "Хаах" : "Газрын зураг"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setShowList(!showList);
                setShowMap(false);
              }}
              className="flex items-center gap-1"
            >
              <Navigation className="w-4 h-4" />
              Жагсаалт
            </Button>
          </div>
        </div>

        {coordinates && (
          <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
            📍 Координат: {coordinates.lat.toFixed(6)},{" "}
            {coordinates.lng.toFixed(6)}
          </div>
        )}

        {showMap && (
          <div className="border border-neutral-200 rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-neutral-800">
                Газрын зураг дээр байршил сонгох
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowMap(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <MapWithGPS onLocationSelect={handleMapLocationSelect} />

            <div className="mt-3 p-3 bg-neutral-50 rounded text-xs text-neutral-600">
              💡 Зөвлөгөө: GPS товч дарж одоогийн байршил авах эсвэл газрын
              зураг дээр дарж байршил сонгох
            </div>
          </div>
        )}

        {showList && (
          <div className="border border-neutral-200 rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-neutral-800">Байршил сонгох</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowList(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="mb-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                <Input
                  placeholder="Байршил хайх..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1">
              {filteredDistricts.map((district, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleLocationSelect(district)}
                  className={`w-full text-left p-2 rounded hover:bg-neutral-100 transition-colors ${
                    selectedLocation === district.name
                      ? "bg-green-50 border border-green-200"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{district.name}</span>
                  </div>
                </button>
              ))}
              {filteredDistricts.length === 0 && searchTerm && (
                <p className="text-sm text-neutral-500 text-center py-4">
                  "{searchTerm}" илэрц олдсонгүй
                </p>
              )}
            </div>

            <div className="mt-3 p-3 bg-neutral-50 rounded text-xs text-neutral-600">
              💡 Зөвлөгөө: Дээрх жагсаалтаас сонгох эсвэл шууд бичиж оруулах
              боломжтой
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
