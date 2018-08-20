<template>
  <div>
    <section class="hero is-default is-bold">
      <div class="hero-head">
        <navbar />
      </div>
    </section>
    <section
      id="main"
      class="is-fullheight"
    >
      <div class="container">
        <div class="columns zero-side-margin">
          <div class="column is-6-desktop">
            <main-tabs
              :mode="mode"
              @switch-mode="switchMode"
            />
          </div>
          <div class="column is-6-desktop">
            <sales-tabs
              v-if="mode === 'sales'"
              :div-class="'is-toggle is-right-desktop'"
              :type="type"
              @switch-type="switchType"
            />
            <shops-tabs
              v-else
              :div-class="'is-toggle is-right-desktop'"
              :type="type"
              @switch-type="switchType"
            />
          </div>
        </div>
      </div>
      <div class="container">
        <template v-if="mode === 'sales'">
          <sales-list-grids
            v-if="type === 'grids'"
            :sales="sales"
          />
          <sales-list-rows
            v-else
            :sales="sales"
          />
        </template>
        <template v-else>
          <shops-list-grids
            v-if="type === 'grids'"
            :shops="shops"
          />
          <shops-list-map
            v-else
            :shops="shops"
            :zoom="13"
          />
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import navbar from '../components/navbar/navbar.vue';
import salesListGrids from '../components/sales/list/grids.vue';
import salesListRows from '../components/sales/list/rows.vue';

import salesTabs from '../components/tabs/sales.vue';
import mainTabs from '../components/tabs/main.vue';
import shopsTabs from '../components/tabs/shops.vue';

import shopsListGrids from '../components/shops/list/grids.vue';
import shopsListMap from '../components/shops/list/map.vue';
import {mapGetters} from 'vuex';

export default {
  head: {
    title: 'Главная страница',
  },
  async asyncData({app, store, route}) {
    if(process.browser && store.state.pages.previous !== 'city-sales-alias'){
      await store.dispatch('sales/getSales');
    }
  },
  components: {
    navbar,
    salesListGrids,
    shopsListGrids,
    salesListRows,
    shopsListMap,
    mainTabs,
    salesTabs,
    shopsTabs,
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      shops: 'shops/shops',
      sales: 'sales/sales',
      mode: 'pages/indexMode',
      type: 'pages/indexType',
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
  },
};
</script>

<style lang="sass" scoped>
.container
  margin-top: 25px
</style>