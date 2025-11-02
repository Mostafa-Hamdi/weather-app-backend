import { getLatitude, getForecast } from "./utils.js";
import express from "express";
import cors from "cors";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: "https://weather-forecast-liart-two.vercel.app" }));

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "unvalid request, pls send me specific address" });
  }
  getLatitude(req.query.address, (error, { lat, lon }) => {
    if (error) {
      return res.send({ error });
    }

    getForecast(lat, lon, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      console.log(data);
      res.send(data);
    });
  });
});

app.listen(port, () => {
  console.log("server is starts up on port 3000");
});
