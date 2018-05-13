<template>
  <div
    :class="className"
    class="tags">
    <span
      v-for="(type, index) in types"
      :key="index"
      class="tag-helper">
      <span
        v-if="type === 'default'"
        class="tag is-success tooltip is-tooltip-success"
        data-tooltip="Скидка на товар">%</span>
      <span
        v-if="type === 'akcion'"
        class="tag is-danger tooltip is-tooltip-danger is-tooltip-multiline"
        data-tooltip="Продажа товаров на основое специального ценового предложения">Акцион</span>
      <span
        v-if="type === 'oneplusone'"
        class="tag is-link tooltip is-tooltip-link is-tooltip-multiline"
        data-tooltip="При покупке одного товара, второй бесплатно">1+1</span>
      <span
        v-if="type === 'threefortwo'"
        class="tag is-warning tooltip is-tooltip-warning"
        data-tooltip="Три товара по цене двух">2=3</span>
      <span
        v-if="type === 'new'"
        class="tag is-info tooltip is-tooltip-info"
        data-tooltip="Новинка">Новинка</span>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    types: {
      default() {
        return ['default']
      },
      type: Array
    },
    className: {
      default() {
        return 'tags-center'
      },
      type: String
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="sass" scoped>
.tags-center
  justify-content: center
  text-align: center
.tag-helper
  &:not(:last-child)
    margin-right: 0.5rem

.tags
  &:not(:last-child)
    margin-bottom: 0

</style>
