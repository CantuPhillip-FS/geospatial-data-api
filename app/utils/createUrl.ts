// This utility function is to take the user's given query params of
// lat & lng and craft a URL from the API source of sunrise-sunset.org

import "dotenv/config";
const BASE_URL: string | undefined = process.env.SUNSET_RISE_URL;
// BASE_URL = https://api.sunrise-sunset.org/json?

export const createUrl = (lat: string | number, lng: string | number) => {
  const url = `${BASE_URL}lat=${lat}&lng=${lng}`;
  return url;
};

// Example URL: https://api.sunrise-sunset.org/json?lat=14.56&lng=-90.73
