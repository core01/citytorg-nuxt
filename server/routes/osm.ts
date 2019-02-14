"use strict";
import express from "express";
import needle from "needle";
import fs from "fs";
import path from "path";
const router = express.Router();

const ttl = 24 * 60 * 60 * 30 * 1000;

const myMkdirSync = dir => {
  if (fs.existsSync(dir)) {
    return;
  }

  try {
    fs.mkdirSync(dir);
  } catch (err) {
    if (err.code === "ENOENT") {
      myMkdirSync(path.dirname(dir)); // create parent dir
      myMkdirSync(dir); // create dir
    }
  }
};

router.get("/", (req, res) => {
  if (!req.query.x || !req.query.y || !req.query.z || !req.query.s) {
    return res.status(400).json({
      status: false
    });
  }
  const x = parseInt(req.query.x, 10);
  const y = parseInt(req.query.y, 10);
  const z = parseInt(req.query.z, 10);
  const s = req.query.s;

  const filepath = "assets/tiles/" + z + "/" + x + "/" + y + ".png";

  fs.stat(filepath, (err, stat) => {
    const date = new Date();

    if (
      (err === null && stat.mtime < new Date(date.getTime() - ttl)) ||
      (err !== null && err.code === "ENOENT")
    ) {
      myMkdirSync(path.dirname(filepath));
      const url =
        "https://" +
        s +
        ".tile.openstreetmap.org/" +
        z +
        "/" +
        x +
        "/" +
        y +
        ".png";
      needle.get(url, (error, response) => {
        if (!error && response.statusCode === 200) {
          fs.writeFile(filepath, response.body, err2 => {
            // throws an error, you could also catch it here
            if (err2) throw err2;
            // success case, the file was saved
            res.sendFile(filepath, {
              root: path.join(__dirname, "../..")
            });
          });
        } else {
          console.log("remote server error");
          res.send(503).json({
            succes: false,
            message: "OSM server error"
          });
        }
      });
    } else if (err === null) {
      res.sendFile(filepath, {
        root: path.join(__dirname, "../..")
      });
    } else {
      console.log("Some other error: ", err.code);
    }
  });
});

export default router;
