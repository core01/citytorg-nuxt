<template>
  <div>
    <section class="hero is-default is-bold">
      <div class="hero-head">
        <navbar/>
      </div>
    </section>
    <section
      id="main"
      class="hero is-fullheight">
      <div class="container">
        <div class="columns">
          <div class="column is-6-desktop">
            <main-tabs
              :mode="mode"
              @switch-mode="switchMode"/>
          </div>
          <div class="column is-6-desktop">
            <sales-tabs
              v-if="mode === 'sales'"
              :div-class="'is-toggle is-right-desktop'"
              :type="type"
              @switch-type="switchType"/>
            <shops-tabs
              v-else
              :div-class="'is-toggle is-right-desktop'"
              :type="type"
              @switch-type="switchType"/>
          </div>
        </div>
        <template v-if="mode === 'sales'">
          <sales-list-grids
            v-if="type === 'grids'"
            :sales="sales"/>
          <sales-list-rows
            v-else
            :sales="sales"/>
        </template>
        <template v-else>
          <shops-list-grids
            v-if="type === 'grids'"
            :shops="shops"/>
          <shops-list-map
            v-else
            :shops="shops"
            :zoom="13" />
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import navbar from '../components/navbar/navbar.vue';
// import { createClient } from '~/plugins/contentful.js';
import salesListGrids from '../components/sales/list/grids.vue';
import salesListRows from '../components/sales/list/rows.vue';

import salesTabs from '../components/tabs/sales.vue';
import mainTabs from '../components/tabs/main.vue';
import shopsTabs from '../components/tabs/shops.vue';

import shopsListGrids from '../components/shops/list/grids.vue';
import shopsListMap from '../components/shops/list/map.vue';
// const client = createClient();
export default {
  head: {
    title: 'Главная страница'
  },
  async asyncData({ app }) {
    let data = {
      sales: [],
      shops: []
    };
    data.sales = await app.$axios.$get(process.env.BACKEND_URL + 'sales');
    data.shops = await app.$axios.$get(process.env.BACKEND_URL + 'shops');

    return data;
  },
  components: {
    navbar,
    salesListGrids,
    shopsListGrids,
    salesListRows,
    shopsListMap,
    mainTabs,
    salesTabs,
    shopsTabs
  },
  data() {
    return {
      mode: 'sales',
      type: 'grids'
    };
  },
  mounted() {
    // let vm = this;
  },
  methods: {
    switchMode(mode) {
      this.mode = mode;
      this.type = 'grids';
    },
    switchType(type) {
      this.type = type;
    }
  }
};
</script>

<style lang="sass" scoped>
.container
  margin-top: 25px
</style>