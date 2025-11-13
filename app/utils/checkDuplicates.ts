// This utility function is to take the user's given query params of
// lat & lng and compare them, together, to the data within the databse
// and return true or false if there's a match of the "combo" of them both
import Sun from "../models/Sun.js";

export const checkForExistingData = async (lat: string, lng: string) => {
  try {
    const existingData = await Sun.find({ latitude: lat, longitude: lng });
    // existingData itself will always return, it's never undefined nor null
    // after extensive testing it always returns as an array, just empty if no data
    // therefore it always has a .length property that I can utilize
    return existingData.length > 0 ? true : false;
  } catch (error) {
    return false;
  }
};
