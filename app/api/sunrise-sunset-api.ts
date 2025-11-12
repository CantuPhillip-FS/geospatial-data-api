import "dotenv/config";

const BASE_URL: string | undefined = process.env.SUNSET_RISE_URL;
// BASE_URL = https://api.sunrise-sunset.org/json?
export const fetchData = async (lat: string | number, lng: string | number) => {
  try {
    // Example URL: https://api.sunrise-sunset.org/json?lat=14.56&lng=-90.73
    const response = await fetch(`${BASE_URL}lat=${lat}&lng=${lng}`);
    const data = await response.json();
    console.log(data);
  } catch (error: any) {
    return error.message;
  }
};
