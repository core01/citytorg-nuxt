export default async ({error, app, route}) => {
  if (process.server) {
    if (await route.params.alias) {
      let [id] = route.params.alias.split('-');
      let shop = await app.$axios.$get(process.env.BACKEND_URL + 'shops/' + id +
          '?expand=city');
      if (shop.city.alias !== route.params.city) {
        return error({
          statusCode: 404,
          message: 'Not found.',
        });

      }
    }
  }
};