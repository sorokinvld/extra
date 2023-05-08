import { useEffect, useState } from "react";

export function useDebouceQuery(query: string, time: number) {
  const [debounceQuery, setDebounceQuery] = useState(query);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, time);
    return () => clearTimeout(timeout);
  }, [query, time]);

  return debounceQuery;
}
