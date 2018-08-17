export const state = () => ({
  sales: [],
});

export const getters = {
  sales: state => {
    return state.sales;
  },
};

export const mutations = {
  SET_SALES(state, sales) {
    state.sales = sales;
  },
  ADD_SALES(state, sales) {
    state.sales = state.sales.concat(sales);
  },
};

export const actions = {
  async getSales(context) {
    let response = await this.$axios.get(process.env.BACKEND_URL +
        'sales?sort=-created_at&filter[city_id]=' + this.getters['cities/city']
      .id);
    if (response.headers) {
      let page = response.headers['x-pagination-current-page'];
      let maxPage = response.headers['x-pagination-page-count'];
      if (page && maxPage) {
        context.commit('meta/SET_SALES_PAGES', {
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
      context.commit('meta/SET_SALES_PAGES', {
        'page': page,
      });
      let response = await this.$axios.get(process.env.BACKEND_URL +
        'sales?sort=-created_at&filter[city_id]=' + context.getters
        .city.id +
        '&page=' + context.getters.salesPages.page);
      context.commit('ADD_SALES', response.data);
    }
  },
};