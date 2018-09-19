<template>
  <section
    id="main"
  >
    <div class="container mx-auto my-6">
      <div class="flex lg:flex-row flex-col lg:items-stretch items-center justify-between">
        <div class="flex mb-3">
          <main-tabs
            :mode="mode"
            @switch-mode="switchMode"
          />
        </div>
        <div class="flex lg:justify-end justify-start mb-3">
          <sales-tabs
            v-if="mode === 'sales'"
            :type="type"
            @switch-type="switchType"
          />
          <shops-tabs
            v-else
            :type="type"
            @switch-type="switchType"
          />
        </div>
      </div>
    </div>
    <div class="container mx-auto">
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
    if (process.browser && store.state.pages.previous !== 'city-sales-alias') {
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
    return {};
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

<style lang="postcss" scoped>
</style>