<template>
  <section
    id="categories"
    class="min-h-screen">
    <div class="content">
      <h2 class="text-center content_h2">Категории</h2>
    </div>
    <div class="container mx-auto">
      <category-list :categories="categories"/>
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
        content: 'Категории'
      }
    ]
  },
  async asyncData({app}) {
    let data = {};
    data.categories = await app.$axios.$get(process.env.BACKEND_URL + 'categories?sort=-priority');

    return data;
  },
  components: {
    categoryList
  },
  data() {
    return {
      UPLOADS_URL: process.env.UPLOADS_URL,
    };
  },
  computed: {
  },
  mounted() {

  },
  methods: {

  }
};
</script>
<style>
</style>