<template>
  <l-map
    ref="map"
    :zoom="zoom"
    :center="center"
    :max-zoom="maxZoom"
    :min-zoom="minZoom"
    :options="{ scrollWheelZoom:false }"
    class="map_shop-map"
  >
    <l-tile-layer
      :url="url"
      :attribution="attribution"
    />
    <map-marker
      v-for="shop in filteredShops"
      :key="shop.id"
      :shop="shop"
      :is-current="currentId === shop.id"
      :default-icon="defaultIcon"
      :selected-icon="selectedIcon"
      :inactive-icon="inactiveIcon"
    />
  </l-map>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "vue2-leaflet";

import mapMarker from "../../map/marker.vue";
import { Shop } from "types/Shop";
import { LatLngTuple, FitBoundsOptions } from "leaflet";

@Component({
  components: {
    "l-map": LMap,
    "l-tile-layer": LTileLayer,
    mapMarker
  }
})
export default class Map extends Vue {
  @Prop({ type: Array, required: true }) shops: Shop[];
  @Prop({ type: Number, default: 15 }) zoom: number;
  @Prop({ type: Number, default: -1 }) currentId: number;

  url: string = "/osm/?z={z}&x={x}&y={y}&s={s}";
  attribution: string =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  maxZoom: number = 18;
  minZoom: number = 11;
  $refs: {
    map: LMap;
  };
  selectedIcon = {
    // shadowUrl: require('~/assets/markers/marker-shadow.png'),
    // iconRetinaUrl: require('~/assets/markers/marker-icon-2x-red.png'),
    iconUrl: "~/assets/markers/marker-icon-red.png",
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -41]
  };
  defaultIcon = {
    // shadowUrl: require('~/assets/markers/marker-shadow.png'),
    // iconRetinaUrl: require('~/assets/markers/marker-icon-2x.png'),
    iconUrl: require("~/assets/markers/marker-icon.png"),
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -41]
  };
  inactiveIcon = {
    // shadowUrl: require('~/assets/markers/marker-shadow.png'),
    iconUrl: require("~/assets/markers/marker-icon-grey-inactive.png"),
    iconAnchor: [7, 22], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -22]
  };

  get markers() {
    const markers: LatLngTuple[] = [];

    for (let i = 0; i < this.filteredShops.length; i++) {
      if (this.shops[i].lat && this.shops[i].lon) {
        const lat = this.shops[i].lat;
        const lon = this.shops[i].lon;
        markers.push([lat, lon]);
      }
    }

    return markers;
  }
  get center() {
    if (this.currentId !== -1) {
      for (const shop of this.shops) {
        if (shop.id === this.currentId) {
          if (shop.lat && shop.lon) {
            return [shop.lat, shop.lon];
          }
        }
      }
    }

    return [
      this.$store.getters["cities/city"].lat,
      this.$store.getters["cities/city"].lon
    ];
  }
  get filteredShops() {
    return this.shops.filter(shop => shop.shopType.alias !== "network");
  }

  mounted() {
    const options: FitBoundsOptions = {
      padding: [50, 50],
      maxZoom: 18
    };
    if (this.currentId === -1 && this.markers.length === 1) {
      options.maxZoom = 16;
    }
    if (this.currentId === -1 && this.markers.length > 0) {
      this.$refs.map.mapObject.fitBounds(this.markers, options);
    }
  }
}
</script>
<style lang="postcss" scoped>
.map_shop-map {
  z-index: 10;
  height: 450px;
}
</style>