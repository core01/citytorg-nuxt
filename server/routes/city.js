'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/set', async function(req, res) {
  let { data } = await axios.get(process.env.YII_API + 'cities');
  if (data.cities && req.body.city.id) {
    for (let city of data.cities) {
      if(city.id === req.body.city.id){
        res.cookie('city_id', city.id, {
          maxAge: 60 * 60 * 1000 * 24 * 14,
          httpOnly: true,
          signed: true,
        });

        return res.json({ city: city });
      }
    }
  }
  res.status(401).json({ error: 'Bad city parameter.' });
});

module.exports = router;