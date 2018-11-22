<template>
  <section
    id="category_sales"
    class="sales">
    <div class="container mx-auto p-3 mb-10">
      <div
        :style="backgroundImage"
        class="cover w-full bg-cover bg-center relative">
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
      class="container mx-auto">
      <sales-grids-list
        :sales="sales"
        :loading="loading"
        @get-more-sales="getMoreSales"
      />
    </div>
  </section>
</template>
<script>
import salesGridsList from '../../components/sales/list/grids.vue';
import {mapGetters} from 'vuex';
export default {
  head() {
    return {
      title: this.category.title,
      meta: [
        {
          hid: 'description',
          description:
              'Товары категории' +
              this.category.title +
              ' на Citytorg.kz',
        },
      ],
    };
  },
  async asyncData({app, params, store}) {
    let data = {};
    let [id] = params.alias.split('-');

    data.id = id;
    data.category  = await app.$axios.$get('api/categories/' + id);

    if (store.state.pages.previous !== 'city-sales-alias' || params.fetchData === true) {
      await store.dispatch('sales/getCategorySales', id);
    }

    return data;
  },
  components: {
    salesGridsList,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      salesById: 'sales/categorySalesById',
      metaById: 'meta/categorySalesById',
    }),
    sales(){
      return this.salesById(this.id);
    },
    meta(){
      return this.metaById(this.id);
    },
    backgroundImage(){
      return 'background-image: url("/' +  this.category.images[0].wide + '");';
    },
  },
  mounted() {

  },
  methods: {
    async getMoreSales(){
      this.loading = true;
      await this.$store.dispatch('sales/getMoreCategorySales', this.id);
      this.loading = false;
    }
  }
};
</script>
<style scoped>
.cover:before {
  position: absolute;
    right: 0;
    left: 0;
    display: block;
    height: 100%;
    content: "";
    background: linear-gradient(hsla(0, 0%, 100%, 0.35),hsla(0, 0%, 100%, 0.84) 50%,#fff);
}
</style>