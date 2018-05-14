<template>
  <div class="overflow-x">
    <table class="table is-narrow is-fullwidth is-hoverable sales-table">
      <tbody>
        <sale
          v-for="sale in sales"
          :sale="sale"
          :key="sale.sys.id"/>
      </tbody>
    </table>
  </div>
</template>
<script>
import sale from '../row-sale.vue'
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
<style lang="sass" scoped>
  .sales-table
    max-width: 1152px
    margin: 0 auto
</style>
