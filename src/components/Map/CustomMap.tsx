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
import image from "public/images/greece.jpg";
import Aos from "aos";

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

function CustomMap({ searchResult, hovered }: any) {
  const [selectedLocation, setSelectedLocation] = React.useState<any>();
  const [hoveredonMapMarker, sethoveredonMapMarker] = React.useState<any>();
  const { currency } = useCurrency();

  React.useEffect(() => {
    Aos.init();
  }, []);
  const coordinates = React.useMemo(
    () =>
      searchResult.map((result: any) => ({
        longitude: result.long,
        latitude: result.lat,
      })),
    [searchResult]
  );

  const center: any = React.useMemo(
    () => getCenter(coordinates),
    [coordinates]
  );

  const [viewport, setViewport] = React.useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 13,
  });

  React.useMemo(() => {
    setViewport({
      latitude: center.latitude,
      longitude: center.longitude,
      zoom: 13,
    });
  }, [center]);

  const markers = React.useMemo(
    () =>
      searchResult.map((result: any) => (
        <div key={result.name}>
          <Marker longitude={result.long} latitude={result.lat}>
            <div
              className={styles.price}
              onClick={() => setSelectedLocation(result)}
              onMouseMove={() => sethoveredonMapMarker(result)}
            >
              {currency === "Euro" && (
                <span className={robotoveryBold.className}>
                  €{result.priceineuro}
                </span>
              )}
              {currency === "Dollar" && (
                <span className={robotoveryBold.className}>
                  ${result.priceindollar}
                </span>
              )}
              {currency === "Dinar" && (
                <span className={robotoveryBold.className}>
                  {result.priceindinar}DT
                </span>
              )}
            </div>
          </Marker>
          {selectedLocation?.long == result.long ? (
            <Popup
              longitude={result.long}
              latitude={result.lat}
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
                    src={image.src}
                    alt={result.name}
                    fill
                    sizes="100%"
                    priority
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>
                    <h2 className={robotoBold.className}>{result.name}</h2>
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
                    <span className={lora.className}>{result.location}</span>
                  </div>

                  <div className={styles.pricedetails}>
                    {currency === "Euro" && (
                      <span className={robotoveryBold.className}>
                        €{result.priceineuro}
                      </span>
                    )}
                    {currency === "Dollar" && (
                      <span className={robotoveryBold.className}>
                        ${result.priceindollar}
                      </span>
                    )}
                    {currency === "Dinar" && (
                      <span className={robotoveryBold.className}>
                        {result.priceindinar}DT
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
    [currency, searchResult, selectedLocation?.long]
  );

  const selectedMarker = React.useMemo(
    () =>
      selectedLocation != null ? (
        <Marker
          latitude={selectedLocation?.lat}
          longitude={selectedLocation?.long}
          style={{ zIndex: 4 }}
        >
          <div
            className={styles.price}
            selected-state="true"
            onClick={() => setSelectedLocation(selectedLocation)}
          >
            {currency === "Euro" && (
              <span className={robotoveryBold.className}>
                €{selectedLocation.priceineuro}
              </span>
            )}
            {currency === "Dollar" && (
              <span className={robotoveryBold.className}>
                ${selectedLocation.priceindollar}
              </span>
            )}
            {currency === "Dinar" && (
              <span className={robotoveryBold.className}>
                {selectedLocation.priceindinar}DT
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
          latitude={hovered?.lat}
          longitude={hovered?.long}
          style={{ zIndex: 4 }}
        >
          <div
            className={styles.price}
            selected-state="true"
            onClick={() => setSelectedLocation(hovered)}
          >
            {currency === "Euro" && (
              <span className={robotoveryBold.className}>
                €{hovered.priceineuro}
              </span>
            )}
            {currency === "Dollar" && (
              <span className={robotoveryBold.className}>
                ${hovered.priceindollar}
              </span>
            )}
            {currency === "Dinar" && (
              <span className={robotoveryBold.className}>
                {hovered.priceindinar}DT
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
          latitude={hoveredonMapMarker?.lat}
          longitude={hoveredonMapMarker?.long}
          style={{ zIndex: 4 }}
        >
          <div
            className={styles.price}
            onClick={() => setSelectedLocation(hoveredonMapMarker)}
            onMouseLeave={() => sethoveredonMapMarker(null)}
            selected-state={
              hoveredonMapMarker.long === selectedLocation?.long ? "true" : ""
            }
          >
            {currency === "Euro" && (
              <span className={robotoveryBold.className}>
                €{hoveredonMapMarker.priceineuro}
              </span>
            )}
            {currency === "Dollar" && (
              <span className={robotoveryBold.className}>
                ${hoveredonMapMarker.priceindollar}
              </span>
            )}
            {currency === "Dinar" && (
              <span className={robotoveryBold.className}>
                {hoveredonMapMarker.priceindinar}DT
              </span>
            )}
          </div>
        </Marker>
      ) : null,
    [currency, hoveredonMapMarker, selectedLocation?.long]
  );

  return (
    <div
      className={styles.container}
      data-aos="fade-in"
      data-aos-duration="400"
      data-aos-delay="400"
    >
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
    </div>
  );
}

export default CustomMap;
