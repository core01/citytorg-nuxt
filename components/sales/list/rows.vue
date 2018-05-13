<template>
  <table class="table is-narrow is-fullwidth is-hoverable">
    <tbody>
      <sale
        v-for="sale in sales"
        :sale="sale"
        :key="sale.sys.id"/>
    </tbody>
  </table>
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
.column
  min-width: 350px
</style>
