export default function ({ $axios, error }) {
  $axios.onRequest((config) => { config.timeout = 10000; });
  // TODO разобраться с кодами ошибок
  $axios.onError(error => {
    if (error.code === 408 || error.code === 'ECONNABORTED') {
      error({statusCode: 408, message: 'Network Error'});
    }
    error({ statusCode: error.code, message: error.message });
  });
};