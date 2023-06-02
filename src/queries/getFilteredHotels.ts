import axios from "axios";

export const getFilteredHotels = async (
  setData: (arg0: any) => void,
  destination: string | string[] | undefined,
  startDate: string | string[] | undefined,
  endDate: string | string[] | undefined,
  adults: string | string[] | undefined,
  children: string | string[] | undefined,
  stars: number[],
  priceRange: number[],
  amenities: string[],
  setLoading: (arg0: boolean) => void
) => {
  try {
    const res = await axios.get(
      `${
        process.env.NEXT_PUBLIC_SERVER_URL
      }/api/Hotels?page=1&search=${destination}&start_date=${startDate}&end_date=${endDate}&adult=${adults}&child=${children}&&${stars.map(
        (star: number, index: number) => `star[${index}]=${star}`
      )}&min=${priceRange[0]}&max=${priceRange[1]}&${amenities.map(
        (amenity: string, index: number) => `amenities[${index}]=${amenity}`
      )}`
    );
    setData(res.data);
    setLoading(false);
  } catch (error: any) {
    console.log(error);
  }
};
