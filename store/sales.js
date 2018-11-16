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
    let data = await this.$axios.$get('api/sales?sort=-created_at&expand=category&filter[city_id]=' +
        this.getters['cities/city'].id);
    if (data['_meta']) {
      let meta = data['_meta'];
      this.commit('meta/SET_SALES_PAGES', {
        page: meta.currentPage,
        maxPage: meta.pageCount
      });
    }
    context.commit('SET_SALES', data.sales);
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
      let data = await this.$axios.$get('api/sales?sort=-created_at&expand=category&filter[city_id]=' +
          this.getters['cities/city'].id +
          '&page=' +
          this.getters['meta/salesPages'].page);
      context.commit('ADD_SALES', data.sales);
    }
  },
  async getTopSales(context){
    let data = await this.$axios.$get('api/sales?sort=-created_at&expand=category' +
      '&filter[city_id]=' + this.getters['cities/city'].id + '&per-page=5');
    context.commit('SET_TOP_SALES', data.sales);
  },
  async getCategorySales(context, id) {
    let data = await this.$axios.$get('api/sales?sort=-created_at&expand=category&filter[category_id]=' +
        id +
        '&filter[city_id]=' +
        this.getters['cities/city'].id);

    if (data['_meta']) {
      let meta = data['_meta'];
      this.commit('meta/SET_CATEGORY_SALES_PAGES', {
        page: meta.currentPage,
        maxPage: meta.pageCount,
        id: id,
        total: meta.totalCount
      });
    }
    context.commit('SET_CATEGORY_SALES', { id: id, sales: data.sales });
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
      let data = await this.$axios.$get('api/sales?sort=-created_at&expand=category&filter[category_id]=' +
          id +
          '&filter[city_id]=' +
          this.getters['cities/city'].id +
          '&page=' +
          this.getters['meta/categorySalesById'](id).page);
      context.commit('ADD_CATEGORY_SALES', { id: id, sales: data.sales });
    }
  }
};