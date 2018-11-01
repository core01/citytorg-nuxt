<template>
  <div class="container mx-auto">
    <div class="my-32">
      <div v-if="error.statusCode === 404">
        <h2 class="text-center">К сожалению, такой страницы нет! Возможно её никогда и не было...</h2>
      </div>
      <div
        v-else
        class="text-center">
        <h1 >Упс! Ошибочка вышла!</h1>
        <h2 class="text-grey-darker">Попробуйте повторить запрос позже!</h2>
      </div>
      <div>
        {{ error.statusCode }} {{ error.message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    }
  },
};
</script>