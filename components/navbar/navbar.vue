<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link
          to="/"
          class="navbar-item">
          <img
            src="~assets/images/logo_beta.png"
            alt="Citytorg">
        </nuxt-link>
        <span
          :class="{'is-active': show}"
          class="navbar-burger burger"
          @click.prevent="showMenu">
          <span/>
          <span/>
          <span/>
        </span>
      </div>
      <div
        :class="{'is-active': show}"
        class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item  has-dropdown  is-hoverable">
            <a class="navbar-link">г. Усть-Каменогорск</a>
          </div>
          <div class="navbar-item">
            <span class="icon">
              <i class="fas fa-phone-volume"/>
            </span> Call-center:&nbsp;<a href="tel:+77776461355">+7-777-646-13-55</a>
          </div>

        </div>
        <div class="navbar-end">
          <div class="tabs is-right">
            <ul>
              <nuxt-link
                :exact="true"
                tag="li"
                to="/"
                active-class="is-active"
                class="navbar-item"><a>Главная</a>
              </nuxt-link>
              <nuxt-link
                :exact="false"
                tag="li"
                to="/sales"
                active-class="is-active"
                class="navbar-item">
                <a>Акции</a>
              </nuxt-link>
              <nuxt-link
                :exact="false"
                tag="li"
                to="/shops"
                active-class="is-active"
                class="navbar-item">
                <a>Магазины</a>
              </nuxt-link>
              <nuxt-link
                :exact="true"
                tag="li"
                to="/request"
                active-class="is-active"
                class="navbar-item">
                <a>Обратная связь</a>
              </nuxt-link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    showMenu() {
      this.show = !this.show;
    }
  }
};
</script>
<style scoped>
.tabs ul {
  border: none;
}
</style>