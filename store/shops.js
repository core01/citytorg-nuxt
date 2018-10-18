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
        '&filter[city_id]=' + this.getters['cities/city'].id +
        '&per-page=0');
    context.commit('SET_SHOPS', data);
  },
};