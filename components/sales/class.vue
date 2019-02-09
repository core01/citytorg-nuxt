<template>
  <div class="flex text-center text-sm justify-center">
    <span
      v-if="classes.sale"
      class="rounded bg-green-dark text-white py-1 px-2 mx-2"
      title="Скидка на товар"
    >Скидка</span>
    <span
      v-if="classes.akcion"
      class="rounded text-white bg-red-akcion py-1 px-2 mx-2"
      title="Продажа товаров на основое специального ценового предложения"
    >Акцион</span>
    <span
      v-if="classes.one_plus_one"
      class="rounded text-white bg-blue-matisse py-1 px-2 mx-2"
      title="Скидка при покупке комплекта из двух товаров"
    >1+1</span>
    <span
      v-if="classes.two_equals_three"
      class="rounded text-black bg-yellow-dark py-1 px-2 mx-2"
      title="Три товара по цене двух"
    >1+1=3</span>
    <span
      v-if="classes.new"
      class="rounded text-white bg-blue-dark py-1 px-2 mx-2"
      title="Новинка"
    >Новинка</span>
    <span
      v-if="classes.social"
      class="rounded text-white bg-blue-light py-1 px-2 mx-2"
      title="Товар по социальной цене"
    >
      Социальный
    </span>
  </div>
</template>
<script>
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class extends Vue {
  @Prop({ type: Object, default: { sale: true } }) sale;
  @Prop({ type: Boolean, default: false }) grid;

  classes = {
    sale: false,
    new: false,
    social: false,
    akcion: false,
    one_plus_one: false,
    two_equals_three: false
  };

  created() {
    let j = 0;
    for (const property in this.classes) {
      if (this.classes.hasOwnProperty(property)) {
        // Если это страница плиток и если элементов 2, то больше не показываем
        if (this.grid && j === 2) {
          break;
        }
        if (this.sale[property]) {
          this.classes[property] = true;
          j++;
        }
      }
    }
  }
}
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