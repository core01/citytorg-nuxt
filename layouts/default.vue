<template>
  <div class="font-sans text-black leading-normal">
    <navbar />
    <nuxt />
    <spinner />
    <footerComponent />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import spinner from "../components/spinner.vue";
import footerComponent from "../components/footer.vue";
import navbar from "../components/navbar/navbar.vue";
@Component({
  components: {
    spinner,
    footerComponent,
    navbar
  }
})
export default class DefaultLayout extends Vue {}
</script>