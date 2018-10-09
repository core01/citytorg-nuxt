<template>

  <div class="is-shady grid-shop">
    <nuxt-link :to="{ path: path }">
      <div class="grid-shop__img-container shop-image">
        <img
          v-lazyload
          v-if="shop.images"
          :data-src="UPLOADS_URL + shop.images[0].small"
          :alt="shop.title"
          src="~assets/images/placeholder.png"
          class="grid-shop__img"
        >
        <img
          v-else
          :alt="shop.title"
          src="~assets/images/placeholder.png"
          class="grid-shop__img"
        >
        <div
          v-if="shop.sample"
          class="shop-image__text"
        >
          Образец
        </div>
      </div>
    </nuxt-link>
    <nuxt-link
      :to="{ path: path }"
      class="grid-shop__title no-underline"
    >
      {{ shop.title | truncate(38) }}
    </nuxt-link>
    <div class="grid-shop__address">
      {{ shop.address }}
    </div>
  </div>

</template>
<script>
import {mapGetters} from 'vuex';

export default {
  components: {},
  props: {
    shop: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      city: 'cities/city',
    }),
    UPLOADS_URL() {
      return process.env.UPLOADS_URL;
    },
    path() {
      return '/' + this.city.alias + '/shops/' + this.shop.id + '-' + this.shop.alias;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="postcss" scoped>
$blue: #204b98;
$red: #e31e24;

.grid-shop {
	background-color: #fff;
	overflow: hidden;
	padding: 5px;
	text-align: center;
	display: flex;
	flex-direction: column;
	height: 320px;
	margin-bottom: 20px;
}

.grid-shop__title {
	color: $blue;
	font-size: 18px;
	height: 45px;
	line-height: 1.2;
	text-align: center;
}

.grid-shop__title:hover {
	color: $red;
}

.grid-shop__address {
	display: flex;
	align-items: center;
	flex-grow: 1;
	align-self: center;
}

.grid-shop__img {
	width: 100%;
	max-height: 200px;
	object-fit: contain;
}

.grid-shop__img-container {
	min-height: 205px;
}
</style>