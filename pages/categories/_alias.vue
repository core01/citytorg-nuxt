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
      <div class="flex lg:flex-row flex-col lg:items-stretch items-center justify-between my-6">
        <div class="flex justify-start mb-3">
          <sales-tabs
            :type="type"
            @switch-type="switchType"
          />
        </div>
      </div>
      <sales-grids-list
        v-if="type === 'grids'"
        :sales="sales"
        @get-more-sales="getMoreSales"
      />
      <sales-rows-list
        v-else
        :sales="sales"
        @get-more-sales="getMoreSales"
      />
    </div>
  </section>
</template>
<script>
import salesGridsList from '../../components/sales/list/grids.vue';
import salesRowsList from '../../components/sales/list/rows.vue';
import salesTabs from '../../components/tabs/sales.vue';
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
    data.category  = await app.$axios.$get(process.env.BACKEND_URL + 'categories/' + id);
    await store.dispatch('sales/getCategorySales', id);

    return data;
  },
  components: {
    salesGridsList,
    salesRowsList,
    salesTabs,
  },
  data() {
    return {
      UPLOADS_URL: process.env.UPLOADS_URL,
    };
  },
  computed: {
    ...mapGetters({
      salesById: 'sales/categorySalesById',
      metaById: 'meta/categorySalesById',
      type: 'pages/categoryType',
    }),
    sales(){
      return this.salesById(this.id);
    },
    meta(){
      return this.metaById(this.id);
    },
    backgroundImage(){
      return 'background-image: url("' + this.UPLOADS_URL +  this.category.images[0].wide + '");';
    },
  },
  mounted() {

  },
  methods: {
    switchType(type) {
      this.$store.commit('pages/SET_CATEGORY_TYPE', type);
    },
    async getMoreSales(){
      await this.$store.dispatch('sales/getMoreCategorySales', this.id);
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