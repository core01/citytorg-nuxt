<template>
  <div class="overflow-x">
    <table
      v-if="sales.length > 0"
      class="table is-narrow is-fullwidth is-hoverable sales-table"
    >
      <tbody>
        <sale
          v-for="sale in sales"
          :key="sale.id"
          :sale="sale"
        />
      </tbody>
    </table>
    <div v-else>
      <div class="content">
        <h3 class="has-text-centered">{{ absence_text }}</h3>
      </div>
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
      required: true
    },
    'absenceText': {
      type: String,
      required: false,
      default: 'Нет действующих акций на данный момент'
    }
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {},
  methods: {
    async loadMoreSales(){
      this.loading = true;
      this.$store.commit('SHOW_SPINNER', true);
      await this.$store.dispatch('getMoreSales');
      this.loading = false;
      this.$store.commit('SHOW_SPINNER', false);
    }
  }
};
</script>
<style lang="sass" scoped>
  .sales-table
    max-width: 1152px
    margin: 0 auto
</style>