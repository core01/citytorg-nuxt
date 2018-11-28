<template>
  <on-click-outside :do="handleClickOutside">
    <div class="relative">
      <div
        role="button"
        class="inline-block select-none"
        @click="showMenu()">
        <div class="appearance-none flex items-center inline-block text-black-tundora p-2 ">
          <span class="mr-1">{{ currentCity.title }}</span>
          <svg
            class="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
      <div
        v-show="show"
        class="absolute pin-l mt-px z-10">
        <div class="bg-white border overflow-hidden">
          <a
            v-for="(city,index) in cities"
            v-if="currentCity.id !== city.id"
            :key="index"
            class="no-underline w-48 block py-2 px-4 border-b text-black-tundora bg-white hover:text-black hover:bg-indigo-lightest whitespace-no-wrap cursor-pointer"
            @click="setCity(city)"
          >
            {{ city.title }}
          </a>
        </div>
      </div>
    </div>
  </on-click-outside>
</template>
<script>
import { mapGetters } from 'vuex';
import OnClickOutside from '../on-click-outside';

export default {
  components: {
    OnClickOutside
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapGetters({
      cities: 'cities/cities',
      currentCity: 'cities/city'
    })
  },
  methods: {
    showMenu() {
      this.show = !this.show;
    },
    async setCity(city) {
      this.handleClickOutside();
      this.$store.dispatch('cities/setCity', city);
      this.$router.push('/');
    },
    handleClickOutside() {
      if (this.show) {
        this.show = false;
      }
    }
  }
};
</script>