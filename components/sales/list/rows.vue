<template>
  <div
    v-if="sales.length > 0"
  >
    <table class="table is-fullwidth is-hoverable sales-table">
      <tbody>
        <sale
          v-for="sale in sales"
          :key="sale.id"
          :sale="sale"
        />
      </tbody>
    </table>
    <no-ssr>
      <mugen-scroll
        :handler="loadMoreSales"
        :should-handle="!loading"
      />
    </no-ssr>
  </div>
  <div v-else>
    <div class="content">
      <h3 class="has-text-centered">{{ absence_text }}</h3>
    </div>
  </div>
</template>
<script>
import sale from '../row-sale.vue';
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
    'absenceText': {
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
<style lang="sass" scoped>
.sales-table
  max-width: 1152px
  margin: 0 auto
</style>