require('dotenv').config();
const express = require('express');
const consola = require('consola');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { Nuxt, Builder } = require('nuxt');
const config = require('../nuxt.config.js');

const application = require('./routes/application');
const osm = require('./routes/osm');
const city = require('./routes/city');

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use('/application', application);
app.use('/osm', osm);
app.use('/city', city);

// Import and Set Nuxt.js options
config.dev = !(process.env.NODE_ENV === 'production');

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000,
  } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}
start();
