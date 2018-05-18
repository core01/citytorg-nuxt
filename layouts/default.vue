<template>
  <div>
    <nuxt v-if="showSpinner === false"/>
    <spinner/>
  </div>
</template>
<style>
</style>
<script>
import spinner from '../components/spinner.vue'
export default {
  components: {
    spinner
  },
  data(){
    return {}
  },
  computed: {
    showSpinner(){
      return this.$store.state.spinner.show
    }
  }
}
</script>
