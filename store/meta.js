export const state = () => ({
  sales: {
    page: 1,
    maxPage: 1,
  },
});

export const getters = {
  salesPages: state => {
    return state.sales;
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
};