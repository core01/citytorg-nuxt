<template>
  <div class="grid-sale is-shady is-scale">
    <sale-type :sale="sale" />
    <nuxt-link :to="{ path: path }">
      <div class="grid-sale__img-container">
        <img
          v-if="sale.images"
          :src="UPLOADS_URL + sale.images[0]['450x320']"
          :alt="sale.title"
          class="grid-sale__img imageFade">
        <img
          v-else
          :alt="sale.title"
          :src="'https://placehold.jp/350x250.png?text=' + sale.title"
          class="grid-sale__img imageFade">
      </div>
    </nuxt-link>
    <nuxt-link
      :to="{ path: path }"
      class="grid-sale__title">
      {{ sale.title | truncate(45) }}
    </nuxt-link>
    <div class="grid-sale-prices">
      <div class="grid-sale__price">
        {{ sale.price }} ₸
      </div>
      <div
        v-if="sale.old_price"
        class="grid-sale__old-price">
        {{ sale.old_price }} ₸
      </div>
    </div>
  </div>
</template>
<script>
import saleType from '../sales/type.vue';
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
    return {};
  },
  computed: {
    UPLOADS_URL() {
      return process.env.UPLOADS_URL;
    },
    path(){
      return '/sales/' + this.sale.id + '-' + this.sale.alias;
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="sass" scoped>
@import ~assets/sass/variables
.grid-sale__img-container
  height: 155px
.grid-sale
  background-color: white
  padding: 10px
  text-align: center
  display: flex
  flex-direction: column
  height: 320px
  margin-bottom: 20px

.grid-sale__title
  color: $blue
  font-size: 18px
  height: 45px
  line-height: 1.2
  text-align: center
  margin-top: 5px
  &:hover
    color: $red
    text-decoration: underline

.grid-sale__description
  color: #949494
  line-height: 1.25
  font-size: 1rem

.grid-sale__price
  color: $blue
  font-weight: bold
  font-size: 28px

.grid-sale__old-price
  color: $red
  font-weight: bold
  font-size: 22px
  text-decoration: line-through

.grid-sale__img
  height: 100%
  margin: 0 auto

.grid-sale__button
  margin-top: auto

.grid-sale-prices
  display: flex
  justify-content: space-around
  align-items: flex-end
  flex-grow: 1
  white-space: nowrap

.grid-sale-tags
  margin: 0 auto !important
</style>