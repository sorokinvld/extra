import { useEffect, useState } from "react";
import { getTours } from "@/queries/getTours";

export const useTours = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [error, setError] = useState("");
  useEffect(() => {
    setLoading(true);
    getTours(setData, setLoading, setError);
  }, []);

  return { data, loading, error };
};
