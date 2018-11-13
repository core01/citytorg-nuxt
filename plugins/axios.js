export default function ({ $axios, error }) {
  $axios.onRequest((config) => { config.timeout = 10000; });
  // TODO разобраться с кодами ошибок
  $axios.onError(err => {
    if (err.code === 408 || err.code === 'ECONNABORTED') {
      error({statusCode: 408, message: 'Network Error'});
    }
    error({ statusCode: err.code, message: err.message });
  });
};