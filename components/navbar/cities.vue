<template>
  <div class="navbar-item  has-dropdown is-hoverable">
    <a class="navbar-link">{{ city.title }}</a>
    <div class="navbar-dropdown">
      <a
        v-for="(city, index) in cities"
        :key="index"
        class="navbar-item"
        @click="setCity(city)">
        {{ city.title }}
      </a>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      cities: 'cities',
      city: 'city'
    })
  },
  mounted(){
    this.$store.dispatch('getCities');
  },
  methods: {
    showMenu() {
      this.show = !this.show;
    },
    async setCity(city){
      this.$store.dispatch('setCity', city);
      this.$router.push('/');
    }
  },
};
</script>