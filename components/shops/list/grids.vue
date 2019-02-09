<template>
  <div class="flex flex-wrap">
    <div
      v-for="shop in shops"
      :key="shop.id"
      class="w-1/2 sm:w-1/3 lg:w-1/4"
    >
      <grid-shop :shop="shop" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import gridShop from "../grid-shop.vue";
import { Shop } from "types/Shop";

@Component({
  components: {
    gridShop
  }
})
export default class ListGrids extends Vue {
  @Prop({ type: Array, required: true }) shops: Shop[];
}
</script>