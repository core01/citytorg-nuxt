import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      city: {
        'id': 1,
        'title': 'Усть-Каменогорск',
        'alias': 'ust-kamenogorsk',
        'lat': '49.96427057155009',
        'lon': '82.59572865600605'
      },
      cities: [],
      shops: [],
      sales: [],
      spinner: {
        show: false,
      },
    },
    mutations: {
      SET_CITY(state, city) {
        state.city = city;
      },
      SET_CITIES(state, cities) {
        state.cities = cities;
      },
      SET_SHOPS(state, shops) {
        state.shops = shops;
      },
      SET_SALES(state, sales) {
        state.sales = sales;
      },
      SHOW_SPINNER(state, value) {
        state.spinner.show = value;
      },
    },
    getters: {
      city: state => {
        return state.city;
      },
      cities: state => {
        return state.cities;
      },
      shops: state => {
        return state.shops;
      },
      sales: state => {
        return state.sales;
      },
    },
    actions: {
      async nuxtServerInit({ dispatch, state }, { req }) {
        let currentCity = state.city;
        if (req.session.city) {
          currentCity = req.session.city;
        }
        let routeCity = this.$router.currentRoute.params.city;
        if (routeCity) {
          let cities = await dispatch('getCities');
          for (let city in cities) {
            if (cities[city].alias === routeCity) {
              currentCity = cities[city];
            }
          }
        }
        await dispatch('setCity', currentCity);
      },
      async getCities() {
        let data = await this.$axios.$get(process.env.BACKEND_URL +
          'cities');
        this.commit('SET_CITIES', data);
        return data;
      },
      async setCity(context, city) {
        let data = await this.$axios.$post('/city/set', {
          city: city
        });
        context.commit('SET_CITY', data.city);
        await context.dispatch('getShops');
        await context.dispatch('getSales');
      },
      async getShops(context) {
        let data = await this.$axios.$get(process.env.BACKEND_URL +
          'shops?sort=-priority,-id&filter[city_id]=' + context.getters
          .city.id
        );
        this.commit('SET_SHOPS', data);

        return data;
      },
      async getSales(context) {
        let data = await this.$axios.$get(process.env.BACKEND_URL +
          'sales?sort=-created_at&filter[city_id]=' + context.getters.city
          .id
        );
        this.commit('SET_SALES', data);

        return data;
      },
    }
  });
};

export default createStore;