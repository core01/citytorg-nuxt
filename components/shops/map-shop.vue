<template>
  <l-marker
    :lat-lng="[shop.fields.coordinates.lat, shop.fields.coordinates.lon]"
    :icon="icon"
    @add="openPopup"
  >
    <l-popup :options="{ autoClose: false }">
      <p><b>{{ shop.fields.title }}</b></p>
      <p><b>Адрес:</b> {{ shop.fields.address }}</p>
      <nuxt-link
        v-if="!isCurrent"
        :to="{ path: '/shops/' + shop.fields.alias }">
        Перейти в магазин</nuxt-link>
    </l-popup>
  </l-marker>
</template>
<script>
let Vue2Leaflet = {}

if (process.browser) {
  Vue2Leaflet = require('vue2-leaflet')
}
export default {
  components: {
    'l-popup': Vue2Leaflet.LPopup,
    'l-marker': Vue2Leaflet.LMarker
  },
  props: {
    shop: {
      type: Object,
      required: true
    },
    isCurrent: {
      type: Boolean,
      default: false
    },
    defaultIcon: {
      type: Object,
      required: true
    },
    selectedIcon: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    icon() {
      if (this.isCurrent) {
        return this.selectedIcon
      }
      return this.defaultIcon
    }
  },
  mounted() {},
  methods: {
    openPopup(event) {
      let vm = this
      if (this.isCurrent) {
        vm.$nextTick(() => {
          event.target.openPopup()
        })
      }
    }
  }
}
</script>
