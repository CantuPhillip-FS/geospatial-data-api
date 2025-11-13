import type { Request, Response } from "express";
import { fetchData } from "../api/sunrise-sunset-api.js";
import Sun from "../models/Sun.js";
import { checkExistingData } from "../utils/checkExistingData.js";
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
    // grab user's query
    const query = req.query;

    // extract lat and lng
    const lat = query.lat as string;
    const lng = query.lng as string;

    // ensure lat and lng are present else throw error
    if (lat === undefined || lng === undefined) {
      throw new Error(
        "Please include a query within your request. E.g., '/api/v1/geo-data?lat=14.56&lng=-90.73'"
      );

      // const data = await Sun.find();
      // console.log("GET all EXISTING data.");
      // res.status(200).json({
      //   message: `${req.method} - Reqeust made`,
      //   status: "successful",,
      //   data,
      // });
    }

    // Before fetching I need to check for existing LNG/LAT combo
    // Run the checkExistingData util function
    const existingData: any = await checkExistingData(lat, lng);
    if (existingData.length > 0) {
      res.status(200).json({
        message: `${req.method} - Request made`,
        status: "successful",
        existingData: existingData,
      });
      console.log("Data already exists. No FETCH performed");
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

    res.status(200).json({
      message: `${req.method} - Request made`,
      request: "successful",
      fetch: "successful",
      data: Data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                              POST: Add Sun doc                             */
/* -------------------------------------------------------------------------- */
export const createSun = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(500).json({
        message: `${req.method} - Request made`,
        status: "failed",
        reason: "No data was received",
      });
    }
    const request = await req.body;
    console.log("req", request);
    const lat = (await request.latitude) as string;
    console.log("lat", lat);
    const lng = (await request.longitude) as string;
    console.log("lng", lng);
    const existingData: any = await checkExistingData(lat, lng);
    if (existingData.length > 0) {
      // existingData itself will always return, it's never undefined nor null
      // after extensive testing it always returns as an array, just empty if no data
      // therefore it always has a .length property that I can utilize
      res.status(500).json({
        message: `${req.method} - Request made`,
        status: "failed",
        reason: `DUPLICATE: Data with latitude: ${lat} and longitude ${lng} exists. Please send a GET request or a different POST request.`,
        data: existingData,
      });
      console.log("Data already exists. No POST performed");
      return;
    }

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
      status: "successful",
      data: newSun,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};
