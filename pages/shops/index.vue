<template>
  <div>
    <section class="hero is-default is-bold">
      <div class="hero-head">
        <navbar/>
      </div>
    </section>
    <section
      id="shops"
      class="hero is-fullheight shops">
      <div class="container">
        <div class="content">
          <h2 class="has-text-centered content_h2">Магазины</h2>
        </div>
        <shops-tabs
          :div-class="' is-toggle'"
          :type="type"
          @switch-type="switchType"/>
        <shopListGrids
          v-if="type === 'grids'"
          :shops="shops"/>
        <div
          v-else
          class="container">
          <shop-list-map
            :shops="shops"/>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import navbar from '../../components/navbar/navbar.vue'
import shopListMap from '../../components/shops/list/map.vue'
import shopListGrids from '../../components/shops/list/grids.vue'

import shopsTabs from '../../components/tabs/shops.vue'

import { createClient } from '~/plugins/contentful.js'

const client = createClient()
export default {
  head: {
    title: 'Все магазины',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Полный перечень всех магазинов в городе'
      }
    ]
  },
  async asyncData({ env, params }) {
    return await client
      .getEntries({
        content_type: 'shops',
        order: '-sys.createdAt',
        'fields.active': true
      })
      .then(entries => {
        return {
          shops: entries.items
        }
      })
  },
  components: {
    navbar,
    shopListMap,
    shopListGrids,
    shopsTabs
  },
  data() {
    return {
      type: 'grids',
      map: null,
      tileLayer: null,
      layers: []
    }
  },
  mounted() {},
  methods: {
    switchType(type) {
      this.type = type
    }
  }
}
</script>
<style scoped>
/* .shops {
    background-color: #eff3f4;
  } */

.shop-card_content {
  margin: 0 !important;
}

.card-image > .fa {
  font-size: 8rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  color: #209cee;
}

.card-content .content {
  font-size: 14px;
  margin: 1rem 1rem;
}

.card-content .content h4 {
  font-size: 16px;
  font-weight: 700;
}

.card {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  margin-bottom: 2rem;
}

.tile.notification {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.is-shady {
  animation: flyintoright 0.4s backwards;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 1px, rgba(0, 0, 0, 0.1) 0 2px 1px;
  border-radius: 4px;
  display: inline-block;
  margin: 10px;
  position: relative;
  transition: all 0.2s ease-in-out;
}

.is-shady:hover {
  box-shadow: 0 10px 16px rgba(0, 0, 0, 0.13), 0 6px 6px rgba(0, 0, 0, 0.19);
}
</style>
