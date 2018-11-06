export default async ({error, app, route}) => {
  if (process.server) {
    if (await route.params.city) {
      let cities = await app.$axios.$get('api/cities');
      if (!cities.some(city => {
        return city.alias === route.params.city;
      })) {
        return error({
          statusCode: 404,
          message: 'Not found.',
        });
      }
    }
  }
};