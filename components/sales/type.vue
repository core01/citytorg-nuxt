<template>
  <div
    class="flex justify-center text-center text-sm mb-2"
  >
    <span
      v-if="sale.sale"
      class="rounded bg-green-dark text-white py-1 px-2 mx-2"
      title="Скидка на товар"
    >%</span>
    <span
      v-if="sale.akcion"
      class="rounded text-white p-1 bg-red-akcion"
      title="Продажа товаров на основое специального ценового предложения"
    >Акцион</span>
    <span
      v-if="sale.one_plus_one"
      class="rounded text-white bg-blue-matisse py-1 px-2 mx-2"
      title="Скидка при покупке комплекта из двух товаров"
    >1+1</span>
    <span
      v-if="sale.two_equals_three"
      class="rounded text-black bg-yellow-dark py-1 px-2 mx-2"
      title="Три товара по цене двух"
    >1+1=3</span>
    <span
      v-if="sale.new"
      class="rounded text-white bg-blue-dark py-1 px-2 mx-2"
      title="Новинка"
    >Новинка</span>
    <span
      v-if="sale.social"
      class="rounded text-white bg-blue-light py-1 px-2 mx-2"
      title="Товар по социальной цене"
    >
      Социальный
    </span>
  </div>
</template>
<script>
export default {
  props: {
    sale: {
      default() {
        return {'sale': true};
      },
      type: Object,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="postcss" scoped>
.tags-center {
  justify-content: center;
  text-align: center;
}

.tag-helper:not(:last-child) {
  margin-right: 0.5rem;
}

.tags:not(:last-child) {
  margin-bottom: 0;
}
</style>