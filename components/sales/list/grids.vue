<template>
  <div class="flex flex-wrap">
    <div
      v-for="sale in sales"
      :key="sale.id"
      class="w-full sm:w-1/3 lg:w-1/5"
    >
      <sale :sale="sale"/>
    </div>
    <no-ssr>
      <mugen-scroll
        :handler="loadMoreSales"
        :should-handle="loading"
        :threshold="0.3"
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

    };
  },
  computed: {
    loading() {
      return !this.$store.state.spinner.show;
    },
  },
  methods: {
    loadMoreSales() {
      this.$emit('get-more-sales');
    },
  },
};
</script>