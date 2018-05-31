<template>
  <div class="columns is-multiline is-gapless">
    <div
      v-for="shop in shops"
      :key="shop.sys.id"
      class="column is-3">
      <grid-shop :shop="shop"/>
    </div>
  </div>
</template>
<script>
import gridShop from '../grid-shop.vue';

export default {
  components: {
    gridShop
  },
  props: {
    shops: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>