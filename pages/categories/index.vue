<template>
  <section id="categories" class="min-h-screen">
    <div class="content">
      <h2 class="text-center content_h2">
        Категории
      </h2>
    </div>
    <div class="container mx-auto">
      <category-list :categories="categories" />
    </div>
  </section>
</template>
<script>
import categoryList from '../../components/categories/list.vue';
export default {
  head: {
    title: 'Категории',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Категории',
      },
    ],
  },
  components: {
    categoryList,
  },
  data() {
    return {};
  },
  computed: {},
  async asyncData({ app }) {
    let data = {};
    let response = await app.$axios.$get('api/categories?sort=-priority');
    data.categories = response.categories;

    return data;
  },
  mounted() {},
  methods: {},
};
</script>
<style></style>
