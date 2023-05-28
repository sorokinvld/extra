import React, { useState, useRef, useEffect } from "react";
import styles from "./Searchbar.module.css";
import { Roboto } from "@next/font/google";
import { Lora } from "@next/font/google";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useRouter } from "next/router";
import { enUS, fr, ar } from "date-fns/locale";
import { toast } from "react-toastify";
import { RangeSchemaType } from "@/types/dateRangeType";
import add from "date-fns/add";
import format from "date-fns/format";
import { useDebouceQuery } from "@/utils/debounceQuery";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const robotoBold = Roboto({
  subsets: ["latin"],
  weight: "400",
});
const lora = Lora({
  subsets: ["latin"],
  weight: "400",
});

interface Props {
  location: string;
  locationPlaceholder?: string;
  subLocation: string;
  searchLocation: string;
  dates: string;
  checkin: string;
  checkinPlaceholder?: string;
  checkout: string;
  checkoutPlaceholder?: string;
  guests: string;
  adult: string;
  adults: string;
  adultPlaceholder?: string;
  child: string;
  childrenn: string;
  childrenPlaceholder?: string;
  room: string;
  rooms: string;
  roomsPlaceholder?: string;
  guestAdult: string;
  guestChildren: string;
  guestRooms: string;
  destinationNullError: string;
  destinationinvalid: string;
  destinationinvalidError: string;
}

function Searchbar({
  location,
  subLocation,
  searchLocation,
  dates,
  checkin,
  checkout,
  guests,
  adult,
  adults,
  child,
  childrenn,
  room,
  rooms,
  guestAdult,
  guestChildren,
  guestRooms,
  destinationNullError,
  destinationinvalid,
  destinationinvalidError,
}: Props) {
  const { locale, push } = useRouter();
  const [inputSearch, setInputSearch] = useState<string>("");
  const [adultsNbr, setAdultsNbr] = useState<number>(1);
  const [childrenNbr, setChildrenNbr] = useState<number>(0);
  const [roomsNbr, setroomsNbr] = useState<number>(1);
  const [openSearchInput, setOpenSearchInput] = useState<boolean>(false);
  const [openCalender, setOpenCalender] = useState<boolean>(false);
  const [openGuest, setOpenGuest] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [results, setResults] = useState<any[]>();
  const [ignore, setIgnore] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  let selectionRange = (): RangeSchemaType => {
    return {
      startDate: startDate || new Date(),
      endDate: endDate || add(new Date(), { days: 1 }),
      key: "selection",
    };
  };

  const formatedStartDate = (): string => {
    if (startDate != null) {
      return format(new Date(startDate), "dd/MM/yyyy");
    } else {
      return format(new Date(), "dd/MM/yyyy");
    }
  };
  const formatedEndDate = (): string => {
    if (endDate != null) {
      return format(new Date(endDate), "dd/MM/yyyy");
    } else {
      return format(
        add(new Date(), {
          days: 1,
        }),
        "dd/MM/yyyy"
      );
    }
  };

  useEffect(() => {
    const closeOpenedSearch = (e: any) => {
      if (
        searchRef.current &&
        openSearchInput &&
        !searchRef.current.contains(e.target)
      ) {
        setOpenSearchInput(false);
      }
    };
    const closeOpenedGuest = (e: any) => {
      if (
        guestRef.current &&
        openGuest &&
        !guestRef.current.contains(e.target)
      ) {
        setOpenGuest(false);
      }
    };
    const closeOpenedCal = (e: any) => {
      if (
        dateRef.current &&
        openCalender &&
        !dateRef.current.contains(e.target)
      ) {
        setOpenCalender(false);
      }
    };
    document.addEventListener("mousedown", (e) => closeOpenedSearch(e));
    document.addEventListener("mousedown", (e) => closeOpenedCal(e));
    document.addEventListener("mousedown", (e) => closeOpenedGuest(e));

    return () => {
      document.addEventListener("mousedown", (e) => closeOpenedSearch(e));
      document.addEventListener("mousedown", (e) => closeOpenedCal(e));
      document.addEventListener("mousedown", (e) => closeOpenedGuest(e));
    };
  }, [openCalender, openGuest, openSearchInput]);

  const debounceQuery = useDebouceQuery(inputSearch, 250);

  useEffect(() => {
    setError(false);
    setLoading(true);
    setOpen(true);
    setIgnore(false);
    if (!ignore) {
      if (debounceQuery != "") {
        const options = {
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/autocompletesearch/?Destination=${debounceQuery}`,
        };
        axios
          .request(options)
          .then(function (response) {
            if (response.data.length > 0) {
              setResults(response.data);
              setLoading(false);
            }
            if (response.data.length == 0) {
              setError(true);
              setLoading(false);
            }
          })
          .catch(function (error) {
            console.error(error);
            setLoading(false);
          });
      } else {
        setOpen(false);
        setLoading(false);
      }
    }
    return () => setIgnore(true);
  }, [debounceQuery, ignore]);

  useEffect(() => {
    if (inputSearch == "") {
      setResults([]);
    }
  }, [inputSearch]);

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const handleIncrementAdultCount = () => {
    if (adultsNbr < 30) {
      setAdultsNbr(adultsNbr + 1);
    }
  };
  const handleDecrementAdultCount = () => {
    if (adultsNbr > 1) {
      if (roomsNbr == adultsNbr) setroomsNbr(roomsNbr - 1);
      setAdultsNbr(adultsNbr - 1);
    }
  };
  const handleIncrementchildrenNbrCount = () => {
    if (childrenNbr < 10) {
      setChildrenNbr(childrenNbr + 1);
    }
  };
  const handleDecrementchildrenNbrCount = () => {
    if (childrenNbr > 0) {
      setChildrenNbr(childrenNbr - 1);
    }
  };
  const handleIncrementroomsNbrCount = () => {
    if (roomsNbr < 30) {
      if (roomsNbr == adultsNbr) return;
      setroomsNbr(roomsNbr + 1);
    }
  };
  const handleDecrementroomsNbrCount = () => {
    if (roomsNbr > 1) {
      setroomsNbr(roomsNbr - 1);
    }
  };
  const handleSubmit = () => {
    const startDate = formatedStartDate();
    const endDate = formatedEndDate();
    if (results != null) {
      if (results.length > 0) {
        const searchForm = {
          destination: results[0].city_en,
          startDate: startDate,
          endDate: endDate,
          adults: adultsNbr,
          children: childrenNbr,
          rooms: roomsNbr,
        };

        push({
          pathname: "hotels",
          query: searchForm,
        });
      } else if (error) {
        toast.error(destinationinvalidError);
        setOpenSearchInput(true);
        inputRef.current!.focus();
      } else {
        toast.error(destinationNullError);
        setOpenSearchInput(true);
        inputRef.current!.focus();
      }
    } else {
      toast.error(destinationNullError);
      setOpenSearchInput(true);
      inputRef.current!.focus();
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.item}
        onClick={() => {
          setOpenSearchInput(true);
          inputRef.current!.focus();
        }}
        ref={searchRef}
      >
        <svg
          height="32"
          viewBox="0 96 960 960"
          width="32"
          className={styles.icon}
        >
          <path
            fill="currentColor"
            d="M480 550q23 0 38.5-15.5T534 496q0-23-15.5-38.5T480 442q-23 0-38.5 15.5T426 496q0 23 15.5 38.5T480 550Zm0 367q126-108 196-222.5T746 504q0-121-77-197.5T480 230q-112 0-189 76.5T214 504q0 76 70 190.5T480 917Zm0 39Q331 822 258.5 707.5T186 504q0-138 89-220t205-82q116 0 205 82t89 220q0 89-72.5 203.5T480 956Zm0-452Z"
          />
        </svg>
        <div className={styles.title}>
          <div className={styles.text}>
            <span className={robotoBold.className}>{location}</span>
          </div>
          <div className={styles.items}>
            <span className={lora.className}>{inputSearch || subLocation}</span>
          </div>
        </div>
        <div
          className={styles.searchinput}
          open-state={openSearchInput ? "open" : ""}
        >
          <div className={styles.search}>
            <svg
              height="40"
              viewBox="0 96 960 960"
              width="40"
              onClick={() => inputRef.current!.focus()}
            >
              <path
                fill="currentColor"
                d="M783.282 902 529.077 647.795q-29.798 26.398-69.174 40.456-39.376 14.057-79.185 14.057-95.757 0-162.084-66.196-66.327-66.195-66.327-161.525 0-95.331 66.196-161.651 66.195-66.321 161.486-66.321 95.29 0 161.907 66.232t66.617 161.529q0 41.368-14.769 80.778-14.77 39.41-40.411 68.384l254.36 253.539L783.282 902ZM380.564 668.462q81.645 0 137.874-56.09t56.229-137.911q0-81.82-56.229-137.91t-137.874-56.09q-81.773 0-138.092 56.09-56.318 56.09-56.318 137.91 0 81.821 56.318 137.911 56.319 56.09 138.092 56.09Z"
              />
            </svg>
            <input
              ref={inputRef}
              value={inputSearch}
              placeholder={searchLocation}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <svg
              height="35"
              viewBox="0 96 960 960"
              width="40"
              className={styles.backspace}
              onClick={() => setInputSearch("")}
            >
              <path
                fill="currentColor"
                d="m439.897 706.359 106.257-106.256L652.41 706.359l24.77-24.256L570.257 576l106.102-106.103-24.256-24.256-105.949 106.256-106.257-106.256-24.256 24.256L522.051 576l-106.41 106.103 24.256 24.256ZM164.615 576l141.949-200.821q12.846-18.359 31.902-28.769Q357.523 336 380.034 336h356.889q23.911 0 41.186 17.275 17.276 17.276 17.276 41.186v363.078q0 23.91-17.276 41.186Q760.834 816 736.923 816H380q-22.616 0-41.218-11.179-18.603-11.18-32.218-29.539L164.615 576Zm41.641 0L338.38 762.154q6.153 8.462 16.538 14.231 10.384 5.769 21.923 5.769h360.082q9.231 0 16.923-7.692 7.693-7.692 7.693-16.923V394.461q0-9.231-7.693-16.923-7.692-7.692-16.923-7.692H376.769q-11.538 0-21.923 5.769-10.385 5.769-16.538 14.231L206.256 576Zm555.283 0V369.846v412.308V576Z"
              />
            </svg>
          </div>
          <div className={styles.searchresult} open-state={open ? "open" : ""}>
            {loading ? (
              <div className={styles.loading}>
                <CircularProgress sx={{ color: "grey" }} />
              </div>
            ) : (
              <>
                {error ? (
                  <div className={styles.loading}>
                    <span className={robotoBold.className}>
                      {destinationinvalid}
                    </span>
                  </div>
                ) : (
                  <>
                    {results != null && (
                      <>
                        {results.map((result: any) => (
                          <div key={result._id}>
                            {locale == "en" && (
                              <div
                                className={styles.result}
                                onClick={() =>
                                  setInputSearch(
                                    result.city_en + ", " + result.country_en
                                  )
                                }
                              >
                                <svg
                                  height="32"
                                  viewBox="0 96 960 960"
                                  width="32"
                                  className={styles.icon}
                                >
                                  <path
                                    fill="currentColor"
                                    d="M480 550q23 0 38.5-15.5T534 496q0-23-15.5-38.5T480 442q-23 0-38.5 15.5T426 496q0 23 15.5 38.5T480 550Zm0 367q126-108 196-222.5T746 504q0-121-77-197.5T480 230q-112 0-189 76.5T214 504q0 76 70 190.5T480 917Zm0 39Q331 822 258.5 707.5T186 504q0-138 89-220t205-82q116 0 205 82t89 220q0 89-72.5 203.5T480 956Zm0-452Z"
                                  />
                                </svg>
                                <span className={robotoBold.className}>
                                  {result.city_en}, {result.country_en}
                                </span>
                              </div>
                            )}
                            {locale == "fr" && (
                              <div
                                className={styles.result}
                                onClick={() =>
                                  setInputSearch(
                                    result.city_fr + ", " + result.country_fr
                                  )
                                }
                              >
                                <svg
                                  height="32"
                                  viewBox="0 96 960 960"
                                  width="32"
                                  className={styles.icon}
                                >
                                  <path
                                    fill="currentColor"
                                    d="M480 550q23 0 38.5-15.5T534 496q0-23-15.5-38.5T480 442q-23 0-38.5 15.5T426 496q0 23 15.5 38.5T480 550Zm0 367q126-108 196-222.5T746 504q0-121-77-197.5T480 230q-112 0-189 76.5T214 504q0 76 70 190.5T480 917Zm0 39Q331 822 258.5 707.5T186 504q0-138 89-220t205-82q116 0 205 82t89 220q0 89-72.5 203.5T480 956Zm0-452Z"
                                  />
                                </svg>
                                <span className={robotoBold.className}>
                                  {result.city_fr}, {result.country_fr}
                                </span>
                              </div>
                            )}
                            {locale == "ar" && (
                              <div
                                className={styles.result}
                                onClick={() =>
                                  setInputSearch(
                                    result.city_ar + ", " + result.country_ar
                                  )
                                }
                              >
                                <svg
                                  height="32"
                                  viewBox="0 96 960 960"
                                  width="32"
                                  className={styles.icon}
                                >
                                  <path
                                    fill="currentColor"
                                    d="M480 550q23 0 38.5-15.5T534 496q0-23-15.5-38.5T480 442q-23 0-38.5 15.5T426 496q0 23 15.5 38.5T480 550Zm0 367q126-108 196-222.5T746 504q0-121-77-197.5T480 230q-112 0-189 76.5T214 504q0 76 70 190.5T480 917Zm0 39Q331 822 258.5 707.5T186 504q0-138 89-220t205-82q116 0 205 82t89 220q0 89-72.5 203.5T480 956Zm0-452Z"
                                  />
                                </svg>
                                <span className={robotoBold.className}>
                                  {result.city_ar}, {result.country_ar}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={styles.item}
        onClick={() => {
          setOpenCalender(true);
        }}
        ref={dateRef}
      >
        <svg
          height="32"
          viewBox="0 96 960 960"
          width="32"
          className={styles.icon}
        >
          <path
            fill="currentColor"
            d="M218.461 936q-24.577 0-41.519-16.942Q160 902.116 160 877.539V348.307q0-24.577 16.942-41.519 16.942-16.942 41.519-16.942h78.718v-83.077h38.205v83.077h292.309v-83.077h35.641v83.077h78.205q24.577 0 41.519 16.942Q800 323.73 800 348.307v529.232q0 24.577-16.942 41.519Q766.116 936 741.539 936H218.461Zm0-33.846h523.078q9.231 0 16.923-7.692 7.692-7.692 7.692-16.923V517.538H193.846v360.001q0 9.231 7.692 16.923 7.692 7.692 16.923 7.692Zm-24.615-418.462h572.308V348.307q0-9.231-7.692-16.923-7.692-7.692-16.923-7.692H218.461q-9.231 0-16.923 7.692-7.692 7.692-7.692 16.923v135.385Zm0 0v-160 160ZM480 662.154q-12.385 0-21.577-9.193-9.192-9.192-9.192-21.576 0-12.385 9.192-21.577 9.192-9.193 21.577-9.193 12.385 0 21.577 9.193 9.192 9.192 9.192 21.577 0 12.384-9.192 21.576-9.192 9.193-21.577 9.193Zm-160 0q-12.385 0-21.577-9.193-9.192-9.192-9.192-21.576 0-12.385 9.192-21.577 9.192-9.193 21.577-9.193 12.385 0 21.577 9.193 9.192 9.192 9.192 21.577 0 12.384-9.192 21.576-9.192 9.193-21.577 9.193Zm320 0q-12.385 0-21.577-9.193-9.192-9.192-9.192-21.576 0-12.385 9.192-21.577 9.192-9.193 21.577-9.193 12.385 0 21.577 9.193 9.192 9.192 9.192 21.577 0 12.384-9.192 21.576-9.192 9.193-21.577 9.193ZM480 816q-12.385 0-21.577-9.192-9.192-9.193-9.192-21.577 0-12.385 9.192-21.577 9.192-9.193 21.577-9.193 12.385 0 21.577 9.193 9.192 9.192 9.192 21.577 0 12.384-9.192 21.577Q492.385 816 480 816Zm-160 0q-12.385 0-21.577-9.192-9.192-9.193-9.192-21.577 0-12.385 9.192-21.577 9.192-9.193 21.577-9.193 12.385 0 21.577 9.193 9.192 9.192 9.192 21.577 0 12.384-9.192 21.577Q332.385 816 320 816Zm320 0q-12.385 0-21.577-9.192-9.192-9.193-9.192-21.577 0-12.385 9.192-21.577 9.192-9.193 21.577-9.193 12.385 0 21.577 9.193 9.192 9.192 9.192 21.577 0 12.384-9.192 21.577Q652.385 816 640 816Z"
          />
        </svg>
        <div className={styles.title}>
          <div className={styles.text}>
            <span className={robotoBold.className}>{dates}</span>
          </div>
          <div className={styles.items}>
            {startDate ? (
              <span className={lora.className}>
                {Intl.DateTimeFormat("eu", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(startDate)}
              </span>
            ) : (
              <span className={lora.className}>{checkin}</span>
            )}{" "}
            <span className={lora.className}>-</span>{" "}
            {endDate ? (
              <span className={lora.className}>
                {Intl.DateTimeFormat("eu", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(endDate)}
              </span>
            ) : (
              <span className={lora.className}>{checkout}</span>
            )}
          </div>
        </div>
        <div
          open-state={openCalender ? "open" : ""}
          className={styles.datepicker}
        >
          {locale == "en" && (
            <DateRange
              className={styles.dateRange}
              ranges={[selectionRange()]}
              minDate={new Date()}
              rangeColors={["#243c50"]}
              onChange={(ranges) => handleSelect(ranges)}
              locale={enUS}
            />
          )}
          {locale == "fr" && (
            <DateRange
              className={styles.dateRange}
              ranges={[selectionRange()]}
              minDate={new Date()}
              rangeColors={["#243c50"]}
              onChange={(ranges) => handleSelect(ranges)}
              locale={fr}
            />
          )}
          {locale == "ar" && (
            <DateRange
              className={styles.dateRange}
              ranges={[selectionRange()]}
              minDate={new Date()}
              rangeColors={["#243c50"]}
              onChange={(ranges) => handleSelect(ranges)}
              locale={ar}
            />
          )}
        </div>
      </div>
      <div
        className={styles.item}
        onClick={() => {
          setOpenGuest(true);
        }}
        ref={guestRef}
      >
        <svg
          height="32"
          viewBox="0 96 960 960"
          width="32"
          className={styles.icon}
        >
          <path
            fill="currentColor"
            d="M123 824v-52q0-26 13.5-43.5t36.445-28.587Q222 677 269.5 662.5 317 648 391 648t121.5 14.5q47.5 14.5 96.555 37.413Q632 711 645.5 728.5T659 772v52H123Zm616 0v-52q0-32-10.947-59.982T697 664q23 6 45 15.5t45 20.5q23 11 36.5 30.16Q837 749.321 837 772v52h-98ZM391 544q-44.55 0-76.275-31.725Q283 480.55 283 436q0-44.55 31.725-76.275Q346.45 328 391 328q44.55 0 76.275 31.725Q499 391.45 499 436q0 44.55-31.725 76.275Q435.55 544 391 544Zm258-108q0 44.55-31.725 76.275Q585.55 544 541 544q18.321-22.763 28.161-50.505Q579 465.753 579 435.876 579 406 568.5 379 558 352 541 328q44.55 0 76.275 31.725Q649 391.45 649 436ZM151 796h480v-24q0-15-7.5-26T595 724q-42-23-90-35.5T391 676q-66 0-114 12.5T187 724q-21 11-28.5 22t-7.5 26v24Zm240-280q33 0 56.5-23.5T471 436q0-33-23.5-56.5T391 356q-33 0-56.5 23.5T311 436q0 33 23.5 56.5T391 516Zm0 280Zm0-360Z"
          />
        </svg>
        <div className={styles.title}>
          <div className={styles.text}>
            <span className={robotoBold.className}>{guests}</span>
          </div>
          <div className={styles.items}>
            {adultsNbr > 1 ? (
              <>
                {locale == "ar" ? (
                  <span className={lora.className}>
                    {adults} {adultsNbr}
                  </span>
                ) : (
                  <span className={lora.className}>
                    {adultsNbr} {adults}
                  </span>
                )}
              </>
            ) : (
              <>
                {locale == "ar" ? (
                  <span className={lora.className}>{adult} 1</span>
                ) : (
                  <span className={lora.className}>1 {adult}</span>
                )}
              </>
            )}{" "}
            <span className={lora.className}>-</span>{" "}
            {childrenNbr > 0 && (
              <>
                {childrenNbr == 1 ? (
                  <>
                    {locale == "ar" ? (
                      <span className={lora.className}>
                        {child} {childrenNbr}
                      </span>
                    ) : (
                      <span className={lora.className}>
                        {childrenNbr} {child}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    {locale == "ar" ? (
                      <span className={lora.className}>
                        {childrenn} {childrenNbr}
                      </span>
                    ) : (
                      <span className={lora.className}>
                        {childrenNbr} {childrenn}
                      </span>
                    )}
                  </>
                )}{" "}
                <span className={lora.className}>-</span>{" "}
              </>
            )}
            {roomsNbr > 1 ? (
              <>
                {locale == "ar" ? (
                  <span className={lora.className}>
                    {rooms} {roomsNbr}
                  </span>
                ) : (
                  <span className={lora.className}>
                    {roomsNbr} {rooms}
                  </span>
                )}
              </>
            ) : (
              <>
                {locale == "ar" ? (
                  <span className={lora.className}>{room} 1</span>
                ) : (
                  <span className={lora.className}>1 {room}</span>
                )}
              </>
            )}
          </div>
        </div>
        <div
          open-state={openGuest ? "open" : ""}
          className={styles.guestpicker}
        >
          <div className={styles.guestitem}>
            <span className={robotoBold.className}>{guestAdult}</span>
            <div className={styles.guestitembtn}>
              {adultsNbr == 1 ? (
                <button
                  aria-label="decrement adults count button"
                  disabled
                  onClick={handleDecrementAdultCount}
                >
                  <span className={robotoBold.className}>-</span>
                </button>
              ) : (
                <button
                  aria-label="decrement adults count button"
                  onClick={handleDecrementAdultCount}
                >
                  <span className={robotoBold.className}>-</span>
                </button>
              )}
              <span className={robotoBold.className}>{adultsNbr}</span>
              {adultsNbr == 30 ? (
                <button
                  aria-label="increment adults count button"
                  disabled
                  onClick={handleIncrementAdultCount}
                >
                  <span className={robotoBold.className}>+</span>
                </button>
              ) : (
                <button
                  aria-label="increment adults count button"
                  onClick={handleIncrementAdultCount}
                >
                  <span className={robotoBold.className}>+</span>
                </button>
              )}
            </div>
          </div>
          <div className={styles.guestitem}>
            <span className={robotoBold.className}>{guestChildren}</span>
            <div className={styles.guestitembtn}>
              {childrenNbr == 0 ? (
                <button
                  aria-label="decrement children count button"
                  disabled
                  onClick={handleDecrementchildrenNbrCount}
                >
                  <span className={robotoBold.className}>-</span>
                </button>
              ) : (
                <button
                  aria-label="decrement children count button"
                  onClick={handleDecrementchildrenNbrCount}
                >
                  <span className={robotoBold.className}>-</span>
                </button>
              )}
              <span className={robotoBold.className}>{childrenNbr}</span>
              {childrenNbr == 10 ? (
                <button
                  aria-label="increment children count button"
                  disabled
                  onClick={handleIncrementchildrenNbrCount}
                >
                  <span className={robotoBold.className}>+</span>
                </button>
              ) : (
                <button
                  aria-label="increment children count button"
                  onClick={handleIncrementchildrenNbrCount}
                >
                  <span className={robotoBold.className}>+</span>
                </button>
              )}
            </div>
          </div>
          <div className={styles.guestitem}>
            <span className={robotoBold.className}>{guestRooms}</span>
            <div className={styles.guestitembtn}>
              {roomsNbr == 1 ? (
                <button
                  aria-label="decrement rooms count button"
                  disabled
                  onClick={handleDecrementroomsNbrCount}
                >
                  <span className={robotoBold.className}>-</span>
                </button>
              ) : (
                <button
                  aria-label="decrement rooms count button"
                  onClick={handleDecrementroomsNbrCount}
                >
                  <span className={robotoBold.className}>-</span>
                </button>
              )}
              <span className={robotoBold.className}>{roomsNbr}</span>
              {roomsNbr == adultsNbr ? (
                <button
                  aria-label="increment rooms count button"
                  disabled
                  onClick={handleIncrementroomsNbrCount}
                >
                  <span className={robotoBold.className}>+</span>
                </button>
              ) : (
                <button
                  aria-label="increment rooms count button"
                  onClick={handleIncrementroomsNbrCount}
                >
                  <span className={robotoBold.className}>+</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        className={styles.button}
        onClick={handleSubmit}
        aria-label="search"
        data-e2e="searchbar-button"
      >
        <svg name="search icon" height="48" width="48">
          <path
            fill="currentColor"
            d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"
          />
        </svg>
      </button>
      <div
        open-backdrop={
          openSearchInput || openCalender || openGuest ? "open" : ""
        }
        className={styles.backdrop}
      />
    </div>
  );
}

export default Searchbar;
