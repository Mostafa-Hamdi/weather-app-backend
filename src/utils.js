import request from "request";

const getLatitude = (address, callback) => {
  request(
    {
      url:
        "https://us1.locationiq.com/v1/search?key=pk.fd8044a833c7147752c14498bf3f6ce2&q=" +
        address +
        "&format=json&",
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("unable to connect weather service");
      } else if (body.error) {
        callback("pls enter a valid location");
      } else {
        callback(undefined, {
          lat: body[0].lat,
          lon: body[0].lon,
        });
      }
    },
  );
};

const getForecast = (lat, lon, callback) => {
  request(
    {
      url: `https://api.weatherstack.com/current?access_key=80c276032fed9532a5c6ea9e82ed394a&query=${lat},${lon}`,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("unable to connect weather service");
      } else if (body.error) {
        callback("pls enter a valid location");
      } else {
        callback(undefined, {
          data: body.current,
        });
      }
    },
  );
};

export { getLatitude, getForecast };
