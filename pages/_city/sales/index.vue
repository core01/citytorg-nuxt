<template>
  <section
    id="sales"
    class="sales"
  >
    <div class="content">
      <h2 class="text-center content_h2">Акции</h2>
    </div>
    <div class="container mx-auto mb-6 px-1 md:px-0">
      <div class="flex zero-side-margin">
        <div class="w-full lg:w-1/2">
          <sales-type
            :type="type"
            @switch-type="switchType"
          />
        </div>
      </div>
    </div>
    <div class="container mx-auto px-1 md:px-0">
      <sales-grids-list
        v-if="type === 'active'"
        :sales="sales"
        :loading="loading"
        absence-text="Информации о действующих акциях на данный момент нет"
        @get-more-sales="getMoreSales"
      />
      <future-sales-grids-list
        v-else
        :sales="futureSales"
        :loading="loading"
        absence-text="Информации об ожидаемых акциях на данный момент нет"
      />
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import salesGridsList from "../../../components/sales/list/grids.vue";
import futureSalesGridsList from "../../../components/sales/list/future-grids.vue";
import salesType from "../../../components/tabs/sales-type.vue";

@Component({
  head: {
    title: "Все акции",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Полный перечень всех действующих акций в городе"
      }
    ]
  },
  async asyncData({ store }) {
    if (process.browser && store.state.pages.previous !== "city-sales-alias") {
      await store.dispatch("sales/getSales");
    }
  },
  components: {
    salesGridsList,
    salesType,
    futureSalesGridsList
  },
  computed: {
    ...mapGetters({
      sales: "sales/sales",
      futureSales: "sales/futureSales",
      type: "pages/salesType"
    })
  }
})
export default class Sales extends Vue {
  loading: boolean = false;

  async getMoreSales() {
    this.loading = true;
    await this.$store.dispatch("sales/getMoreSales");
    this.loading = false;
  }

  async switchType(type) {
    await this.$store.dispatch("sales/getFutureSales");
    this.$store.commit("pages/SET_SALES_TYPE", type);
  }
}
</script>
<style>
</style>