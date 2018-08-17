export const actions = {
  async nuxtServerInit( {
    dispatch,
    state
  }, {
    req
  }) {
    let currentCity = state.cities.city;
    if (req.session) {
      if (req.session.city) {
        currentCity = req.session.city;
      }
    }
    let routeCity = this.$router.currentRoute.params.city;
    if (routeCity) {
      await dispatch('cities/getCities');
      let cities = state.cities;
      for (let city in cities) {
        if (cities[city].alias === routeCity) {
          currentCity = cities[city];
        }
      }
    }
    await dispatch('cities/setCity', currentCity);
  },
};