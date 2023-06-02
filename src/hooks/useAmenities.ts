import { useEffect, useState } from "react";
import { getAmenities } from "@/queries/getAmenities";

export const useAmenities = () => {
  const [loading, setLoading] = useState(true);
  const [amenities, setAmenities] = useState<any>();
  const [error, setError] = useState("");
  useEffect(() => {
    setLoading(true);
    getAmenities(setAmenities, setLoading, setError);
  }, []);

  return { amenities, loading, error };
};
