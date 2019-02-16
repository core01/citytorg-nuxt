<template>
  <div class="flex flex-wrap">
    <nuxt-link
      v-for="category in categories"
      :key="category.id"
      :to="{ path: '/categories/' + category.id + '-' + category.alias }"
      class="block w-1/2 md:w-1/4 lg:w-1/6 cursor-pointer p-2 text-black hover:text-blue-dark no-underline"
    >
      <div class="overflow-hidden">
        <figure class="relative overflow-hidden">
          <img
            v-if="category.images"
            :src="'/' + category.images[0].small"
            :alt="category.title"
            class="w-full rounded  "
          />
          <img
            v-else
            :alt="category.title"
            src="~assets/images/placeholder.png"
            class="w-full rounded  "
          />
        </figure>
      </div>
      <div class="w-full">
        <p class="text-sm">
          {{ category.title | truncate(40) }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>
