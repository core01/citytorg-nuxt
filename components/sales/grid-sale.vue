<template>
  <div class="grid-sale is-shady is-scale my-2">
    <div class="mb-2">
      <sale-class
        :sale="sale"
        :grid="true" />
    </div>
    <nuxt-link :to="{ name: 'city-sales-alias', params: { city: city.alias, alias: sale.id + '-' + sale.alias }}">
      <div class="grid-sale__img-container h-48">
        <img
          v-lazyload
          v-if="sale.images"
          :data-src="'/' + sale.images[0].small"
          :alt="sale.title"
          src="~assets/images/placeholder.png"
          class="h-full my-0 mx-auto">
        <img
          v-else
          :alt="sale.title"
          src="~assets/images/placeholder.png"
          class="h-full  my-0 mx-auto">
      </div>
    </nuxt-link>
    <nuxt-link
      :to="{ name: 'city-sales-alias', params: { city: city.alias, alias: sale.id + '-' + sale.alias }}"
      class="grid-sale__title no-underline h-10">
      {{ sale.title | truncate(38) }}
    </nuxt-link>

    <div class="grid-sale-prices mb-1">
      <div class="grid-sale__price">
        {{ sale.price }} ₸
      </div>
      <div
        v-if="sale.old_price"
        class="grid-sale__old-price">
        {{ sale.old_price }} ₸
      </div>
    </div>
    <p
      v-if="sale.future"
      class="mb-1 font-semibold">Начало с {{ sale.date_start | dateFormat }}</p>
    <p
      v-else
      class="mb-1 font-semibold">До {{ sale.date_end | dateFormat }}</p>
    <nuxt-link
      v-if="sale.category"
      :to="{ name: 'categories-alias', params: { alias: sale.category.id + '-' + sale.category.alias }}"
      class="self-center my-1 bg-transparent text-grey-darker text-xs py-1 px-2 border border-grey rounded no-underline hover:bg-grey-lighter">
      {{ sale.category.title }}
    </nuxt-link>
  </div>
</template>
<script>
import saleClass from '../sales/class.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    saleClass
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
    ...mapGetters({
      city: 'cities/city'
    }),
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="postcss" scoped>
$blue: #204b98;
$red: #e31e24;

.grid-sale__img-container {

}

.grid-sale {
  background-color: #fff;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.grid-sale__title {
  color: $blue;
  font-size: 16px;
  line-height: 1.2;
  text-align: center;
  margin-top: 5px;
}

.grid-sale__title:hover {
  color: $red;
}

.grid-sale__description {
  color: #949494;
  line-height: 1.25;
  font-size: 1rem;
}

.grid-sale__price {
  color: $blue;
  font-weight: bold;
  font-size: 28px;
}

.grid-sale__old-price {
  color: $red;
  font-weight: bold;
  font-size: 22px;
  text-decoration: line-through;
}

.grid-sale-prices {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  flex-grow: 1;
  white-space: nowrap;
}

.grid-sale-tags {
  margin: 0 auto !important;
}
</style>