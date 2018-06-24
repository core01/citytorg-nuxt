<template>
  <div
    :class="className"
    class="tags">
    <span class="tag-helper">
      <span
        v-if="sale.sale"
        class="tag is-success tooltip is-tooltip-success"
        data-tooltip="Скидка на товар">%</span>
      <span
        v-if="sale.akcion"
        class="tag is-danger tooltip is-tooltip-danger is-tooltip-multiline"
        data-tooltip="Продажа товаров на основое специального ценового предложения">Акцион</span>
      <span
        v-if="sale.one_plus_one"
        class="tag is-link tooltip is-tooltip-link is-tooltip-multiline"
        data-tooltip="Скидка при покупке комплекта из двух товаров">1+1</span>
      <span
        v-if="sale.two_equals_three"
        class="tag is-warning tooltip is-tooltip-warning"
        data-tooltip="Три товара по цене двух">1+1=3</span>
      <span
        v-if="sale.new"
        class="tag is-info tooltip is-tooltip-info"
        data-tooltip="Новинка">Новинка</span>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    sale: {
      default() {
        return {'sale':true};
      },
      type: Object
    },
    className: {
      default() {
        return 'tags-center';
      },
      type: String
    }
  },
  data() {
    return {};
  }
};
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