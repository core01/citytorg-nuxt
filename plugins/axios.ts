export default ({ $axios, redirect, app }) => {
  $axios.onRequest(config => {
    config.timeout = 3000;
  });
  // TODO разобраться с кодами ошибок
  $axios.onError(err => {
    if (process.client) {
      // Отправляем данные об ошибке в sentry.io
      app.$sentry.configureScope(scope => {
        scope.setExtra("request", err);
        app.$sentry.captureException(err.response.data);
      });
    }
    redirect("/400");
  });
};
