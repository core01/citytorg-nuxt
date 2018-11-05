<template>
  <section id="main">
    <div class="container mx-auto px-1 md:px-0">
      <div
        v-show="sales.length > 0"
        class="my-3">
        <h2 class="my-3">Новые
          <nuxt-link
            :to="{ name: 'city-sales', params: { city: city.alias }}"
            class="no-underline hover:underline">
            акции
          </nuxt-link>
        </h2>
        <sales-list-grids
          :sales="sales"
          :loading="loading" />
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
    let categories = await app.$axios.$get('api/categories/top?sort=-priority&per-page=6');
    return {
      categories,
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
      sales: 'sales/top',
      shops: 'shops/top',
    }),
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style lang="postcss" scoped>
</style>