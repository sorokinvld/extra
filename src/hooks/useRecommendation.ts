import { useEffect, useState } from "react";
import { recommendHotels } from "@/queries/recommendHotels";
import { useUser } from "@/utils/userProvider";

export const useRecommendation = () => {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendations] = useState<Object[]>();
  const [error, setError] = useState("");
  const { user } = useUser();
  useEffect(() => {
    setLoading(true);
    if (user != undefined) {
      recommendHotels(user._id, setRecommendations, setLoading, setError);
    } else {
      setLoading(false);
    }
  }, [user]);

  return { recommendation, loading, error };
};
