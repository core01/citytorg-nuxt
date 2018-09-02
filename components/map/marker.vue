<template>
  <l-marker
    :lat-lng="[shop.lat, shop.lon]"
    :icon="icon"
    @add="openPopup"
  >
    <l-popup :options="{ autoClose: false }">
      <p>
        <b>{{ shop.title }}</b>
      </p>
      <p>
        <b>Адрес:</b> {{ shop.address }}
      </p>
      <nuxt-link
        v-if="!isCurrent"
        :to="{ path: '/' + city.alias + '/shops/' + shop.id + '-' + shop.alias }"
      >
        Перейти в магазин
      </nuxt-link>
    </l-popup>
  </l-marker>
</template>
<script>
import {mapGetters} from 'vuex';

let Vue2Leaflet = {};

if (process.browser) {
  Vue2Leaflet = require('vue2-leaflet');
}
export default {
  components: {
    'l-popup': Vue2Leaflet.LPopup,
    'l-marker': Vue2Leaflet.LMarker,
  },
  props: {
    shop: {
      type: Object,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    defaultIcon: {
      type: Object,
      required: true,
    },
    selectedIcon: {
      type: Object,
      required: true,
    },
    inactiveIcon: {
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
    icon() {
      if (this.isCurrent) {
        return this.selectedIcon;
      }
      if (this.shop.shopType.priority === 0) {
        return this.inactiveIcon;
      }
      return this.defaultIcon;
    },
  },
  mounted() {},
  methods: {
    openPopup(event) {
      let vm = this;
      if (this.isCurrent) {
        vm.$nextTick(() => {
          event.target.openPopup();
        });
      }
    },
  },
};
</script>