import axios from "axios";
export const subscribeToReservationAPI = async (query: any) => {
  if (query.reservationType == "Product") {
    const details = {
      item_id: query.item_id as string,
      user_id: query.user_id as string,
      amount: query.amount as number,
      currency: query.currency as string,
      start_date: query.start_date as string,
      end_date: query.end_date as string,
    };
    axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/createProductReservation`,
      details
    );
  } else {
    const details = {
      item_id: query.item_id as string,
      user_id: query.user_id as string,
      amount: query.amount as number,
      currency: query.currency as string,
      start_date: query.start_date as string,
      end_date: query.end_date as string,
    };
    axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/createRoomReservation`,
      details
    );
  }
};
