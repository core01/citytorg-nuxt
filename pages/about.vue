<template>
  <div>
    <section class="hero is-default is-bold">
      <div class="hero-head">
        <navbar/>
      </div>
    </section>
    <section class="hero is-fullheight">
      <div class="container">
        <div class="content">
          <h2 class="has-text-centered content_h2">О проекте</h2>
          <h4>Проект</h4>
          <p>
            <b>Citytorg</b> - Торговая сеть акционных продаж
          </p>
          <h4>Типы акции</h4>
          <p>
            <b>Акцион</b> - Продажа товаров и услуг на основе особого ценового предложения. <br>
            <b>1+1</b> - При покупке одного товара, второй бесплатно <br>
            <b>2=3</b> - При покупке двух товаров, третий товар бесплатно <br>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import navbar from '../components/navbar/navbar.vue'
export default {
  head: {
    title: 'О нас'
  },
  components: {
    navbar
  }
}
</script>

<style lang="sass" scoped>
.content
  font-size: 18px
.about-li
  list-style: none
</style>
