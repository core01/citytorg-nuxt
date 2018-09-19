<template>
  <div class="flex flex-wrap">
    <div
      v-for="shop in shops"
      :key="shop.id"
      class="w-full sm:w-1/3 lg:w-1/4"
    >
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