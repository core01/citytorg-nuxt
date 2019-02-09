<template>
  <div class="grid-sale is-shady is-scale my-2 bg-white p-2 text-center flex flex-col">
    <div class="mb-2">
      <sale-class
        :sale="sale"
        :grid="true"
      />
    </div>
    <nuxt-link :to="{ name: 'city-sales-alias', params: { city: city.alias, alias: sale.id + '-' + sale.alias }}">
      <div class="grid-sale__img-container">
        <img
          v-lazyload
          v-if="sale.images"
          :data-src="'/' + sale.images[0].small"
          :alt="sale.title"
          src="~assets/images/placeholder.png"
          class="h-full my-0 mx-auto"
        >
        <img
          v-else
          :alt="sale.title"
          src="~assets/images/placeholder.png"
          class="h-full  my-0 mx-auto"
        >
      </div>
    </nuxt-link>
    <nuxt-link
      :to="{ name: 'city-sales-alias', params: { city: city.alias, alias: sale.id + '-' + sale.alias }}"
      class="grid-sale__title no-underline h-10 leading-tight text-center text-blue-matisse mt-2 hover:text-red-akcion"
    >
      {{ sale.title | truncate(38) }}
    </nuxt-link>

    <div class="grid-sale-prices mb-1">
      <div class="grid-sale__price font-bold text-xl sm:text-2xl text-red-akcion">
        {{ sale.price }} ₸
      </div>
      <div
        v-if="sale.old_price"
        class="grid-sale__old-price font-bold text-base sm:text-xl line-through  text-blue-matisse"
      >
        {{ sale.old_price }} ₸
      </div>
    </div>
    <p
      v-if="sale.future"
      class="mb-1 font-semibold"
    >Начало с {{ sale.date_start | dateFormat }}</p>
    <p
      v-else
      class="mb-1 font-semibold"
    >До {{ sale.date_end | dateFormat }}</p>
    <nuxt-link
      v-if="sale.category"
      :to="{ name: 'categories-alias', params: { alias: sale.category.id + '-' + sale.category.alias }}"
      class="self-center my-1 bg-transparent text-grey-darker text-xs py-1 px-2 border border-grey rounded no-underline hover:bg-grey-lighter"
    >
      {{ sale.category.title }}
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import saleClass from "../sales/class.vue";
import { mapGetters } from "vuex";
import Sale from "types/Sale";
@Component({
  components: {
    saleClass
  },
  computed: {
    ...mapGetters({
      city: "cities/city"
    })
  }
})
export default class GridSale extends Vue {
  @Prop({ type: Object, required: true }) sale: Sale;
}
</script>

<style lang="postcss" scoped>
.grid-sale__img-container {
  height: 110px;
}

@media (min-width: 384px) {
  .grid-sale__img-container {
    height: 160px;
  }
}

.grid-sale {
  height: 370px;
}

.grid-sale__title {
  margin-top: 5px;
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