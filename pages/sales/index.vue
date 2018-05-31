<template>
  <div>
    <section class="hero is-default is-bold">
      <div class="hero-head">
        <navbar/>
      </div>
    </section>
    <section
      id="sales"
      class="hero is-fullheight sales">
      <div class="container">
        <div class="content">
          <h2 class="has-text-centered content_h2">Акции</h2>
        </div>
        <sales-tabs
          :div-class="' is-toggle'"
          :type="type"
          @switch-type="switchType"/>
        <sales-grids-list
          v-if="type === 'grids'"
          :sales="sales"
          :absence-text="absence_text"/>
        <sales-rows-list
          v-else
          :sales="sales"
          :absence-text="absence_text"/>
      </div>
    </section>
  </div>
</template>
<script>
import navbar from '../../components/navbar/navbar.vue';
import { createClient } from '~/plugins/contentful.js';
import salesGridsList from '../../components/sales/list/grids.vue';
import salesRowsList from '../../components/sales/list/rows.vue';

import salesTabs from '../../components/tabs/sales.vue';

const client = createClient();
export default {
  head: {
    title: 'Все акции',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Полный перечень всех действующих акций в городе'
      }
    ]
  },
  async asyncData({ env, params }) {
    return await client
      .getEntries({
        content_type: 'sales',
        order: '-sys.updatedAt'
      })
      .then(entries => {
        return {
          sales: entries.items
        };
      });
  },
  components: {
    navbar,
    salesGridsList,
    salesRowsList,
    salesTabs
  },
  data() {
    return {
      type: 'grids',
      absence_text: 'Информации о действующих акциях на данный момент нет'
    };
  },
  mounted() {
    // let vm = this
  },
  methods: {
    switchType(type) {
      this.type = type;
    }
  }
};
</script>
<style>
</style>