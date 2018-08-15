<template>
  <div>
    <section class="hero is-default is-bold">
      <div class="hero-head">
        <navbar />
      </div>
    </section>
    <section class="hero is-fullheight">
      <div class="container">
        <div class="content">
          <h2 class="has-text-centered content_h2">О проекте</h2>
          <p>
            <b>Citytorg</b> - Торговая сеть акционных продаж
          </p>
          <p>Скачать презентацию о проекте -
            <a
              href="https://drive.google.com/open?id=1yYpBjYPMPaa4XXF-HwTUvhT69XNW6fZz"
              target="_blank"
            >pdf</a>,
            <a
              href="https://drive.google.com/open?id=1mNPQtGaO2O8DfiXiOUfiD_Ajyqk43A1L"
              target="_blank"
          >ppsx</a></p>
        </div>
        <div class="columns">
          <div class="column is-6">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/U1-HPsHxvgg?rel=0&amp;showinfo=0"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
            />
          </div>
          <div class="column is-6">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/fSqy8cSkKwA?rel=0&amp;showinfo=0"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
            />
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
    title: 'О нас',
  },
  components: {
    navbar,
  },
};
</script>

<style lang="sass" scoped>
.content
  font-size: 18px

.about-li
  list-style: none
</style>