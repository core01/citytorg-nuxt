<template>
  <div class="container mx-auto">
    <div class="my-32">
      <div v-if="error.statusCode === 404">
        <h2 class="text-center">К сожалению, такой страницы нет! Возможно её никогда и не было...</h2>
      </div>
      <div
        v-else
        class="text-center"
      >
        <h1>Упс! Ошибочка вышла!</h1>
        <h2
          v-if="error.message === 'Network Error'"
          class="text-grey-darker"
        >Проверьте соединение с сетью</h2>
        <h2
          v-else
          class="text-grey-darker"
        >Попробуйте повторить запрос позже!</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop } from "vue-property-decorator";
export default class Error extends Vue {
  @Prop(Object) error;
}
</script>