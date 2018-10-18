export const state = () => ({
  current: null,
  previous: null,
  sales: {
    type: 'grids',
  },
  shops: {
    type: 'grids',
  },
  category: {
    type: 'grids',
  }
});

export const getters = {
  shopsType: state => {
    return state.shops.type;
  },
  salesType: state => {
    return state.sales.type;
  },
  categoryType: state => {
    return state.category.type;
  }
};

export const mutations = {
  SET_CURRENT(state, page) {
    state.current = page;
  },
  SET_PREVIOUS(state, page) {
    state.previous = page;
  },
  SET_SHOPS_TYPE(state, type) {
    state.shops.type = type;
  },
  SET_SALES_TYPE(state, type) {
    state.sales.type = type;
  },
  SET_CATEGORY_TYPE(state, type){
    state.category.type = type;
  }
};