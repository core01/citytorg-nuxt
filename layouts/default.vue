<template>
  <div class="font-sans text-black leading-normal">
    <navbar />
    <div class="container mx-auto px-2">
      <div
        class="bg-red-lightest border border-red-light text-red-dark px-4 py-3 rounded relative"
        role="alert"
      >
        <strong class="font-bold">Демо-режим!</strong>
        <span class="block sm:inline"
          >Информация представлена на сайте исключительно для ознакомления и
          может не соответствовать действительности.</span
        >
      </div>
    </div>
    <nuxt />
    <spinner />
    <footerComponent />
  </div>
</template>
<script>
import spinner from '../components/spinner.vue';
import footerComponent from '../components/footer.vue';
import navbar from '../components/navbar/navbar.vue';
export default {
  components: {
    spinner,
    footerComponent,
    navbar,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>
