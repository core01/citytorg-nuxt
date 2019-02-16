<template>
  <div class="navbar bg-white mb-16">
    <header
      :class="headerClass"
      class="container flex items-stretch w-full mx-auto px-1 md:px-0 border-b border-grey-light lg:fixed lg:pin-x lg:pin-t lg:z-20"
    >
      <div
        class="flex flex-row items-center w-full flex-wrap lg:flex-no-wrap bg-white"
      >
        <div class="brand flex items-stretch flex-no-shrink">
          <nuxt-link
            to="/"
            class="flex flex-no-grow flex-no-shrink items-center py-0 px-0"
          >
            <img
              class="logo"
              src="~assets/images/logo_beta.png"
              alt="Citytorg"
            />
          </nuxt-link>
        </div>
        <div class="flex flex-no-shrink">
          <navbar-cities />
        </div>
        <div class="lg:flex items-center flex-no-shrink px-2 hidden">
          <span class="justify-center items-center inline-flex w-6 h-6">
            <i class="fas fa-phone-volume" />
          </span>
          Call-center:&nbsp;
          <a href="tel:+77776461355" class="text-blue-matisse no-underline"
            >+7-777-646-13-55</a
          >
        </div>
        <div class="text-right lg:hidden flex-grow">
          <button
            type="button"
            class="nav-toggle appearance-none"
            @click="showMenu()"
          >
            <svg
              class="fill-current text-grey-dark w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z"
              />
            </svg>
          </button>
        </div>
        <nav
          :class="{ hidden: !show }"
          class="w-full lg:w-auto block flex-no-shrink flex-grow lg:flex lg:flex-wrap lg:justify-end bg-white min-h-100"
          role="navigation"
        >
          <ul
            :key="city.alias"
            class="lg:flex lg:flex-grow lg:justify-end lg:flex-no-shrink lg:items-center p-0"
          >
            <nuxt-link
              :to="{ name: 'city-sales', params: { city: city.alias } }"
              :active-class="liActiveClass"
              :class="liClass"
              tag="li"
              @click.native="showMenu"
            >
              <a :class="linkClass">Акции</a>
            </nuxt-link>
            <nuxt-link
              :to="{ name: 'city-shops', params: { city: city.alias } }"
              :active-class="liActiveClass"
              :class="liClass"
              tag="li"
              @click.native="showMenu"
            >
              <a :class="linkClass">Магазины</a>
            </nuxt-link>
            <nuxt-link
              :exact="true"
              :to="{ name: 'categories' }"
              :active-class="liActiveClass"
              :class="liClass"
              tag="li"
              @click.native="showMenu"
            >
              <a :class="linkClass">Категории</a>
            </nuxt-link>
            <nuxt-link
              :exact="true"
              :active-class="liActiveClass"
              :class="liClass"
              to="/request"
              tag="li"
              @click.native="showMenu"
            >
              <a :class="linkClass">
                Обратная связь
              </a>
            </nuxt-link>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>
<script>
import navbarCities from './cities.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    navbarCities,
  },
  data() {
    return {
      show: false,
      liActiveClass: 'active font-medium',
      liClass: 'block px-1 mx-2 py-1',
      linkClass:
        'block py-1 px-3 no-underline -mb-px flex justify-center items-center align-top text-black-tundora',
      currentScroll: 0,
      previousScroll: 0,
      headerClass: '',
    };
  },
  computed: {
    ...mapGetters({
      city: 'cities/city',
    }),
  },
  created() {
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  methods: {
    showMenu() {
      this.show = !this.show;
    },
    handleScroll() {
      this.previousScroll = this.currentScroll;
      this.currentScroll = window.scrollY;
      if (
        this.currentScroll > 140 &&
        this.currentScroll < this.previousScroll
      ) {
        this.headerClass = ' show';
      } else if (
        this.currentScroll > 140 &&
        this.currentScroll > this.previousScroll
      ) {
        this.headerClass = 'hide';
      } else {
        this.headerClass = '';
      }
    },
  },
};
</script>
<style lang="postcss" scoped>
.logo {
  max-height: 1.75rem;
}
.brand {
  min-height: 3.25rem;
}
.active a {
  color: config('textColors.blue-matisse');
}
.hide {
  opacity: 0;
  transform: translate(0, -90px);
}
.show {
  opacity: 1;
  transform: translate(0, 0);
  transition: transform 0.3s, background 0.3s, color 0.3s;
}
</style>
