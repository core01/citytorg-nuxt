<template>
  <ul class="list-reset flex">
    <li>
      <button
        :class="gridsClass"
        class="inline-block border border-r-0 py-2 px-3 rounded-tl rounded-bl cursor-pointer"
        @click.prevent="switchMode('grids')"
      >Плитками</button>
    </li>
    <li>
      <button
        :class="mapClass"
        class="inline-block border border-l-0 py-2 px-3 rounded-tr rounded-br cursor-pointer"
        @click.prevent="switchMode('map')"
      >На карте</button>
    </li>
  </ul>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ShopsTab extends Vue {
  @Prop({ default: "grids" }) mode!: string;

  activeClass: string = "border-blue-matisse bg-blue-matisse text-white";
  inActiveClass: string = "hover:border-blue-matisse border-grey";

  get gridsClass() {
    return this.mode === "grids" ? this.activeClass : this.inActiveClass;
  }
  get mapClass() {
    return this.mode === "map" ? this.activeClass : this.inActiveClass;
  }

  switchMode(mode) {
    this.$emit("switch-mode", mode);
  }
}
</script>