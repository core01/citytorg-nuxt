export const actions = {
  async nuxtServerInit({ dispatch, state }, { req }) {
    await dispatch('cities/getCities');
    let cities = state.cities.cities;
    let currentCity = state.cities.city;
    if (req.signedCookies) {
      let cityId = parseInt(req.signedCookies['city_id']);
      if (cityId !== undefined) {
        for (let city of cities) {
          if (city.id === cityId) {
            currentCity = city;
          }
        }
      }
    }
    let routeCity = this.$router.currentRoute.params.city;
    if (routeCity) {
      for (let city of cities) {
        if (city.alias === routeCity) {
          currentCity = city;
        }
      }
    }
    await dispatch('cities/setCity', currentCity);
  }
};