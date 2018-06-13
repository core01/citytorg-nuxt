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
            <b>1+1</b> - Скидка при покупке комплекта из двух товаров <br>
            <b>1+1=3</b> - При покупке двух товаров, третий товар бесплатно <br>
          </p>
          <p>Скачать презентацию о проекте <a
            href="https://drive.google.com/open?id=1790q0rHlpHMOp7RoEl0bATOaORUgAAYw"
            target="_blank">Interagent-Citytorg.ppsx</a></p>
        </div>
        <div class="columns">
          <div class="column is-6">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/fSqy8cSkKwA?rel=0&amp;showinfo=0"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen/>
          </div>
          <div class="column is-6">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/mVvT-atiTLI?rel=0&amp;showinfo=0"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import navbar from '../components/navbar/navbar.vue';
export default {
  head: {
    title: 'О нас'
  },
  components: {
    navbar
  }
};
</script>

<style lang="sass" scoped>
.content
  font-size: 18px
.about-li
  list-style: none
</style>