<template>

  <div class="is-shady grid-shop">
    <nuxt-link :to="{ path: path }">
      <div class="grid-shop__img-container shop-image">
        <img
          v-if="shop.images"
          :src="UPLOADS_URL + shop.images[0]['450x320']"
          :alt="shop.title"
          class="grid-shop__img imageFade">
        <img
          v-else
          :alt="shop.title"
          src="https://via.placeholder.com/350x250"
          class="grid-shop__img imageFade">
        <div class="shop-image__text">
          Образец
        </div>
      </div>
    </nuxt-link>
    <nuxt-link
      :to="{ path: path }"
      class="grid-shop__title">
      {{ shop.title }}
    </nuxt-link>

    <div class="grid-shop__description">
      {{ shop.description }}
    </div>
    <div class="grid-shop__address">
      {{ shop.address }}
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
    return {};
  },
  computed: {
    UPLOADS_URL() {
      return process.env.UPLOADS_URL;
    },
    path(){
      return '/shops/' + this.shop.id + '-' + this.shop.alias;
    }
  },
  mounted() {},
  methods: {}
};
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
  object-fit: contain

.grid-shop__img-container
  min-height: 205px
</style>