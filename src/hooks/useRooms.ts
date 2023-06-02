import { getRooms } from "@/queries/getRooms";
import { useEffect, useState } from "react";

export const useRooms = (
  startDate: string | string[] | undefined,
  endDate: string | string[] | undefined,
  adults: string | string[] | undefined,
  children: string | string[] | undefined,
  hotelId: string
) => {
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<any>();
  const [error, setError] = useState("");
  useEffect(() => {
    if (startDate && endDate && adults && children && hotelId) setLoading(true);
    getRooms(
      setRooms,
      startDate,
      endDate,
      adults,
      children,
      hotelId,
      setLoading,
      setError
    );
  }, [adults, children, endDate, hotelId, startDate]);

  return { rooms, loading, error };
};
