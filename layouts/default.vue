<template>
  <div>
    <nuxt/>
    <spinner/>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            © <strong>Citytorg.kz</strong> - Торговая сеть акционных продаж.
          </p>
          <p>Разработано по заказу <a
            href="https://www.cityinfo.kz"
            target="_blank">Cityinfo.kz</a></p>
        </div>
      </div>
    </footer>
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

  }
}
</script>
