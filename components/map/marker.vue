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
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { LPopup, LMarker, LIcon } from "vue2-leaflet";
import { Shop } from "types/Shop";

@Component({
  components: {
    "l-popup": LPopup,
    "l-marker": LMarker
  },
  computed: {
    ...mapGetters({
      city: "cities/city"
    })
  }
})
export default class MarkerMap extends Vue {
  @Prop({ type: Object, required: true }) shop: Shop;
  @Prop({ type: Boolean, default: false }) isCurrent: boolean;
  @Prop({ type: Object, required: true }) defaultIcon: LIcon;
  @Prop({ type: Object, required: true }) selectedIcon: LIcon;
  @Prop({ type: Object, required: true }) inactiveIcon: LIcon;

  get icon() {
    if (this.isCurrent) {
      return this.selectedIcon;
    }
    if (this.shop.shopType.priority === 0) {
      return this.inactiveIcon;
    }
    return this.defaultIcon;
  }

  openPopup(event) {
    const vm = this;
    if (this.isCurrent) {
      vm.$nextTick(() => {
        event.target.openPopup();
      });
    }
  }
}
</script>