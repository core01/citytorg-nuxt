import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// @ts-ignore
import { Builder, Nuxt } from "nuxt-ts";
dotenv.config();

const app = express();

const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

import application from "./routes/application";
import osm from "./routes/osm";
import city from "./routes/city";

import config from "../nuxt.config";

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.set("port", port);
app.set("host", host);

app.use("/application", application);
app.use("/osm", osm);
app.use("/city", city);

const isDev = process.env.NODE_ENV !== "production";

async function start() {
  // Init Nuxt.js
  const nuxt: Nuxt = new Nuxt(config);

  // Build only in dev mode
  if (isDev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  app.listen(app.get("port"), app.get("host"));

  console.log("Server listening on http://" + host + ":" + port); // eslint-disable-line no-console
}

start();
