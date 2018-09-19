<template>
  <tr>
    <td class="align-middle hidden lg:block border-b border-grey">
      <nuxt-link :to="{ path: path }">
        <img
          v-lazyload
          v-if="sale.images"
          :data-src="UPLOADS_URL + sale.images[0].small"
          :alt="sale.title"
          src="~assets/images/placeholder.png"
          class="row-sale__img"
        >
        <img
          v-lazyload
          v-else
          :alt="sale.title"
          :data-src="'https://placehold.jp/140x160.png?text=' + sale.title"
          src="~assets/images/placeholder.png"
          class="row-sale__img"
        >
      </nuxt-link>
    </td>
    <td class="align-middle title-td border-b border-grey">
      <div class="row-sale-head text-sm lg:text-base">
        <nuxt-link
          :to="{ path: path }"
          class="row-sale-head__title no-underline"
        >
          {{ sale.title }}
        </nuxt-link>
        <div class="hidden lg:block">
          <sale-type
            :sale="sale"
          />
        </div>
      </div>
    </td>
    <td class="prices-td align-middle border-b border-grey">
      <div class="row-sale__prices">
        <span
          v-if="oldPrice"
          class="row-sale__old-price hidden lg:block"
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
import {mapGetters} from 'vuex';

export default {
  components: {
    saleType,
  },
  props: {
    sale: {
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
    price() {
      return this.sale.price + ' ₸';
    },
    oldPrice() {
      if (this.sale.old_price) {
        return this.sale.old_price + ' ₸';
      }
      return false;
    },
    UPLOADS_URL() {
      return process.env.UPLOADS_URL;
    },
    path() {
      return '/' + this.city.alias + '/sales/' + this.sale.id + '-' + this.sale.alias;
    },
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="postcss" scoped>
$blue: #204b98;
$red: #e31e24;

.row-sale__img {
  max-height: 4em;
}

.row-sale__price {
  color: $blue;
  font-weight: bold;
  font-size: 28px;
  width: 50%;
  word-wrap: normal;
  white-space: nowrap;
}

.row-sale__old-price {
  color: $red;
  font-weight: bold;
  font-size: 22px;
  text-decoration: line-through;
  width: 50%;
  word-wrap: normal;
  white-space: nowrap;
}

.row-sale__prices {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.row-sale-head {
  display: flex;
  flex-direction: row;
  padding-bottom: 5px;
}

.row-sale-head__tags {
  margin-left: 20px;
}

.row-sale-head__title {
  font-size: 18px;
  margin-right: 10px;
}
</style>