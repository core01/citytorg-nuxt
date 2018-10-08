export const state = () => ({
  sales: [],
  categorySales: {}
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
    state.categorySales[payload.id] = state.categorySales[payload.id].concat(payload.sales);
  }
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
      let response = await this.$axios.get(process.env.BACKEND_URL +
          'sales?sort=-created_at&filter[city_id]=' +
          this.getters['cities/city'].id +
          '&page=' +
          this.getters['meta/salesPages'].page);
      context.commit('ADD_SALES', response.data);
    }
  },
  async getCategorySales(context, id) {
    if (context.getters.categorySalesById(id).length === 0) {
      let response = await this.$axios.get(process.env.BACKEND_URL +
          'sales?sort=-created_at&filter[category_id]=' +
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
    }
  },
  async getMoreCategorySales(context, id) {
    if (
      this.getters['meta/categorySalesById'](id).page !==
      this.getters['meta/categorySalesById'](id).maxPage
    ) {
      let page = this.getters['meta/categorySalesById'](id).page + 1;
      console.log(this.getters['meta/categorySalesById'](id));
      console.log('page = ' + page);
      this.commit('meta/SET_CATEGORY_SALES_PAGES', {
        id: id,
        page: page
      });
      let response = await this.$axios.get(process.env.BACKEND_URL +
          'sales?sort=-created_at&filter[category_id]=' +
          id +
          '&filter[city_id]=' +
          this.getters['cities/city'].id +
          '&page=' +
          this.getters['meta/categorySalesById'](id).page);
      context.commit('ADD_CATEGORY_SALES', { id: id, sales: response.data });
    }
  }
};