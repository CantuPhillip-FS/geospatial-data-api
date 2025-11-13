import { Schema, model } from "mongoose";

const sunSchema = new Schema(
  {
    sunrise: {
      type: String,
      required: [
        true,
        "Time of sunrise is required, e.g, 'sunrise': '9:15:07 PM'",
      ],
      match: [
        /^(?:0?[1-9]|1[0-2]):[0-5]\d:[0-5]\d\s?(?:AM|PM)$/i,
        "Please follow this example: 'sunrise': '9:15:07 PM'",
      ],
      trim: true,
    },
    sunset: {
      type: String,
      required: [
        true,
        "Time of sunset is required, e.g, 'sunset': '7:38:54 AM'",
      ],
      match: [
        /^(?:0?[1-9]|1[0-2]):[0-5]\d:[0-5]\d\s?(?:AM|PM)$/i,
        "Please follow this example: 'sunset': '7:38:54 AM'",
      ],
      trim: true,
    },
    latitude: {
      type: String,
      required: [true, "Latitude is required, e.g., 'latitude': '35.68'"],
      trim: true,
    },
    longitude: {
      type: String,
      required: [true, "Longitude is required, e.g., 'longitude': '139.75'"],
      trim: true,
    },
    sunriseSunsetURL: {
      type: String,
      required: true,
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
