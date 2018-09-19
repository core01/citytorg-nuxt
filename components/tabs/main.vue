<template>
  <ul class="list-reset flex">
    <li class="">
      <button
        :class="salesClass"
        class="inline-block border border-r-0 py-3 px-4 rounded-tl rounded-bl cursor-pointer"
        @click.prevent="switchMode('sales')"
      >Акции</button>
    </li>
    <li class="">
      <button
        :class="shopsClass"
        class="inline-block border border-l-0 py-3 px-4 rounded-tr rounded-br cursor-pointer"
        @click.prevent="switchMode('shops')"
      >Магазины</button>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'sales'
    }
  },
  data() {
    return {
      activeClass: 'border-blue-matisse bg-blue-matisse text-white',
      inActiveClass: 'hover:border-blue-matisse border-grey'
    };
  },
  computed: {
    salesClass() {
      return this.mode === 'sales' ? this.activeClass : this.inActiveClass;
    },
    shopsClass() {
      return this.mode === 'shops' ? this.activeClass : this.inActiveClass;
    }
  },
  methods: {
    switchMode(mode) {
      this.$emit('switch-mode', mode);
    }
  }
};
</script>