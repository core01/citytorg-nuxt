export const state = () => ({
  shops: [],
  topShops: [],
});

export const getters = {
  shops: state => {
    return state.shops;
  },
  top: state => {
    return state.topShops;
  },
};

export const mutations = {
  SET_SHOPS(state, shops) {
    state.shops = shops;
  },
  SET_TOP_SHOPS(state, shops){
    state.topShops = shops;
  }
};

export const actions = {
  async getShops(context) {
    let data = await this.$axios.$get(process.env.BACKEND_URL +
        'shops?sort=-priority,-id' +
        '&filter[city_id]=' + this.getters['cities/city'].id +
        '&per-page=0');
    context.commit('SET_SHOPS', data);
  },
  async getTopShops(context){
    let shops = await this.$axios.$get(process.env.BACKEND_URL +
      'shops/top?sort=-priority,-id' +
      '&filter[city_id]=' + this.getters['cities/city'].id + '&per-page=4');
    context.commit('SET_TOP_SHOPS', shops);
  }
};