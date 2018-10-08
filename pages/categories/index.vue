<template>
  <section
    id="categories"
    class="min-h-screen">
    <div class="content">
      <h2 class="text-center content_h2">Категории</h2>
    </div>
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <nuxt-link
          v-for="category in categories"
          :key="category.id"
          :to="{ path: '/categories/' + category.id + '-' + category.alias }"
          class="block w-1/2 md:w-1/4 lg:w-1/6 cursor-pointer p-2 text-black hover:text-blue-dark no-underline">
          <div class="overflow-hidden">
            <figure class="relative overflow-hidden">
              <img
                v-if="category.images"
                :src="UPLOADS_URL + category.images[0].small"
                :alt="category.title"
                class="w-full rounded  ">
              <img
                v-else
                :alt="category.title"
                src="~assets/images/placeholder.png"
                class="w-full rounded  ">
            </figure>
          </div>
          <div class="w-full">
            <p class="text-sm">{{ category.title | truncate(22) }}</p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
<script>
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
    data.categories = await app.$axios.$get(process.env.BACKEND_URL + 'categories');

    return data;
  },
  components: {
  },
  data() {
    return {
      UPLOADS_URL: process.env.UPLOADS_URL,
    };
  },
  computed: {
  },
  mounted() {
    for(let i =0 ; i < this.categories.length; i++){
      console.log(this.UPLOADS_URL + this.categories[i].images[0].small);
    }
  },
  methods: {

  }
};
</script>
<style>
</style>