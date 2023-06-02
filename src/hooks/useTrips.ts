import { useEffect, useState } from "react";
import { getTrips } from "@/queries/getTrips";

export const useTrips = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [error, setError] = useState("");
  useEffect(() => {
    setLoading(true);
    getTrips(setData, setLoading, setError);
  }, []);

  return { data, loading, error };
};
