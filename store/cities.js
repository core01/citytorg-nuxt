export const state = () => ({
  city: {
    'id': 1,
    'title': 'Усть-Каменогорск',
    'alias': 'ust-kamenogorsk',
    'lat': '49.96427057155009',
    'lon': '82.59572865600605',
  },
  cities: [],
});

export const getters = {
  city: state => {
    return state.city;
  },
  cities: state => {
    return state.cities;
  },
};
export const mutations = {
  SET_CITY(state, city) {
    state.city = city;
  },
  SET_CITIES(state, cities) {
    state.cities = cities;
  },
};

export const actions = {
  async getCities(context) {
    let data = await this.$axios.$get('api/cities');
    context.commit('SET_CITIES', data.cities);
  },
  async setCity(context, city) {
    let data = await this.$axios.$post('/city/set', {
      city: city,
    });
    context.commit('SET_CITY', data.city);
    await this.dispatch('shops/getShops');
    await this.dispatch('sales/getSales');
    await this.dispatch('sales/getTopSales');
    await this.dispatch('shops/getTopShops');
  },
};