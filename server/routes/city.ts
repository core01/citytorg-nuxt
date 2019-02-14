"use strict";
import express from "express";
import { Response, Request } from "express";
import axios from "axios";
const router = express.Router();

router.post("/set", async (req: Request, res: Response) => {
  console.log("CITY SET YEA");
  const { data } = await axios.get(process.env.YII_API + "cities");
  if (data.cities && req.body.city.id) {
    for (const city of data.cities) {
      if (city.id === req.body.city.id) {
        res.cookie("city_id", city.id, {
          maxAge: 60 * 60 * 1000 * 24 * 14,
          httpOnly: true,
          signed: true
        });

        return res.json({ city });
      }
    }
  }
  res.status(401).json({ error: "Bad city parameter." });
});

export default router;
