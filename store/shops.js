export const state = () => ({
  shops: [],
});

export const getters = {
  shops: state => {
    return state.shops;
  },
};

export const mutations = {
  SET_SHOPS(state, shops) {
    state.shops = shops;
  },
};

export const actions = {
  async getShops(context) {
    let data = await this.$axios.$get(process.env.BACKEND_URL +
        'shops?sort=-priority,-id' +
        '&expand=shopType' +
        '&filter[city_id]=' + this.getters['cities/city'].id +
        '&per-page=50');
    context.commit('SET_SHOPS', data);
  },
};