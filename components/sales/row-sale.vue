<template>
  <tr>
    <td>
      <nuxt-link :to="{ path: '/sales/' + sale.fields.alias }">
        <img
          v-if="sale.fields.photos"
          :src="sale.fields.photos[0].fields.file.url"
          :alt="sale.fields.title"
          class="row-sale__img imageFade" >
        <img
          v-else
          :alt="sale.fields.title"
          src="http://via.placeholder.com/350x250"
          class="row-sale__img imageFade" >
      </nuxt-link>
    </td>
    <td>
      <div class="row-sale-head">
        <nuxt-link
          :to="{ path: '/sales/' + sale.fields.alias }"
          class="row-sale-head__title">
          {{ sale.fields.title }}
        </nuxt-link>
        <sale-type :types="sale.fields.type"/>
      </div>
      <p class="row-sale__description is-hidden-mobile">
        {{ sale.fields.description | truncate(205) }}
      </p>
    </td>
    <td class="prices-td">
      <div class="row-sale__prices">
        <span
          v-if="oldPrice"
          class="row-sale__old-price">
          {{ oldPrice }}
        </span>
        <span class="row-sale__price">
          {{ price }}
        </span>
      </div>
    </td>
  </tr>
</template>
<script>
import saleType from '../sales/type.vue'
export default {
  components: {
    saleType
  },
  props: {
    sale: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    price() {
      return this.sale.fields.price + ' ₸'
    },
    oldPrice() {
      if (this.sale.fields.old_price) {
        return this.sale.fields.old_price + ' ₸'
      }
      return false
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="sass" scoped>
.row-sale__img
  max-width: 100px

.row-sale__price
  color: red
  font-weight: bold
  font-size: 28px
  width: 50%

.row-sale__old-price
  color: #f60
  font-weight: bold
  font-size: 22px
  text-decoration: line-through
  width: 50%

.row-sale__prices
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-around

.row-sale-head
  display: flex
  flex-direction: row
  padding-bottom: 5px

.row-sale-head__tags
  margin-left: 20px
.row-sale-head__title
  font-size: 18px
  margin-right: 10px

.prices-td
  vertical-align: middle
  min-width: 15%
</style>
