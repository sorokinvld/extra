import React, { useState, useRef, useEffect } from "react";
import styles from "./Reservebar.module.css";
import { Roboto } from "@next/font/google";
import { Lora } from "@next/font/google";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useRouter } from "next/router";
import { enUS, fr, ar } from "date-fns/locale";
import { RangeSchemaType } from "@/types/dateRangeType";
import add from "date-fns/add";
import parse from "date-fns/parse";
import format from "date-fns/format";

const robotoBold = Roboto({
  subsets: ["latin"],
  weight: "400",
});
const lora = Lora({
  subsets: ["latin"],
  weight: "400",
});

interface Props {
  id: string;
  dates: string;
  checkin: string;
  checkinPlaceholder?: any;
  checkout: string;
  checkoutPlaceholder?: any;
  guests: string;
  adult: string;
  adults: string;
  adultPlaceholder?: any;
  child: string;
  childrenn: string;
  childrenPlaceholder?: any;
  room: string;
  rooms: string;
  roomsPlaceholder?: any;
  guestAdult: string;
  guestChildren: string;
  guestRooms: string;
}

function ReserveBar({
  id,
  dates,
  checkin,
  checkinPlaceholder,
  checkout,
  checkoutPlaceholder,
  guests,
  adult,
  adults,
  adultPlaceholder,
  child,
  childrenn,
  childrenPlaceholder,
  room,
  rooms,
  roomsPlaceholder,
  guestAdult,
  guestChildren,
  guestRooms,
}: Props) {
  const { locale, push, asPath } = useRouter();
  const [adultsNbr, setAdultsNbr] = useState<number>(
    Number(adultPlaceholder) || 1
  );
  const [childrenNbr, setChildrenNbr] = useState<number>(
    Number(childrenPlaceholder) || 0
  );
  const [roomsNbr, setroomsNbr] = useState<number>(
    Number(roomsPlaceholder) || 1
  );
  const [openCalender, setOpenCalender] = useState<boolean>(false);
  const [openGuest, setOpenGuest] = useState<boolean>(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const dateRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);
  const selectionRange = (): RangeSchemaType => {
    if (checkinPlaceholder != null && checkoutPlaceholder != null) {
      const selectedStartData = parse(
        checkinPlaceholder,
        "dd/MM/yyyy",
        new Date()
      );
      const selectedEndData = parse(
        checkoutPlaceholder,
        "dd/MM/yyyy",
        new Date()
      );
      return {
        startDate: startDate || selectedStartData || new Date(),
        endDate: endDate || selectedEndData || add(new Date(), { days: 1 }),
        key: "selection",
      };
    } else {
      return {
        startDate: startDate || new Date(),
        endDate: endDate || add(new Date(), { days: 1 }),
        key: "selection",
      };
    }
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
    document.addEventListener("mousedown", (e) => closeOpenedCal(e));
    document.addEventListener("mousedown", (e) => closeOpenedGuest(e));

    return () => {
      document.addEventListener("mousedown", (e) => closeOpenedCal(e));
      document.addEventListener("mousedown", (e) => closeOpenedGuest(e));
    };
  }, [openCalender, openGuest]);

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
    const searchForm = {
      id: id,
      startDate: startDate,
      endDate: endDate,
      adults: adultsNbr,
      children: childrenNbr,
      rooms: roomsNbr,
    };
    push({
      query: searchForm,
    });
  };

  return (
    <div className={styles.container}>
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
              <span className={lora.className}>
                {checkinPlaceholder || checkin}
              </span>
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
              <span className={lora.className}>
                {checkoutPlaceholder || checkout}
              </span>
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
      >
        <svg name="search icon" height="48" width="48">
          <path
            fill="currentColor"
            d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"
          />
        </svg>
      </button>
      <div
        open-backdrop={openCalender || openGuest ? "open" : ""}
        className={styles.backdrop}
      />
    </div>
  );
}

export default ReserveBar;
