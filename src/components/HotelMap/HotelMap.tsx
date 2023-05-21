import React from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function HotelMap({ hotel }: any) {
  const coordinates = React.useMemo(() => {
    return {
      longitude: hotel.longitude,
      latitude: hotel.latitude,
    };
  }, [hotel]);

  const [viewport, setViewport] = React.useState({
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    zoom: 13,
  });

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MB_ACCESS_KEY}
      mapStyle="mapbox://styles/extravirgin/clfk4hh3m001301mhearrq7q0"
      {...viewport}
      onMove={(e) => setViewport(e.viewState)}
      reuseMaps={true}
      attributionControl={false}
    >
      <Marker {...coordinates} color="#243c50" />
      <NavigationControl showCompass={false} />
    </Map>
  );
}

export default HotelMap;
