import type { Request, Response } from "express";
import { fetchData } from "../api/sunrise-sunset-api.js";
import Sun from "../models/Sun.js";
import { checkForExistingData } from "../utils/checkDuplicates.js";
import { createUrl } from "../utils/createUrl.js";

type Data = {
  sunrise: String;
  sunset: String;
  latitude: String;
  longitude: String;
  sunriseSunsetURL: String;
};

/* -------------------------------------------------------------------------- */
/*                              GET: All Sun docs                             */
/* -------------------------------------------------------------------------- */
export const getAllSuns = async (req: Request, res: Response) => {
  try {
    const suns = await Sun.find({ latitude: "139.75" });
    res.status(200).json({
      message: `${req.method} - Request made`,
      success: true,
      sunRiseAndSetInfo: suns,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                              POST: Add Sun doc                             */
/* -------------------------------------------------------------------------- */
export const createSun = async (req: Request, res: Response) => {
  try {
    // grab user's query
    const query = req.query;

    // extract lat and lng
    const lat = query.lat as string;
    const lng = query.lng as string;

    // ensure lat and lng are present else throw error
    if (lat === undefined || lng === undefined) {
      throw new Error(
        "Please include a query within your request. E.g., '/api/vi?lat=14.56&lng=-90.73'"
      );
    }

    // Before fetching I need to check for existing LNG/LAT combo
    // Run the checkForExistingData util function
    const existingData = await checkForExistingData(lat, lng);
    if (existingData) {
      res.status(500).json({
        message: `${req.method} - Request made`,
        success: false,
        reason: `DUPLICATE: Data with latitude: ${lat} and longitude ${lng} exists. Please send a GET request or a different POST request.`,
        existingData,
      });
      console.log("Data already exists. No POST performed");
      return;
    }
    // THIS WHOLE CHECKING FOR DUPLICATE WAS THE HARDEST THING IN THIS ENTIRE APP 😭
    // BUT I FIGURED IT OUT 💪

    // fetch data from sunset-sunrise api else throw error
    const data = await fetchData(lat, lng);
    if (data === undefined || data === null) {
      throw new Error(
        "Error fetching data. Check correct lat & lng were given, e.g., '?lat=14.56&lng=-90.73'"
      );
    }

    // create sunrise-sunset url
    const url = await createUrl(lat, lng);

    // create obj to be used to create mongodb doc
    const Data: Data = {
      sunrise: data.results.sunrise,
      sunset: data.results.sunset,
      latitude: lat,
      longitude: lng,
      sunriseSunsetURL: url,
    };

    // create doc
    const newSun = await Sun.create(Data);
    res.status(201).json({
      message: `${req.method} - Request made`,
      success: true,
      data: newSun,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
