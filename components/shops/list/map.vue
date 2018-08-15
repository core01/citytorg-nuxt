<template>
  <l-map
    ref="map"
    :zoom="zoom"
    :center="center"
    :max-zoom="maxZoom"
    :min-zoom="minZoom"
    class="map_shop-map"
  >
    <l-tile-layer
      :url="url"
      :attribution="attribution"
    />
    <map-marker
      v-for="(shop,index) in filteredShops"
      :key="shop.id"
      :shop="shop"
      :is-current="currentIndex === index"
      :default-icon="defaultIcon"
      :selected-icon="selectedIcon"
      :inactive-icon="inactiveIcon"
    />
  </l-map>
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
import mapMarker from '../../map/marker.vue';
export default {
  components: {
    'l-map': Vue2Leaflet.LMap,
    'l-tile-layer': Vue2Leaflet.LTileLayer,
    mapMarker
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
      url: '/osm/?z={z}&x={x}&y={y}&s={s}',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      // marker: L.latLng(49.9553, 82.6134),
      maxZoom: 18,
      minZoom: 8,
      selectedIcon: L.icon({
        // shadowUrl: require('~/assets/markers/marker-shadow.png'),
        // iconRetinaUrl: require('~/assets/markers/marker-icon-2x-red.png'),
        iconUrl: require('~/assets/markers/marker-icon-red.png'),
        iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -41]
      }),
      defaultIcon: L.icon({
        // shadowUrl: require('~/assets/markers/marker-shadow.png'),
        // iconRetinaUrl: require('~/assets/markers/marker-icon-2x.png'),
        iconUrl: require('~/assets/markers/marker-icon.png'),
        iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -41]
      }),
      inactiveIcon: L.icon({
        // shadowUrl: require('~/assets/markers/marker-shadow.png'),
        iconUrl: require('~/assets/markers/marker-icon-grey-inactive.png'),
        iconAnchor: [7, 22], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -22]
      })
    };
  },
  computed: {
    markers() {
      let markers = [];
      for (let i = 0; i < this.filteredShops.length; i++) {
        if(this.shops[i].lat && this.shops[i].lon){
          markers.push([
            this.shops[i].lat,
            this.shops[i].lon
          ]);
        }
      }

      return markers;
    },
    center(){
      if(this.currentIndex !== -1){
        let currentShop = this.shops[this.currentIndex];
        if(currentShop.lat && currentShop.lon){
          return [currentShop.lat, currentShop.lon];
        }
      }

      return [this.$store.getters.city.lat, this.$store.getters.city.lon];
    },
    filteredShops(){
      return this.shops.filter(shop => shop.shopType.alias !== 'network');
    },
  },
  mounted() {
    if(this.currentIndex === -1 && this.markers.length > 0){
      this.$refs.map.mapObject.fitBounds(this.markers, {
        padding: [50, 50]
      });
    }
  },
};
</script>
<style lang="sass" scoped>
@import "../../../node_modules/leaflet/dist/leaflet.css";
.map_shop-map
  z-index: 10
  height: 70vh
</style>