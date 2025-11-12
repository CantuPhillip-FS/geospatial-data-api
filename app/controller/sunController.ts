import type { Request, Response } from "express";
import { fetchData } from "../api/sunrise-sunset-api.js";

// for query params try
// if(query !== Sun.find()) {
//   includes select, or just remove commas
//   no need for $ for gte, lt, etc
// };

// PLAN: Check to see if location already exists in MongoDB
// If not, FETCH & SAVE new data

/* -------------------------------------------------------------------------- */
/*                              GET: All Sun docs                             */
/* -------------------------------------------------------------------------- */

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
    const data = await fetchData(14.56, -90.73);
    if (data === undefined || data === null) {
      throw new Error(
        "Error fetching data. Were longitude and latitude present and correct?"
      );
    }
    res.status(201).json({
      message: `${req.method} - Request made`,
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
