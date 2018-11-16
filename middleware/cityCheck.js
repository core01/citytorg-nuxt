export default async ({error, app, route}) => {
  if (process.server) {
    if (await route.params.city) {
      let data = await app.$axios.$get('api/cities');
      let cities = data.cities;
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