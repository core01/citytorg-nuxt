<template>
  <ul class="list-reset flex">
    <li>
      <button
        :class="gridsClass"
        class="inline-block border border-r-0 py-2 px-3 rounded-tl rounded-bl cursor-pointer"
        @click.prevent="switchMode('grids')"
      >Плитками</button>
    </li>
    <li>
      <button
        :class="mapClass"
        class="inline-block border border-l-0 py-2 px-3 rounded-tr rounded-br cursor-pointer"
        @click.prevent="switchMode('map')"
      >На карте</button>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'grids'
    }
  },
  data() {
    return {
      activeClass: 'border-blue-matisse bg-blue-matisse text-white',
      inActiveClass: 'hover:border-blue-matisse border-grey'
    };
  },
  computed: {
    gridsClass() {
      return this.mode === 'grids' ? this.activeClass : this.inActiveClass;
    },
    mapClass() {
      return this.mode === 'map' ? this.activeClass : this.inActiveClass;
    }
  },
  methods: {
    switchMode(mode) {
      this.$emit('switch-mode', mode);
    }
  }
};
</script>