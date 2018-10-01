<template>
  <ul class="list-reset flex">
    <li>
      <button
        :class="gridsClass"
        class="inline-block border border-r-0 py-3 px-4 rounded-tl rounded-bl cursor-pointer"
        @click.prevent="switchType('grids')"
      >Плитками</button>
    </li>
    <li>
      <button
        :class="rowsClass"
        class="inline-block border border-l-0 py-3 px-4 rounded-tr rounded-br cursor-pointer"
        @click.prevent="switchType('rows')"
      >Списком</button>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    type: {
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
      return this.type === 'grids' ? this.activeClass : this.inActiveClass;
    },
    rowsClass() {
      return this.type === 'rows' ? this.activeClass : this.inActiveClass;
    }
  },
  methods: {
    switchType(type) {
      this.$emit('switch-type', type);
    }
  }
};
</script>