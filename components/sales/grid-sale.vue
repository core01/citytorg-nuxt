<template>
  <div class="grid-sale is-shady">
    <sale-type :types="sale.fields.type"/>
    <nuxt-link
      :to="{ path: '/sales/' + sale.fields.alias }">
      <img
        v-if="sale.fields.photos"
        :src="sale.fields.photos[0].fields.file.url"
        :alt="sale.fields.title"
        class="grid-sale__img imageFade" >
      <img
        v-else
        :alt="sale.fields.title"
        src="http://via.placeholder.com/350x250"
        class="grid-sale__img imageFade" >
    </nuxt-link>
    <nuxt-link
      :to="{ path: '/sales/' + sale.fields.alias }"
      class="grid-sale__title">
      {{ sale.fields.title | truncate(45) }}
    </nuxt-link>
    <p class="grid-sale__description has-text-justified is-hidden-mobile">
      {{ sale.fields.description | truncate(100) }}
    </p>
    <div class="grid-sale-prices">
      <div class="grid-sale__price">
        {{ sale.fields.price }} ₸
      </div>
      <div
        v-if="sale.fields.old_price"
        class="grid-sale__old-price">
        {{ sale.fields.old_price }} ₸
      </div>
    </div>
  </div>
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
  mounted() {},
  methods: {}
}
</script>

<style lang="sass" scoped>
@import ~assets/sass/variables

.grid-sale
  max-width: 420px
  background-color: white
  padding: 10px
  text-align: center
  display: flex
  flex-direction: column
  height: 420px
  margin-bottom: 20px

.grid-sale__title
  color: $blue
  font-size: 18px
  height: 45px
  line-height: 1.2
  text-align: center
  &:hover
    color: $red
    text-decoration: underline

.grid-sale__description
  color: #949494
  line-height: 1.25
  font-size: 1rem

.grid-sale__price
  color: $red
  font-weight: bold
  font-size: 28px

.grid-sale__old-price
  color: #f60
  font-weight: bold
  font-size: 22px
  text-decoration: line-through

.grid-sale__img
  max-width: 200px
  margin: 0 auto

.grid-sale__button
  margin-top: auto

.grid-sale-prices
  display: flex
  justify-content: space-around
  align-items: flex-end
  flex-grow: 1

.grid-sale-tags
  margin: 0 auto !important
</style>
