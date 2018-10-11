<template>
  <div
    v-if="sales.length > 0"
  >
    <table
      class="table w-full">
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
    MugenScroll
  },
  props: {
    sales: {
      type: Array,
      required: true
    },
    absenceText: {
      type: String,
      required: false,
      default: 'Нет действующих акций на данный момент'
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {

  },
  methods: {
    loadMoreSales() {
      this.$emit('get-more-sales');
    },
  },
};
</script>
<style lang="postcss" scoped>
</style>