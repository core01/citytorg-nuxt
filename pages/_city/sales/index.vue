<template>
  <div>
    <section class="hero is-default is-bold">
      <div class="hero-head">
        <navbar/>
      </div>
    </section>
    <section
      id="sales"
      class="hero is-fullheight sales"
    >
      <div class="container">
        <div class="content">
          <h2 class="has-text-centered content_h2">Акции</h2>
        </div>
        <div class="columns zero-side-margin">
          <div class="column is-6-desktop">
            <sales-tabs
              :div-class="' is-toggle'"
              :type="type"
              @switch-type="switchType"
            />
          </div>
        </div>
        <sales-grids-list
          v-if="type === 'grids'"
          :sales="sales"
          :absence_text="absence_text"
        />
        <sales-rows-list
          v-else
          :sales="sales"
          :absence_text="absence_text"
        />
      </div>
    </section>
  </div>
</template>
<script>
import navbar from '../../../components/navbar/navbar.vue';
import salesGridsList from '../../../components/sales/list/grids.vue';
import salesRowsList from '../../../components/sales/list/rows.vue';
import salesTabs from '../../../components/tabs/sales.vue';
import {mapGetters} from 'vuex';

export default {
  head: {
    title: 'Все акции',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Полный перечень всех действующих акций в городе',
      },
    ],
  },
  async asyncData({store}) {
    if (process.browser && store.state.pages.previous !== 'city-sales-alias') {
      await store.dispatch('sales/getSales');
    }
  },
  components: {
    navbar,
    salesGridsList,
    salesRowsList,
    salesTabs,
  },
  data() {
    return {
      absence_text: 'Информации о действующих акциях на данный момент нет',
    };
  },
  computed: {
    ...mapGetters({
      sales: 'sales/sales',
      type: 'pages/salesType',
    }),
  },
  mounted() {
    // let vm = this
  },
  methods: {
    switchType(type) {
      this.$store.commit('pages/SET_SALES_TYPE', type);
    },
  },
};
</script>
<style>
</style>