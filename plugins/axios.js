export default function({ $axios, error, app }) {
  // TODO разобраться с кодами ошибок
  $axios.onError(err => {
    if (err.code === 408 || err.code === 'ECONNABORTED') {
      error({ statusCode: 408, message: 'Network Error' });
    }
    if (process.client) {
      // Отправляем данные об ошибке в sentry.io
      app.$sentry.configureScope(scope => {
        scope.setExtra('request', err);
        app.$sentry && app.$sentry.captureException(err.response.data);
      });
    }
    error({ statusCode: err.code, message: err.message });
  });
}
