import "dotenv/config";

const BASE_URL: string | undefined = process.env.SUNSET_RISE_URL;
// BASE_URL = https://api.sunrise-sunset.org/json?
export const fetchData = async (lat: string | number, lng: string | number) => {
  try {
    // Example URL: https://api.sunrise-sunset.org/json?lat=14.56&lng=-90.73
    const response = await fetch(`${BASE_URL}lat=${lat}&lng=${lng}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error.message;
  }
};

// Example expected data object:
/* 

{
    "message": "POST - Request made",
    "success": true,
    "data": {
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
}

*/
