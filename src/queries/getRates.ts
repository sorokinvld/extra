import axios from "axios";

export const getRates = async () => {
  try {
    const rates = await axios(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getRatecurrency`
    );
    const rateToEuro = rates.data[0].rate_Dinartoeuro;
    const rateToDollar = rates.data[0].rate_DinartoDollar;
    localStorage.setItem("rateToEuro", rateToEuro);
    localStorage.setItem("rateToDollar", rateToDollar);
  } catch (error) {
    console.log(error);
  }
};
