export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => { config.timeout = 10000; });
};