<template>
  <div class="columns is-multiline is-gapless">
    <div
      v-for="sale in sales"
      :key="sale.id"
      class="column is-12-mobile is-4-tablet is-one-fifth-desktop"
    >
      <sale :sale="sale"/>
    </div>
    <no-ssr>
      <mugen-scroll
        :handler="loadMoreSales"
        :should-handle="!loading"
      />
    </no-ssr>
    <div v-if="sales.length === 0">
      <div class="content">
        <h3 class="has-text-centered">{{ absenceText }}</h3>
      </div>
    </div>
  </div>
</template>
<script>
import sale from '../grid-sale.vue';
import MugenScroll from 'vue-mugen-scroll';

export default {
  components: {
    sale,
    MugenScroll,
  },
  props: {
    sales: {
      type: Array,
      required: true,
    },
    absenceText: {
      type: String,
      required: false,
      default: 'Нет действующих акций на данный момент',
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {},
  methods: {
    async loadMoreSales() {
      this.loading = true;
      this.$store.commit('spinner/SHOW_SPINNER', true);
      await this.$store.dispatch('sales/getMoreSales');
      this.loading = false;
      this.$store.commit('spinner/SHOW_SPINNER', false);
    },
  },
};
</script>