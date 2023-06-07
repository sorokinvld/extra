import React from "react";
import styles from "./Map.module.css";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  AttributionControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import getCenter from "geolib/es/getCenter";
import { Roboto, Lora } from "@next/font/google";
import Image from "next/image";
import { useCurrency } from "@/utils/currencyProvider";

const robotoveryBold = Roboto({
  subsets: ["latin"],
  weight: "900",
  display: "swap",
});
const robotoBold = Roboto({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});
const lora = Lora({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

type center =
  | false
  | {
      latitude: number;
      longitude: number;
    };

function CustomMap({ searchResult, hovered }: any) {
  const [selectedLocation, setSelectedLocation] = React.useState<any>();
  const [hoveredonMapMarker, sethoveredonMapMarker] = React.useState<any>();
  const { currency } = useCurrency();

  const coordinates = React.useMemo(
    () =>
      searchResult.map((result: any) => ({
        longitude: result.longitude,
        latitude: result.latitude,
      })),
    [searchResult]
  );

  const center: center = React.useMemo(() => {
    return getCenter(coordinates);
  }, [coordinates]);

  const [viewport, setViewport] = React.useState({
    latitude: 0,
    longitude: 0,
    zoom: 13,
  });

  React.useMemo(() => {
    if (center)
      setViewport({
        latitude: center?.latitude,
        longitude: center?.longitude,
        zoom: 13,
      });
  }, [center]);

  const markers = React.useMemo(
    () =>
      searchResult.map((result: any) => (
        <div key={result._id}>
          <Marker longitude={result.longitude} latitude={result.latitude}>
            <div
              className={styles.price}
              onClick={() => setSelectedLocation(result)}
              onMouseMove={() => sethoveredonMapMarker(result)}
            >
              {currency === "Euro" && (
                <span className={robotoveryBold.className}>
                  €{Math.round(result.minPriceeuro)}
                </span>
              )}
              {currency === "Dollar" && (
                <span className={robotoveryBold.className}>
                  ${Math.round(result.minPricedollar)}
                </span>
              )}
              {currency === "Dinar" && (
                <span className={robotoveryBold.className}>
                  {result.minPricedinar}DT
                </span>
              )}
            </div>
          </Marker>
          {selectedLocation?.longitude == result?.longitude ? (
            <Popup
              longitude={result.longitude}
              latitude={result.latitude}
              maxWidth="400px"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
              }}
              closeButton={false}
              closeOnMove={false}
              closeOnClick={false}
              offset={20}
              onClose={() => setSelectedLocation(null)}
            >
              <div className={styles.showcase}>
                <div className={styles.image}>
                  <div
                    className={styles.close}
                    onClick={() => setSelectedLocation(null)}
                  >
                    <svg height="24" viewBox="0 96 960 960" width="24">
                      <path
                        fill="currentColor"
                        d="m256 856-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                      />
                    </svg>
                  </div>
                  <Image
                    src={result.image}
                    alt={result.name_en}
                    fill
                    sizes="100%"
                    priority
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>
                    <h2 className={robotoBold.className}>{result.name_en}</h2>
                    <div className={styles.stars}>
                      <svg height="20" viewBox="0 96 960 960" width="20">
                        <path
                          fill="currentColor"
                          d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                        />
                      </svg>
                      <span className={robotoBold.className}>
                        {result.stars}
                      </span>
                    </div>
                  </div>
                  <div className={styles.location}>
                    <span className={lora.className}>
                      {result.destination.title_en}
                    </span>
                  </div>

                  <div className={styles.pricedetails}>
                    {currency === "Euro" && (
                      <span className={robotoveryBold.className}>
                        €{Math.round(result.minPriceeuro)}
                      </span>
                    )}
                    {currency === "Dollar" && (
                      <span className={robotoveryBold.className}>
                        ${Math.round(result.minPricedollar)}
                      </span>
                    )}
                    {currency === "Dinar" && (
                      <span className={robotoveryBold.className}>
                        {result.minPricedinar}DT
                      </span>
                    )}
                    <span className={lora.className}>night</span>
                  </div>
                </div>
              </div>
            </Popup>
          ) : null}
        </div>
      )),
    [currency, searchResult, selectedLocation?.longitude]
  );

  const selectedMarker = React.useMemo(
    () =>
      selectedLocation != null ? (
        <Marker
          latitude={selectedLocation.latitude}
          longitude={selectedLocation.longitude}
          style={{ zIndex: 4 }}
        >
          <div
            className={styles.price}
            selected-state="true"
            onClick={() => setSelectedLocation(selectedLocation)}
          >
            {currency === "Euro" && (
              <span className={robotoveryBold.className}>
                €{Math.round(selectedLocation.minPriceeuro)}
              </span>
            )}
            {currency === "Dollar" && (
              <span className={robotoveryBold.className}>
                ${Math.round(selectedLocation.minPricedollar)}
              </span>
            )}
            {currency === "Dinar" && (
              <span className={robotoveryBold.className}>
                {selectedLocation.minPricedinar}DT
              </span>
            )}
          </div>
        </Marker>
      ) : null,
    [currency, selectedLocation]
  );

  const hoveredMarker = React.useMemo(
    () =>
      hovered != null ? (
        <Marker
          latitude={hovered?.latitude}
          longitude={hovered?.longitude}
          style={{ zIndex: 4 }}
        >
          <div
            className={styles.price}
            selected-state="true"
            onClick={() => setSelectedLocation(hovered)}
          >
            {currency === "Euro" && (
              <span className={robotoveryBold.className}>
                €{Math.round(hovered.minPriceeuro)}
              </span>
            )}
            {currency === "Dollar" && (
              <span className={robotoveryBold.className}>
                ${Math.round(hovered.minPricedollar)}
              </span>
            )}
            {currency === "Dinar" && (
              <span className={robotoveryBold.className}>
                {hovered.minPricedinar}DT
              </span>
            )}
          </div>
        </Marker>
      ) : null,
    [currency, hovered]
  );

  const hoveredOnMapMarker = React.useMemo(
    () =>
      hoveredonMapMarker != null ? (
        <Marker
          latitude={hoveredonMapMarker?.latitude}
          longitude={hoveredonMapMarker?.longitude}
          style={{ zIndex: 4 }}
        >
          <div
            className={styles.price}
            onClick={() => setSelectedLocation(hoveredonMapMarker)}
            onMouseLeave={() => sethoveredonMapMarker(null)}
            selected-state={
              hoveredonMapMarker.longitude === selectedLocation?.longitude
                ? "true"
                : ""
            }
          >
            {currency === "Euro" && (
              <span className={robotoveryBold.className}>
                €{Math.round(hoveredonMapMarker.minPriceeuro)}
              </span>
            )}
            {currency === "Dollar" && (
              <span className={robotoveryBold.className}>
                ${Math.round(hoveredonMapMarker.minPricedollar)}
              </span>
            )}
            {currency === "Dinar" && (
              <span className={robotoveryBold.className}>
                {hoveredonMapMarker.minPricedinar}DT
              </span>
            )}
          </div>
        </Marker>
      ) : null,
    [currency, hoveredonMapMarker, selectedLocation?.longitude]
  );

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MB_ACCESS_KEY}
      mapStyle="mapbox://styles/extravirgin/clfk4hh3m001301mhearrq7q0"
      {...viewport}
      onMove={(e) => setViewport(e.viewState)}
      reuseMaps={true}
      attributionControl={false}
    >
      {selectedMarker}
      {hoveredOnMapMarker}
      {hoveredMarker}
      {markers}
      <NavigationControl showCompass={false} />
      <AttributionControl customAttribution="Map design by Mohamed Aziz Issaoui" />
    </Map>
  );
}

export default CustomMap;
