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
      meta: {
        sales: {
          page: 1,
          maxPage: 1,
        },
        shops: {
          page: 1,
          maxPage: 1,
        },
        pages: {
          current: null,
          previous: null,
        }
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
      ADD_SALES(state, sales) {
        state.sales = state.sales.concat(sales);
      },
      SHOW_SPINNER(state, value) {
        state.spinner.show = value;
      },
      SET_SALES_PAGES(state, payload) {
        if (payload.page) {
          state.meta.sales.page = parseInt(payload.page);
        }
        if (payload.maxPage) {
          state.meta.sales.maxPage = parseInt(payload.maxPage);
        }
      },
      SET_CURRENT_PAGE(state, page){
        state.meta.pages.current = page;
      },
      SET_PREVIOUS_PAGE(state, page){
        state.meta.pages.previous = page;
      }
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
      salesPages: state => {
        return state.meta.sales;
      }
    },
    actions: {
      async nuxtServerInit( {
        dispatch,
        state
      }, {
        req
      }) {
        let currentCity = state.city;
        if (req.session) {
          if (req.session.city) {
            currentCity = req.session.city;
          }
        }
        let routeCity = this.$router.currentRoute.params.city;
        if (routeCity) {
          await dispatch('getCities');
          let cities = state.cities;
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
          .city.id);
        this.commit('SET_SHOPS', data);
      },
      async getSales(context) {
        let response = await this.$axios.get(process.env.BACKEND_URL +
          'sales?sort=-created_at&filter[city_id]=' + context.getters.city
          .id);
        if (response.headers) {
          let page = response.headers['x-pagination-current-page'];
          let maxPage = response.headers['x-pagination-page-count'];
          if (page && maxPage) {
            context.commit('SET_SALES_PAGES', {
              'page': page,
              'maxPage': maxPage
            });
          }
        }
        context.commit('SET_SALES', response.data);
      },
      async getMoreSales(context) {
        if (context.getters.salesPages.page !== context.getters.salesPages
          .maxPage) {
          let page = context.getters.salesPages.page + 1;
          context.commit('SET_SALES_PAGES', {
            'page': page,
          });
          let response = await this.$axios.get(process.env.BACKEND_URL +
            'sales?sort=-created_at&filter[city_id]=' + context.getters
            .city.id +
            '&page=' + context.getters.salesPages.page);
          context.commit('ADD_SALES', response.data);
        }
      },
    }
  });
};

export default createStore;