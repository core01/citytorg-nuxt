<template>

  <div class="is-shady grid-shop">
    <nuxt-link :to="{ path: '/shops/' + shop.fields.alias }">
      <div class="grid-shop__img-container shop-image">
        <img
          v-if="shop.fields.photos"
          :src="shop.fields.photos[0].fields.file.url"
          :alt="shop.fields.title"
          class="grid-shop__img imageFade">
        <img
          v-else
          :alt="shop.fields.title"
          src="http://via.placeholder.com/350x250"
          class="grid-shop__img imageFade">
        <div class="shop-image__text">
          Образец
        </div>
      </div>
    </nuxt-link>
    <nuxt-link
      :to="{ path: '/shops/' + shop.fields.alias }"
      class="grid-shop__title">
      {{ shop.fields.title }}
    </nuxt-link>

    <div class="grid-shop__description">
      {{ shop.fields.description }}
    </div>
    <div class="grid-shop__address">
      {{ shop.fields.address }}
    </div>
  </div>

</template>
<script>
export default {
  components: {},
  props: {
    shop: {
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

.grid-shop
  max-width: 360px
  background-color: white
  overflow: hidden
  padding: 5px
  text-align: center
  display: flex
  flex-direction: column
  height: 360px
  margin-bottom: 20px

.grid-shop__title
  color: $blue
  font-size: 18px
  height: 45px
  line-height: 1.2
  text-align: center
  &:hover
    color: $red
    text-decoration: underline

.grid-shop__address
  display: flex
  align-items: flex-end
  flex-grow: 1
  align-self: center

.grid-shop__description
  color: #949494
  line-height: 1.25
  font-size: 1rem

.grid-shop__img
  width: 100%
  max-height: 200px

.grid-shop__img-container
  min-height: 205px
</style>
