<template>
  <footer class="footer bg-grey-lighter pt-12 px-6 pb-24 mt-6">
    <div class="container mx-auto">
      <div class="content text-center">
        <p :key="city.alias" class="footer-links mb-4">
          <nuxt-link
            :exact="false"
            :to="{ name: 'city-sales', params: { city: city.alias } }"
            class="p-1 no-underline"
            active-class="is-active"
          >
            Акции
          </nuxt-link>
          <nuxt-link
            :exact="false"
            :to="{ name: 'city-shops', params: { city: city.alias } }"
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
            >Личный кабинет</a
          >
        </p>
        <p class="mb-4">
          ©
          <strong>Citytorg.kz</strong> - Торговая сеть акционных продаж.
        </p>
        <p class="mb-4">
          Разработано по заказу
          <a
            class="p-1 no-underline"
            href="https://www.cityinfo.kz"
            target="_blank"
            >Cityinfo.kz</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>
<script>
import { mapGetters } from 'vuex';

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
<style></style>
