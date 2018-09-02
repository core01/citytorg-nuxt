export default async ({error, app, route}) => {
  if (process.server) {
    if (await route.params.alias) {
      let [id] = route.params.alias.split('-');
      let sale = await app.$axios.$get(process.env.BACKEND_URL + 'sales/' + id +
          '?expand=city');
      if (sale.city.alias !== route.params.city) {
        return error({
          statusCode: 404,
          message: 'Not found.',
        });

      }
    }
  }
};