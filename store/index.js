import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      city: {
        id: 1,
        alias: 'ust-kamenogorsk',
        title: 'Усть-Каменогорск',
      },
      cities: [],
      shops: [],
      sales: [],
      spinner: {
        show: false,
      }
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
    },
    actions: {
      async getCities() {
        let { data } = await this.$axios.get(process.env.BACKEND_URL + 'cities');
        this.commit('SET_CITIES', data);
        let currentRouter = this.$router.currentRoute.params.city;
        let currentCity = localStorage.getItem('city');
        if (currentRouter){
          for(let city in data){
            if(data[city].alias === currentRouter){
              this.dispatch('setCity', data[city]);

              return data;
            }
          }
        }
        if(currentCity){
          for(let city in data){
            if(JSON.stringify(data[city]) === currentCity){
              this.dispatch('setCity', data[city]);

              return data;
            }
          }
        }
        this.commit('SET_CITY', data[0]);

        return data;
      },
      setCity(context, city) {
        context.commit('SET_CITY', city);
        localStorage.setItem('city', JSON.stringify(city));
        context.dispatch('getShops');
        context.dispatch('getSales');
      },
      async getShops(context) {
        let { data } = await this.$axios.get(process.env.BACKEND_URL +
          'shops?sort=-priority,-id&filter[city_id]=' + context.getters.city.id
        );
        this.commit('SET_SHOPS', data);

        return data;
      },
      async getSales(context) {
        let { data } = await this.$axios.get(process.env.BACKEND_URL +
          'sales?sort=-created_at&filter[city_id]=' + context.getters.city.id
        );
        this.commit('SET_SALES', data);

        return data;
      },
    }
  });
};

export default createStore;