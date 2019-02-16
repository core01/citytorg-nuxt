<template>
  <div
    class="is-shady grid-shop my-2 bg-white overflow-hidden text-center flex flex-col p-1"
  >
    <nuxt-link :to="{ path: path }">
      <div class="grid-shop__img-container relative">
        <img
          v-if="shop.images"
          v-lazyload
          :data-src="'/' + shop.images[0].small"
          :alt="shop.title"
          src="~assets/images/placeholder.png"
          class="grid-shop__img h-full my-0 mx-auto"
        />
        <img
          v-else
          :alt="shop.title"
          src="~assets/images/placeholder.png"
          class="grid-shop__img h-full my-0 mx-auto"
        />
        <div v-if="shop.sample" class="shop-image__text">
          Образец
        </div>
      </div>
    </nuxt-link>
    <nuxt-link
      :to="{ path: path }"
      class="text-blue-matisse leading-tight text-center text-base sm:text-xl no-underline hover:text-red-akcion"
    >
      {{ shop.title | truncate(38) }}
    </nuxt-link>
    <div class="flex items-center flex-grow self-center leading-none">
      {{ shop.address }}
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

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
    path() {
      return (
        '/' + this.city.alias + '/shops/' + this.shop.id + '-' + this.shop.alias
      );
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="postcss" scoped>
.grid-shop {
  height: 245px;
}

@media (min-width: 360px) {
  .grid-shop {
    height: 320px;
  }
}

.grid-shop__img {
  object-fit: contain;
}

.grid-shop__img-container {
  height: 120px;
}

@media (min-width: 360px) {
  .grid-shop__img-container {
    height: 205px;
  }
}
</style>
