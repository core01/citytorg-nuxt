<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p class="footer-links">
          <nuxt-link
            :exact="false"
            to="/sales"
            class="footer-links__link"
            active-class="is-active">
            Акции
          </nuxt-link>
          <nuxt-link
            :exact="false"
            to="/shops"
            class="footer-links__link"
            active-class="is-active">
            Магазины
          </nuxt-link>
          <nuxt-link
            :exact="true"
            to="/about"
            class="footer-links__link"
            active-class="is-active">
            О проекте
          </nuxt-link>
          <nuxt-link
            :exact="true"
            to="/request"
            class="footer-links__link"
            active-class="is-active">
            Обратная связь
          </nuxt-link>
          <a
            href="https://my.citytorg.kz"
            target="_blank"
            rel="noopener noreferrer">Личный кабинет</a>
        </p>
        <p class="footer-phones">
          <a
            href="tel:+77776461355"
            class="footer-phones__phone">
            <span class="icon has-text-link">
              <i class="fas fa-mobile-alt"/>
            </span>
          +77776461355</a> (по Казахстану)
          <a class="footer-phones__phone">
            <span class="icon has-text-link">
              <i class="fas fa-phone"/>
            </span>
          1355</a> (г. Усть-Каменогорск)
        </p>
        <p>
          ©
          <strong>Citytorg.kz</strong> - Торговая сеть акционных продаж.
        </p>
        <p>Разработано по заказу
          <a
            href="https://www.cityinfo.kz"
            target="_blank">Cityinfo.kz</a>
        </p>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {}
};
</script>
<style lang="sass" scoped>
.footer-links
  margin: 0 auto
.footer-links__link
  padding: 5px
.footer-phones__phone
  padding: 5px
</style>