<template>
  <ul class="list-reset flex">
    <li>
      <button
        :class="activeClass"
        class="inline-block border border-r-0 py-2 px-3 rounded-tl rounded-bl cursor-pointer"
        @click.prevent="switchType('active')"
      >Действующие</button>
    </li>
    <li>
      <button
        :class="futureClass"
        class="inline-block border border-l-0 py-2 px-3 rounded-tr rounded-br cursor-pointer"
        @click.prevent="switchType('future')"
      >Ожидаемые</button>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'active'
    }
  },
  data() {
    return {
      active: 'border-blue-matisse bg-blue-matisse text-white',
      inActive: 'hover:border-blue-matisse border-grey'
    };
  },
  computed: {
    activeClass() {
      return this.type === 'active' ? this.active : this.inActive;
    },
    futureClass() {
      return this.type === 'future' ? this.active : this.inActive;
    }
  },
  methods: {
    switchType(type) {
      this.$emit('switch-type', type);
    }
  }
};
</script>