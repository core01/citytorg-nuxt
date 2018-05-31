<template>
  <no-ssr>
    <l-map
      ref="map"
      :zoom="zoom"
      :center="center"
      :max-zoom="maxZoom"
      :min-zoom="minZoom"
      class="map_shop-map">
      <l-tile-layer
        :url="url"
        :attribution="attribution"/>
      <map-shop
        v-for="(shop,index) in shops"
        :shop="shop"
        :key="shop.fields.id"
        :is-current="currentIndex === index"
        :default-icon="defaultIcon"
        :selected-icon="selectedIcon"
      />
    </l-map>
  </no-ssr>
</template>
<script>
let Vue2Leaflet = {};
let L = {
  icon: () => {}
};
if (process.browser) {
  Vue2Leaflet = require('vue2-leaflet');
  L = require('leaflet');
}
import mapShop from '../map-shop.vue';
export default {
  components: {
    'l-map': Vue2Leaflet.LMap,
    'l-tile-layer': Vue2Leaflet.LTileLayer,
    'l-marker': Vue2Leaflet.LMarker,
    mapShop
  },
  props: {
    shops: {
      type: Array,
      required: true
    },
    zoom: {
      type: Number,
      default: 13
    },
    currentIndex: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      center: [49.9553, 82.6134],
      url: '/osm/?z={z}&x={x}&y={y}&s={s}',
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      // marker: L.latLng(49.9553, 82.6134),
      maxZoom: 18,
      minZoom: 11,
      selectedIcon: L.icon({
        shadowUrl: require('~/assets/markers/marker-shadow.png'),
        // iconRetinaUrl: require('~/assets/markers/marker-icon-2x-red.png'),
        iconUrl: require('~/assets/markers/marker-icon-red.png'),
        iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -41]
      }),
      defaultIcon: L.icon({
        shadowUrl: require('~/assets/markers/marker-shadow.png'),
        // iconRetinaUrl: require('~/assets/markers/marker-icon-2x.png'),
        iconUrl: require('~/assets/markers/marker-icon.png'),
        iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -41]
      })
    };
  },
  computed: {
    markers() {
      let markers = [];
      for (let i = 0; i < this.shops.length; i++) {
        markers.push([
          this.shops[i].fields.coordinates.lat,
          this.shops[i].fields.coordinates.lon
        ]);
      }
      return markers;
    }
  },
  mounted() {
    // this.$refs.map.mapObject.fitBounds(this.markers, {
    //   padding: [50, 50]
    // })
  },
  methods: {}
};
</script>
<style lang="sass" scoped>
@import "../../../node_modules/leaflet/dist/leaflet.css";
.map_shop-map
  height: 70vh
</style>