<template>

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { VNode } from "vue";

@Component
export default class OnClickOutside extends Vue {
  $slots: { [key: string]: VNode[] };

  @Prop({ type: Function, required: true }) do;
  mounted() {
    const listener = e => {
      if (e.target !== this.$el && !this.$el.contains(e.target)) {
        this.do();
      }
    };
    document.addEventListener("click", listener);
    this.$once("hook:destroyed", () => {
      document.removeEventListener("click", listener);
    });
  }
  render() {
    return this.$slots.default[0];
  }
}
</script>
