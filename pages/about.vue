<template>
  <section class="min-h-screen">
    <div class="container mx-auto">
      <div class="content">
        <h2 class="has-text-centered content_h2">О проекте</h2>
        <p>
          <b>Citytorg</b> - Торговая сеть акционных продаж
        </p>
        <p>Презентация о проекте -
          <a
            href="https://docs.google.com/presentation/d/1vdqcjNuY_brHBoCvNUDYDNDbiKU2_SEaQrMrRZoyYEY/edit"
            target="_blank"
          >Скачать (Google Drive)</a>
        </p>
      </div>
      <div class="flex mt-2">
        <div class="w-full lg:w-1/2">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/U1-HPsHxvgg?rel=0&amp;showinfo=0"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          />
        </div>
        <div class="w-full lg:w-1/2">
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

<style lang="postcss" scoped>
.content {
	font-size: 18px;
}

.about-li {
	list-style: none;
}
</style>