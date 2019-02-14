<template>
  <div class="container mx-auto">
    <div class="my-32">
      <div class="text-center">
        <h1>Упс! Ошибочка вышла!</h1>
        <h2 class="text-grey-darker">Попробуйте повторить запрос позже!</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop } from "vue-property-decorator";
import { ErrorParams } from "@nuxt/vue-app";
export default class ErrorLayout extends Vue {
  @Prop({ type: Object, required: true }) error: ErrorParams;

  mounted() {
    console.log(this.error);
  }
}
</script>