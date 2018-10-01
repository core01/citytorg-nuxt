<template>
  <section
    id="shops"
    class="is-fullheight shops"
  >
    <div class="content">
      <h2 class="text-center content_h2">Магазины</h2>
    </div>
    <div class="container mx-auto mb-6">
      <div class="flex">
        <div class="w-full lg:w-1/2">
          <shops-tabs
            :type="type"
            @switch-type="switchType"
          />
        </div>
      </div>
    </div>
    <div class="container mx-auto">
      <shopListGrids
        v-if="type === 'grids'"
        :shops="shops"
      />
      <shop-list-map
        v-else
        :shops="shops"/>
    </div>
  </section>
</template>
<script>
import navbar from '../../../components/navbar/navbar.vue';
import shopListMap from '../../../components/shops/list/map.vue';
import shopListGrids from '../../../components/shops/list/grids.vue';
import shopsTabs from '../../../components/tabs/shops.vue';
import {mapGetters} from 'vuex';

export default {
  head: {
    title: 'Все магазины',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Полный перечень всех магазинов в городе',
      },
    ],
  },
  async asyncData({store}) {
    await store.dispatch('shops/getShops');
  },
  components: {
    navbar,
    shopListMap,
    shopListGrids,
    shopsTabs,
  },
  data() {
    return {
      map: null,
      tileLayer: null,
      layers: [],
    };
  },
  computed: {
    ...mapGetters({
      shops: 'shops/shops',
      type: 'pages/shopsType',
    }),
  },
  mounted() {},
  methods: {
    switchType(type) {
      this.$store.commit('pages/SET_SHOPS_TYPE', type);
    },
  },
};
</script>
<style lang="css" scoped>
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