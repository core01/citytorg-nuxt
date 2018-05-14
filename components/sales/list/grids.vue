<template>
  <div class="container sales-container">
    <div
      v-if="sales.length > 0"
      class="columns is-multiline is-gapless">
      <div
        v-for="sale in sales"
        :key="sale.sys.id"
        class="column is-12-mobile is-4-tablet is-2-desktop is-2-fullhd">
        <sale :sale="sale"/>
      </div>
    </div>
    <div v-else>
      <div class="content">
        <h3 class="has-text-centered">{{ absence-text }} </h3>
      </div>
    </div>
  </div>
</template>
<script>
import sale from '../grid-sale.vue'
export default {
  components: {
    sale
  },
  props: {
    sales: {
      type: Array,
      required: true
    },
    'absence-text': {
      type: String,
      required: false,
      default: 'Нет действующих акций на данный момент'
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
