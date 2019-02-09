<template>
  <ul class="list-reset flex">
    <li>
      <button
        :class="activeClass"
        class="inline-block border border-r-0 py-2 px-3 rounded-tl rounded-bl cursor-pointer"
        @click.prevent="switchType('active')"
      >Действующие</button>
    </li>
    <li>
      <button
        :class="futureClass"
        class="inline-block border border-l-0 py-2 px-3 rounded-tr rounded-br cursor-pointer"
        @click.prevent="switchType('future')"
      >Ожидаемые</button>
    </li>
  </ul>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class SalesTypeTab extends Vue {
  @Prop({ default: "active" }) type: string;

  active: string = "border-blue-matisse bg-blue-matisse text-white";
  inActive: string = "hover:border-blue-matisse border-grey";

  get activeClass() {
    return this.type === "active" ? this.active : this.inActive;
  }
  get futureClass() {
    return this.type === "future" ? this.active : this.inActive;
  }

  switchType(type) {
    this.$emit("switch-type", type);
  }
}
</script>