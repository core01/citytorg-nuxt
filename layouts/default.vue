<template>
  <div>
    <nuxt/>
    <spinner/>
    <footerComponent/>
  </div>
</template>
<script>
import spinner from '../components/spinner.vue';
import footerComponent from '../components/footer.vue';

export default {
  components: {
    spinner,
    footerComponent,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>