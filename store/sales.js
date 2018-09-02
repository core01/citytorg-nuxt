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
        'sales?sort=-created_at&filter[city_id]=' +
        this.getters['cities/city'].id);
    if (response.headers) {
      let page = response.headers['x-pagination-current-page'];
      let maxPage = response.headers['x-pagination-page-count'];
      if (page && maxPage) {
        this.commit('meta/SET_SALES_PAGES', {
          'page': page,
          'maxPage': maxPage,
        });
      }
    }
    context.commit('SET_SALES', response.data);
  },
  async getMoreSales(context) {
    if (this.getters['meta/salesPages'].page !==
        this.getters['meta/salesPages'].maxPage) {
      let page = this.getters['meta/salesPages'].page + 1;
      this.commit('meta/SET_SALES_PAGES', {
        'page': page,
      });
      let response = await this.$axios.get(process.env.BACKEND_URL +
          'sales?sort=-created_at&filter[city_id]=' +
          this.getters['cities/city'].id +
          '&page=' + this.getters['meta/salesPages'].page);
      context.commit('ADD_SALES', response.data);
    }
  },
};