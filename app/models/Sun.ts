import { Schema, model } from "mongoose";

const sunSchema = new Schema(
  {
    sunrise: {
      type: String,
      required: [
        true,
        "Apologies. Sunrise time is required and wasn't properly fetched. Please try again later.",
      ],
      match: [
        /^(?:0?[1-9]|1[0-2]):[0-5]\d:[0-5]\d\s?(?:AM|PM)$/i,
        "Apologies. Sunrise time wasn't fetched in the proper format. Please try again later.",
      ],
      trim: true,
    },
    sunset: {
      type: String,
      required: [
        true,
        "Apologies. Sunset time is required and wasn't properly fetched. Please try again later.",
      ],
      match: [
        /^(?:0?[1-9]|1[0-2]):[0-5]\d:[0-5]\d\s?(?:AM|PM)$/i,
        "Apologies. Sunset time wasn't fetched in the proper format. Please try again later.",
      ],
      trim: true,
    },
    timezone: {
      type: String,
      required: [
        true,
        "Apologies. Timezone wasn't fetched. Please try again later. ",
      ],
      trim: true,
    },
    longitude: {
      type: Number,
      required: [
        true,
        "Longitude is required. Please add a query to the API URL, e.g., '/api/v1/sun?lat=35.68&lng=139.75'",
      ],
      trim: true,
    },
    latitude: {
      type: Number,
      required: [
        true,
        "Latitude is required. Please add a query to the API URL, e.g., '/api/v1/sun?lat=35.68&lng=139.75'",
      ],
      trim: true,
    },
    sunsetSunriseURL: {
      type: String,
      required: [
        true,
        "Apologies. The URL for fetching your requested data couldn't be constructed. Please try again later.",
      ],
      match: [
        /^https:\/\/api\.sunrise-sunset\.org\/json\?lat=(-?\d{1,3}(?:\.\d{1,3})?)&lng=(-?\d{1,3}(?:\.\d{1,3})?)$/,
        "Apologies. Something went wrong with validating the given longitude and latitude. Please follow this example when making your request: '/api/v1/sun?lat=35.68&lng=139.75'",
      ],
      trim: true,
    },
  },
  { timestamps: true }
);

const SunModel = model("Sun", sunSchema);
export default SunModel;

/* -------------------------------------------------------------------------- */
/*                          EXAMPLE: Full & Raw Data                          */
/* -------------------------------------------------------------------------- */
// API URL: https://api.sunrise-sunset.org/json?lat=14.56&lng=-90.73
/*

{
    "results": {
        "sunrise": "12:01:34 PM",
        "sunset": "11:32:40 PM",
        "solar_noon": "5:47:07 PM",
        "day_length": "11:31:06",
        "civil_twilight_begin": "11:40:20 AM",
        "civil_twilight_end": "11:53:54 PM",
        "nautical_twilight_begin": "11:14:30 AM",
        "nautical_twilight_end": "12:19:44 AM",
        "astronomical_twilight_begin": "10:48:49 AM",
        "astronomical_twilight_end": "12:45:24 AM"
        },
    "status": "OK",
    "tzid": "UTC"
}

*/
