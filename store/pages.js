export const state = () => ({
  current: null,
  previous: null,
  sales: {
    type: 'active',
  },
  shops: {
    mode: 'grids',
  },
});

export const getters = {
  shopsMode: state => {
    return state.shops.mode;
  },
  salesType: state => {
    return state.sales.type;
  },
};

export const mutations = {
  SET_CURRENT(state, page) {
    state.current = page;
  },
  SET_PREVIOUS(state, page) {
    state.previous = page;
  },
  SET_SHOPS_MODE(state, mode) {
    state.shops.mode = mode;
  },
  SET_SALES_TYPE(state, type){
    state.sales.type = type;
  },
};