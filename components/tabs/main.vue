<template>
  <div class="tabs is-toggle">
    <ul>
      <li
        :class="{'is-active': mode === 'sales'}"
        @click.prevent="switchMode('sales')"
      >
        <a>Акции</a>
      </li>
      <li
        :class="{'is-active': mode === 'shops'}"
        @click.prevent="switchMode('shops')"
      >
        <a>Магазины</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'sales',
    },
  },
  data() {
    return {};
  },
  methods: {
    switchMode(mode) {
      this.$emit('switch-mode', mode);
    },
  },
};
</script>