<template>
  <div class="font-sans text-black leading-normal">
    <navbar />
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
