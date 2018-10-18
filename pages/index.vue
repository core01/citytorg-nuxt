<template>
  <section id="main">
    <div class="container mx-auto">

      <div class="my-3">
        <h2 class="my-3">Новые
          <nuxt-link
            :to="{ name: 'city-sales', params: { city: city.alias }}"
            class="no-underline hover:underline">
            акции
          </nuxt-link>
        </h2>
        <sales-list-grids
          :sales="sales"
          :loading="loading"
          @get-more-sales="getMoreSales" />
      </div>
      <div class="my-3">
        <h2 class="my-3">
          Популярные
          <nuxt-link
            :to="{ name: 'categories' }"
            class="no-underline hover:underline">
            категории
          </nuxt-link>
        </h2>
        <category-list :categories="categories" />
      </div>
      <div
        v-show="shops.length > 0"
        class="my-3">
        <h2 class="my-3">
          Популярные
          <nuxt-link
            :to="{ name: 'city-shops', params: { city: city.alias }}"
            class="no-underline hover:underline">
            магазины
          </nuxt-link>
        </h2>
        <shopListGrids :shops="shops" />
      </div>
    </div>
  </section>
</template>

<script>
import salesListGrids from '../components/sales/list/grids.vue';
import categoryList from '../components/categories/list.vue';
import shopListGrids from '../components/shops/list/grids.vue';

import {mapGetters} from 'vuex';

export default {
  head: {
    title: 'Главная страница',
    meta: [
      { hid: 'gv', name: 'google-site-verification', content:  'sfkKY7P61TQiML-kc0Foncz2ISZClSQIMmqj64feJys' },
      { hid: 'yv', name: 'yandex-verification', content: 'a88b4377e605e8ee' },
    ],
  },
  async asyncData({app, store, route}) {
    let sales = await app.$axios.$get(process.env.BACKEND_URL +
        'sales?sort=-created_at&expand=category' +
        '&filter[city_id]=' + store.getters['cities/city'].id + '&per-page=5');
    let categories = await app.$axios.$get(process.env.BACKEND_URL +
     'categories/top?sort=-priority&per-page=6');
    let shops = await app.$axios.$get(process.env.BACKEND_URL +
        'shops/top?sort=-priority,-id' +
        '&filter[city_id]=' + store.getters['cities/city'].id + '&per-page=4');
    return {
      sales,
      categories,
      shops,
    };
  },
  components: {
    salesListGrids,
    categoryList,
    shopListGrids,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      city: 'cities/city',
    }),
  },
  mounted() {
  },
  methods: {
    switchMode(mode) {
      this.$store.commit('pages/SET_INDEX_MODE', mode);
      this.switchType('grids');
    },
    switchType(type) {
      this.$store.commit('pages/SET_INDEX_TYPE', type);
    },
    async getMoreSales(){
      this.loading = true;
      await this.$store.dispatch('sales/getMoreSales');
      this.loading = false;
    }
  },
};
</script>

<style lang="postcss" scoped>
</style>