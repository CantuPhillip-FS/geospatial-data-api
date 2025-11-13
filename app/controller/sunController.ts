import type { Request, Response } from "express";
import mongoose from "mongoose";
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
/*                                GET: All Data                               */
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
      const data = await Sun.find().select("-createdAt -updatedAt -__v").exec();
      console.log("GET all EXISTING data.");
      return res.status(200).json({
        message: `${req.method} - Reqeust made`,
        status: "successful",
        data,
      });
    }

    if (lat === "" || lng == "") {
      throw new Error(
        "Please include a full query within your request. E.g., '/api/v1/geo-data?lat=14.56&lng=-90.73'"
      );
    }

    // Before fetching I need to check for existing LNG/LAT combo
    // Run the checkExistingData util function
    const existingData: any = await checkExistingData(lat, lng);
    if (existingData.length > 0) {
      console.log("Data already exists. No FETCH performed");
      return res.status(200).json({
        message: `${req.method} - Request made`,
        status: "successful",
        existingData: existingData,
      });
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
    console.log("New API call was sent");
    return res.status(200).json({
      message: `${req.method} - Request made`,
      request: "successful",
      fetch: "successful",
      data: Data,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                               GET: Data by id                              */
/* -------------------------------------------------------------------------- */
export const getDataById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Validate the ObjectId format BEFORE querying
    if (!mongoose.Types.ObjectId.isValid(id!)) {
      return res.status(400).json({
        message: `Invalid MongoDB ObjectId: ${id}`,
        status: "failed",
      });
    }
    const foundData = await Sun.findById(id)
      .select("-createdAt -updatedAt -__v")
      .exec();
    if (!foundData) {
      return res.status(404).json({
        message: `No data found with id: ${id}`,
        status: "failed",
      });
    }
    return res.status(200).json({
      message: `${req.method} - request to Studio endpoint`,
      status: "successful",
      data: foundData,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                              POST: Add new doc                             */
/* -------------------------------------------------------------------------- */
export const createSun = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({
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
      console.log("Data already exists. No POST performed");
      return res.status(400).json({
        // Technically should be a 409 status code but after some online research
        // Seems it's not common and I just wanted to stay consistent in this app
        message: `${req.method} - Request made`,
        status: "failed",
        reason: `DUPLICATE: Data with latitude: ${lat} and longitude ${lng} exists. Please send a GET request or a different POST request.`,
        data: existingData,
      });
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
    console.log("New data is POST into db");
    return res.status(201).json({
      message: `${req.method} - Request made`,
      status: "successful",
      data: newSun,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};
