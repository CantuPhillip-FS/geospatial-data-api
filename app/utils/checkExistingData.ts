// This utility function is to take the user's given query params of
// lat & lng and compare them, together, to the data within the databse
// and return the data if there's a match of the "combo" of them both
import Sun from "../models/Sun.js";

export const checkExistingData = async (lat: string, lng: string) => {
  try {
    const existingData = await Sun.find({ latitude: lat, longitude: lng });
    return existingData;
  } catch (error) {
    return error;
  }
};
