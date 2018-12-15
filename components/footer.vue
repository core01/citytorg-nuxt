<template>
  <footer class="footer bg-grey-lighter pt-12 px-6 pb-24 mt-6">
    <div class="container mx-auto">
      <div class="content text-center">
        <p class="footer-links mb-4">
          <nuxt-link
            :key="city.alias"
            :exact="false"
            :to="{ name: 'city-sales', params: { city: city.alias }}"
            class="p-1 no-underline"
            active-class="is-active"
          >
            Акции
          </nuxt-link>
          <nuxt-link
            :key="city.alias"
            :exact="false"
            :to="{ name: 'city-shops', params: { city: city.alias }}"
            class="p-1 no-underline"
            active-class="is-active"
          >
            Магазины
          </nuxt-link>
          <nuxt-link
            :exact="true"
            to="/request"
            class="p-1 no-underline"
            active-class="is-active"
          >
            Обратная связь
          </nuxt-link>
          <a
            class="p-1 no-underline"
            href="https://my.citytorg.kz"
            target="_blank"
            rel="noopener noreferrer"
          >Личный кабинет</a>
        </p>
        <p class="footer-phones mb-4">
          <a
            href="tel:+77776461355"
            class="p-1 no-underline"
          >
            <span class="justify-center items-center inline-flex w-6 h-6">
              <i class="fas fa-mobile-alt"/>
            </span>
            +77776461355
          </a> (по Казахстану)
          <a class="p-1 no-underline">
            <span class="justify-center items-center inline-flex w-6 h-6">
              <i class="fas fa-phone"/>
            </span>
            1355
          </a> (г. Усть-Каменогорск)
        </p>
        <p class="mb-4">
          ©
          <strong>Citytorg.kz</strong> - Торговая сеть акционных продаж.
        </p>
        <p class="mb-4">Разработано по заказу
          <a
            class="p-1 no-underline"
            href="https://www.cityinfo.kz"
            target="_blank"
          >Cityinfo.kz</a>
        </p>
      </div>
    </div>
  </footer>
</template>
<script>
import {mapGetters} from 'vuex';

export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      city: 'cities/city',
    }),
  },
};
</script>
<style>
</style>