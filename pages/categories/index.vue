<template>
  <section
    id="categories"
    class="min-h-screen"
  >
    <div class="content">
      <h2 class="text-center content_h2">Категории</h2>
    </div>
    <div class="container mx-auto">
      <category-list :categories="categories" />
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import categoryList from "../../components/categories/list.vue";
@Component({
  head: {
    title: "Категории",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Категории"
      }
    ]
  },
  async asyncData({ app }) {
    const data = {
      categories: []
    };
    const response = await app.$axios.$get("api/categories?sort=-priority");
    data.categories = response.categories;

    return data;
  },
  components: {
    categoryList
  }
})
export default class Categories extends Vue {}
</script>
<style>
</style>