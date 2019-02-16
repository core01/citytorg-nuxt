export const state = () => ({
  sales: {
    page: 1,
    maxPage: 1,
  },
  categorySales: {},
});

export const getters = {
  salesPages: state => {
    return state.sales;
  },
  categorySalesById: state => id => {
    return state.categorySales[id];
  },
};

export const mutations = {
  SET_SALES_PAGES(state, payload) {
    if (payload.page) {
      state.sales.page = parseInt(payload.page);
    }
    if (payload.maxPage) {
      state.sales.maxPage = parseInt(payload.maxPage);
    }
  },
  SET_CATEGORY_SALES_PAGES(state, payload) {
    if (!state.categorySales[payload.id]) {
      state.categorySales[payload.id] = {};
    }
    if (payload.page) {
      state.categorySales[payload.id].page = parseInt(payload.page);
    }
    if (payload.maxPage) {
      state.categorySales[payload.id].maxPage = parseInt(payload.maxPage);
    }
    if (payload.total) {
      state.categorySales[payload.id].total = parseInt(payload.total);
    }
  },
};
