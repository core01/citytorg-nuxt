'use strict';

const express = require('express');
const needle = require('needle');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const ttl = 24 * 60 * 60 * 30 * 1000;

const myMkdirSync = function(dir) {
  if (fs.existsSync(dir)) {
    return;
  }

  try {
    fs.mkdirSync(dir);
  } catch (err) {
    if (err.code === 'ENOENT') {
      myMkdirSync(path.dirname(dir)); // create parent dir
      myMkdirSync(dir); // create dir
    }
  }
};

router.get('/', function(req, res, next) {
  if (!req.query.x || !req.query.y || !req.query.z || !req.query.s) {
    return res.status(400).json({
      status: false,
    });
  }
  let x = parseInt(req.query.x, 10);
  let y = parseInt(req.query.y, 10);
  let z = parseInt(req.query.z, 10);
  let s = req.query.s;

  let filepath = 'assets/tiles/' + z + '/' + x + '/' + y + '.png';

  fs.stat(filepath, function(err, stat) {
    let date = new Date();

    if ((err === null && stat.mtime < new Date(date - ttl)) ||
        (err !== null && err.code === 'ENOENT')) {
      myMkdirSync(path.dirname(filepath));
      let url = 'https://' + s + '.tile.openstreetmap.org/' + z + '/' +
          x + '/' + y + '.png';
      needle.get(url, function(error, response) {
        if (!error && response.statusCode === 200) {
          fs.writeFile(filepath, response.body, (err) => {
            // throws an error, you could also catch it here
            if (err) throw err;
            // success case, the file was saved
            res.sendFile(filepath, {
              root: path.join(__dirname, '../..'),
            });
          });
        } else {
          console.log('remote server error');
          res.send(503).json({
            succes: false,
            message: 'OSM server error',
          });
        }
      });
    } else if (err === null) {
      res.sendFile(filepath, {
        root: path.join(__dirname, '../..'),
      });
    } else {
      console.log('Some other error: ', err.code);
    }
  });

});

module.exports = router;