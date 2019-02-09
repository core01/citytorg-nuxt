<template>
  <section
    id="category_sales"
    class="sales"
  >
    <div class="container mx-auto p-3 mb-10">
      <div
        :style="backgroundImage"
        class="cover w-full bg-cover bg-center relative"
      >
        <div class="pt-24 pb-8 pl-5 relative">
          <h1>{{ category.title }}</h1>
          <h4 class="font-normal">
            <span v-if="meta.total">Действующих акций в категории: {{ meta.total }}
            </span>
            <span v-else>Нет действующих акций в категории</span>
          </h4>
        </div>
      </div>
    </div>
    <div
      v-if="meta.total"
      class="container mx-auto"
    >
      <sales-grids-list
        :sales="sales"
        :loading="loading"
        @get-more-sales="getMoreSales"
      />
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import salesGridsList from "../../components/sales/list/grids.vue";
import { mapGetters } from "vuex";
import Category from "types/Category";

@Component({
  async asyncData({ app, params, store }) {
    const data: {
      id: number;
      category: {};
    } = {
      id: 0,
      category: {}
    };
    const [id] = params.alias.split("-");

    data.id = +id;
    data.category = await app.$axios.$get("api/categories/" + id);

    if (
      store.state.pages.previous !== "city-sales-alias" ||
      !!params.fetchData === true
    ) {
      await store.dispatch("sales/getCategorySales", id);
    }

    return data;
  },
  components: {
    salesGridsList
  },
  computed: {
    ...mapGetters({
      salesById: "sales/categorySalesById",
      metaById: "meta/categorySalesById"
    })
  }
})
export default class CategoriesAlias extends Vue {
  salesById: (id) => {};
  metaById: (id) => {};

  loading: boolean = false;
  id!: number;
  category: Category;

  async getMoreSales() {
    this.loading = true;
    await this.$store.dispatch("sales/getMoreCategorySales", this.id);
    this.loading = false;
  }

  head() {
    return {
      title: this.category.title,
      meta: [
        {
          hid: "description",
          description:
            "Товары категории" + this.category.title + " на Citytorg.kz"
        }
      ]
    };
  }

  get sales() {
    return this.salesById(this.id);
  }
  get meta() {
    return this.metaById(this.id);
  }
  get backgroundImage() {
    return 'background-image: url("/' + this.category.images[0].wide + '");';
  }
}
</script>
<style scoped>
.cover:before {
  position: absolute;
  right: 0;
  left: 0;
  display: block;
  height: 100%;
  content: "";
  background: linear-gradient(
    hsla(0, 0%, 100%, 0.35),
    hsla(0, 0%, 100%, 0.84) 50%,
    #fff
  );
}
</style>