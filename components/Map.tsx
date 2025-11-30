"use client";
import { useState, useCallback, memo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Map = ({ locations }: { locations: any[] }) => {
  const [map, setMap] = useState(null);

  const containerStyles = {
    width: "100%",
    height: "90%",
  };

  const centerLatitude = parseFloat(locations[0]?.coordinates.lat) || 0; // Default to 0 if latitude is missing or invalid
  const centerLongitude = parseFloat(locations[0]?.coordinates.lng) || 0; // Default to 0 if longitude is missing or invalid

  const center = {
    lat: centerLatitude,
    lng: centerLongitude,
  };

  console.log({ center });

  const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || "",
  });

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map: any) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyles}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Add your Marker components here if needed */}
      {locations.map((location: any, index: number) => (
        <Marker
          key={index}
          position={{ lat: location.coordinates.lat, lng: location.coordinates.lng }}
          icon={{
            url: image,
            // scaledSize: new window.google.maps.Size(20, 30),
            // origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(5, 58),
          }}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(Map);
