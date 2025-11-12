import type { Request, Response } from "express";
import { fetchData } from "../api/sunrise-sunset-api.js";
// import Sun from "../models/Sun.js";

// type Data = {
//   sunrise: String;
//   sunset: String;
//   timezone: String;
//   longitude: String | Number;
//   latitude: String | Number;
// };

/* -------------------------------------------------------------------------- */
/*                              GET: All Sun docs                             */
/* -------------------------------------------------------------------------- */
// for query params try
// if(query !== Sun.find()) {
//   includes select, or just remove commas
//   no need for $ for gte, lt, etc
// };

// PLAN: Check to see if location already exists in MongoDB
// If not, FETCH & SAVE new data

export const getAllSuns = async (req: Request, res: Response) => {
  try {
    // const suns = await Sun.find({});
    res.status(200).json({
      message: `${req.method} - Request made`,
      success: true,
      // sunRiseAndSetInfo: suns,
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
    const query = req.query;
    const lat = query.lat as string;
    const lng = query.lng as string;
    if (lat === undefined || lng === undefined) {
      throw new Error(
        "Please include a query within your request. E.g., '/api/vi?lat=14.56&lng=-90.73'"
      );
    }
    console.log(query);

    const data = await fetchData(lat, lng);
    if (data === undefined || data === null) {
      throw new Error(
        "Error fetching data. Check correct lat & lng were given, e.g., '?lat=14.56&lng=-90.73'"
      );
    }

    // const Data: Data = {
    //   sunrise: data.results.sunrise,
    //   sunset: data.results.sunset,
    //   timezone: data.results.tzid,
    //   latitude: lng,
    //   longitude: lat,
    // };

    // const newSun = await Sun.create(Data);
    res.status(201).json({
      message: `${req.method} - Request made`,
      success: true,
      // data: newSun,
      query,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
