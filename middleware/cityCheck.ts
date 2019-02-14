export default async ({ app, route, redirect }) => {
  if (process.server) {
    if (await route.params.city) {
      const data = await app.$axios.$get("api/cities");
      const cities = data.cities;
      if (
        !cities.some(city => {
          return city.alias === route.params.city;
        })
      ) {
        redirect("/404");
      }
    }
  }
};
