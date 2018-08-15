<template>
  <tr>
    <td class="v-middle">
      <nuxt-link :to="{ path: path }">
        <img
          v-if="sale.images"
          v-lazyload
          :data-src="UPLOADS_URL + sale.images[0]['140x160']"
          :alt="sale.title"
          src="~assets/images/placeholder.png"
          class="row-sale__img imageFade"
        >
        <img
          v-else
          v-lazyload
          :alt="sale.title"
          :data-src="'https://placehold.jp/140x160.png?text=' + sale.title"
          src="~assets/images/placeholder.png"
          class="row-sale__img imageFade"
        >
      </nuxt-link>
    </td>
    <td class="v-middle">
      <div class="row-sale-head">
        <nuxt-link
          :to="{ path: path }"
          class="row-sale-head__title"
        >
          {{ sale.title }}
        </nuxt-link>
        <sale-type :sale="sale" />
      </div>
    </td>
    <td class="prices-td v-middle">
      <div class="row-sale__prices">
        <span
          v-if="oldPrice"
          class="row-sale__old-price"
        >
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
    price() {
      return this.sale.price + ' ₸';
    },
    oldPrice() {
      if (this.sale.old_price) {
        return this.sale.old_price + ' ₸';
      }
      return false;
    },
    UPLOADS_URL(){
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
.row-sale__img
  max-height: 4em

.row-sale__price
  color: $blue
  font-weight: bold
  font-size: 28px
  width: 50%
  word-wrap: normal
  white-space: nowrap

.row-sale__old-price
  color: $red
  font-weight: bold
  font-size: 22px
  text-decoration: line-through
  width: 50%
  word-wrap: normal
  white-space: nowrap

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
  min-width: 20%
.v-middle
  vertical-align: middle
.table.is-narrow td
  padding: 0
</style>