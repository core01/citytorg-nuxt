<template>
  <div>
    <div
      v-for="(data, key) in groupedSales"
      :key="key"
    >
      <h3 class="my-4 text-xl "><i class="fa fa-calendar-alt mr-2" />{{ data.date | dateFormat }}</h3>
      <div class="flex flex-wrap">
        <div
          v-for="sale in data.sales"
          :key="sale.id"
          class="w-full sm:w-1/3 lg:w-1/5"
        >
          <sale :sale="sale" />
        </div>
        <no-ssr>
          <mugen-scroll
            :handler="loadMoreSales"
            :should-handle="!loading"
          />
        </no-ssr>
      </div>
    </div>
    <div v-if="sales.length === 0">
      <div class="content">
        <h3 class="has-text-centered">{{ absenceText }}</h3>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import sale from "../grid-sale.vue";
import MugenScroll from "vue-mugen-scroll";
import Sale from "types/Sale";

@Component({
  components: {
    sale,
    MugenScroll
  }
})
export default class FutureGridsList extends Vue {
  @Prop({ type: Array, required: true }) sales: Sale[];
  @Prop({
    type: String,
    required: false,
    default: "Нет действующих акций на данный момент"
  })
  absenceText: string;
  @Prop({ type: Boolean, required: true }) loading: boolean;

  groupedSales = {};

  created() {
    const groupedSales = {};
    /**
     * Для группировки по дате, перебираем акции и вставляем в объект в ввиде:
     * "key" : { 'date': "2018-11-23", 'sales': [] }
     */
    for (const futureSale of this.sales) {
      // делаем ключем цифры из даты
      const key = futureSale.date_start.replace(/\D/g, "");
      if (!groupedSales.hasOwnProperty(key)) {
        groupedSales[key] = {
          date: futureSale.date_start,
          sales: []
        };
      }
      groupedSales[key].sales.push(futureSale);
    }
    this.groupedSales = Object.assign({}, this.groupedSales, groupedSales);
  }

  loadMoreSales() {
    this.$emit("get-more-sales");
  }
}
</script>