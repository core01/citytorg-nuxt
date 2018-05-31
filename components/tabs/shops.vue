<template>
  <div
    :class="divClass"
    class="tabs">
    <ul>
      <li
        :class="{'is-active': type === 'grids'}"
        @click.prevent="switchType('grids')">
        <a>Список магазинов</a>
      </li>
      <li
        :class="{'is-active': type === 'map'}"
        @click.prevent="switchType('map')">
        <a>Магазины на карте</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    divClass: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'grids'
    }
  },
  data() {
    return {};
  },
  methods: {
    switchType(type) {
      this.$emit('switch-type', type);
    }
  }
};
</script>