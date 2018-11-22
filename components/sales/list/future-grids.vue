<template>
  <div>
    <div
      v-for="(data, key) in groupedSales"
      :key="key">
      <h3 class="my-4 text-xl "><i class="fa fa-calendar-alt mr-2"/>{{ data.date | dateFormat }}</h3>
      <div class="flex flex-wrap">
        <div
          v-for="sale in data.sales"
          :key="sale.id"
          class="w-full sm:w-1/3 lg:w-1/5"
        >
          <sale :sale="sale"/>
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
<script>
import sale from '../grid-sale.vue';
import MugenScroll from 'vue-mugen-scroll';

export default {
  components: {
    sale,
    MugenScroll,
  },
  props: {
    sales: {
      type: Array,
      required: true,
    },
    absenceText: {
      type: String,
      required: false,
      default: 'Нет действующих акций на данный момент',
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      groupedSales: {},
    };
  },
  computed: {

  },
  created(){
    let groupedSales = {};
    /**
     * Для группировки по дате, перебираем акции и вставляем в объект в ввиде:
     * "key" : { 'date': "2018-11-23", 'sales': [] }
     */
    for( let sale of this.sales){
      // делаем ключем цифры из даты
      let key = sale.date_start.replace(/\D/g,'');
      if(!groupedSales.hasOwnProperty(key)){
        groupedSales[key] = {
          'date': sale.date_start,
          'sales' : [],
        };
      }
      groupedSales[key].sales.push(sale);
    }
    this.groupedSales = Object.assign({}, this.groupedSales, groupedSales);
  },
  methods: {
    loadMoreSales() {
      this.$emit('get-more-sales');
    },
  },
};
</script>