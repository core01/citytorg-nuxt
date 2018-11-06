'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/set', async function(req, res) {
  let {data} = await axios.get(process.env.YII_API + 'cities');
  if (data && req.body.city) {
    for (let i = 0; i < data.length; i++) {
      if (JSON.stringify(data[i]) === JSON.stringify(req.body.city)) {
        req.session.city = data[i];
        return res.json({city: data[i]});
      }
    }
  }
  res.status(401).json({error: 'Bad city parameter.'});
});

module.exports = router;