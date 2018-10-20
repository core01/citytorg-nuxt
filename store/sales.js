export const state = () => ({
  sales: [],
  categorySales: {},
  topSales: [],
});

export const getters = {
  sales: state => {
    return state.sales;
  },
  categorySalesById: state => id => {
    if (state.categorySales[id]) {
      return state.categorySales[id];
    }
    return [];
  },
  categorySales: state => {
    return state.categorySales;
  },
  top: state => {
    return state.topSales;
  }
};

export const mutations = {
  SET_SALES(state, sales) {
    state.sales = sales;
  },
  ADD_SALES(state, sales) {
    state.sales = state.sales.concat(sales);
  },
  SET_CATEGORY_SALES(state, payload) {
    if (!state.categorySales[payload.id]) {
      state.categorySales[payload.id] = [];
    }
    state.categorySales[payload.id] = payload.sales;
  },
  ADD_CATEGORY_SALES(state, payload) {
    state.categorySales = {
      ...state.categorySales,
      [payload.id]: state.categorySales[payload.id].concat(payload.sales)
    };
  },
  SET_TOP_SALES(state, sales){
    state.topSales = sales;
  }
};

export const actions = {
  async getSales(context) {
    let response = await this.$axios.get(process.env.BACKEND_URL +
        'sales?sort=-created_at&expand=category&filter[city_id]=' +
        this.getters['cities/city'].id);
    if (response.headers) {
      let page = response.headers['x-pagination-current-page'];
      let maxPage = response.headers['x-pagination-page-count'];
      if (page && maxPage) {
        this.commit('meta/SET_SALES_PAGES', {
          page: page,
          maxPage: maxPage
        });
      }
    }
    context.commit('SET_SALES', response.data);
  },
  async getMoreSales(context) {
    if (
      this.getters['meta/salesPages'].page !==
      this.getters['meta/salesPages'].maxPage
    ) {
      let page = this.getters['meta/salesPages'].page + 1;
      this.commit('meta/SET_SALES_PAGES', {
        page: page
      });
      let sales = await this.$axios.$get(process.env.BACKEND_URL +
          'sales?sort=-created_at&expand=category&filter[city_id]=' +
          this.getters['cities/city'].id +
          '&page=' +
          this.getters['meta/salesPages'].page);
      context.commit('ADD_SALES', sales);
    }
  },
  async getTopSales(context){
    let sales = await this.$axios.$get(process.env.BACKEND_URL +
      'sales?sort=-created_at&expand=category' +
      '&filter[city_id]=' + this.getters['cities/city'].id + '&per-page=5');
    context.commit('SET_TOP_SALES', sales);
  },
  async getCategorySales(context, id) {
    let response = await this.$axios.get(process.env.BACKEND_URL +
        'sales?sort=-created_at&expand=category&filter[category_id]=' +
        id +
        '&filter[city_id]=' +
        this.getters['cities/city'].id);
    if (response.headers) {
      let page = response.headers['x-pagination-current-page'];
      let maxPage = response.headers['x-pagination-page-count'];
      let total = response.headers['x-pagination-total-count'];
      if (page && maxPage) {
        this.commit('meta/SET_CATEGORY_SALES_PAGES', {
          page: page,
          maxPage: maxPage,
          id: id,
          total: total
        });
      }
    }
    context.commit('SET_CATEGORY_SALES', { id: id, sales: response.data });
  },
  async getMoreCategorySales(context, id) {
    if (
      this.getters['meta/categorySalesById'](id).page !==
      this.getters['meta/categorySalesById'](id).maxPage
    ) {
      let page = this.getters['meta/categorySalesById'](id).page + 1;
      this.commit('meta/SET_CATEGORY_SALES_PAGES', {
        id: id,
        page: page
      });
      let response = await this.$axios.get(process.env.BACKEND_URL +
          'sales?sort=-created_at&expand=category&filter[category_id]=' +
          id +
          '&filter[city_id]=' +
          this.getters['cities/city'].id +
          '&page=' +
          this.getters['meta/categorySalesById'](id).page);
      context.commit('ADD_CATEGORY_SALES', { id: id, sales: response.data });
    }
  }
};