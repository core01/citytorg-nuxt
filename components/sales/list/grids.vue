<template>
  <div class="flex flex-wrap">
    <div
      v-for="sale in sales"
      :key="sale.id"
      class="w-1/2 sm:w-1/3 lg:w-1/5"
    >
      <sale :sale="sale" />
    </div>
    <no-ssr>
      <mugen-scroll
        :handler="loadMoreSales"
        :should-handle="!loading"
      />
    </no-ssr>
    <div v-if="sales.length === 0">
      <div class="content">
        <h3 class="has-text-centered">{{ absenceText }}</h3>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import sale from "../grid-sale.vue";
import MugenScroll from "vue-mugen-scroll";
import Sale from "types/Sale";
@Component({
  components: {
    sale,
    MugenScroll
  }
})
export default class GridsList extends Vue {
  @Prop({ type: Array, required: true }) sales: Sale[];
  @Prop({
    type: String,
    required: false,
    default: "Нет действующих акций на данный момент"
  })
  absenceText: string;
  @Prop({ type: Boolean, required: true }) loading: boolean;

  loadMoreSales() {
    this.$emit("get-more-sales");
  }
}
</script>