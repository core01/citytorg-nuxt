<template>
  <div>
    <section class="hero is-default is-bold">
      <div class="hero-head">
        <navbar/>
      </div>
    </section>
    <section
      class="hero is-fullheight shop">
      <div class="container">
        <div class="content">
          <h2 class="has-text-centered content_h2">{{ shop.title }}</h2>
        </div>
        <div class="columns">
          <div class="column is-4">
            <figure class="image is-4by3 shop-image">
              <img
                v-if="shop.images"
                :src="UPLOADS_URL + shop.images[0]['450x320']"
                :alt="shop.title">
              <img
                v-else
                :alt="shop.title"
                :src="'https://placehold.jp/350x250.png?text=' + shop.title">
              <div
                v-if="shop.sample"
                class="shop-image__text">Образец</div>
            </figure>

            <table class="table">
              <tbody>
                <tr>
                  <th>Адрес:</th>
                  <td>{{ shop.address }}</td>
                </tr>
                <tr>
                  <td colspan="2">{{ shop.description }}</td>
                </tr>
              </tbody>
            </table>
            <div
              v-if="sales.length >0"
              class="buttons is-centered">
              <a
                v-scroll-to="'#sales'"
                class="button is-info is-outlined">
                <span>Посмотреть акции в магазине</span>
                <span class="icon">
                  <i class="fas fa-angle-double-down"/>
              </span></a>
            </div>
            <p v-else>
              В данном магазине в настоящее время нет акций
            </p>
          </div>
          <div class="column is-8">
            <no-ssr>
              <shop-list-map
                :shops="shops"
                :zoom="13"
                :current-index="currentIndex"/>
            </no-ssr>
          </div>
        </div>
      </div>
    </section>
    <section
      v-if="shop.stalls.length > 0 || sales.length > 0"
      class="hero is-fullheight">
      <div class="container">
        <div
          v-if="shop.shopType.alias === 'network' && shop.stalls.length > 0 && sales.length > 0"
          class="tabs is-toggle">
          <ul>
            <li
              :class="{'is-active': mode === 'sales'}"
              @click.prevent="switchMode('sales')">
              <a>Список акций</a>
            </li>
            <li
              :class="{'is-active': mode === 'shops'}"
              @click.prevent="switchMode('shops')">
              <a>Список магазинов</a>
            </li>
          </ul>
        </div>
        <div class="content">
          <grid-sales
            v-if="mode === 'sales'"
            :sales="sales"
            :absence-text="absenceText"/>
          <shopListGrids
            v-else
            :shops="shops"/>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import navbar from '../../components/navbar/navbar.vue';
import gridSales from '../../components/sales/list/grids.vue';
import shopListMap from '../../components/shops/list/map.vue';
import shopListGrids from '../../components/shops/list/grids.vue';

export default {
  async asyncData({ app, params }) {
    let [id]  = params.alias.split('-');
    let data = {
      id: parseInt(id),
      shop: {},
      sales: [],
      shops: [],
    };
    data.shop = await app.$axios.$get(process.env.BACKEND_URL + 'shops/' + data.id + '?expand=sales');
    data.sales = data.shop.sales;
    // Если у нас точка торговой сети
    if(data.shop.parent !== 0){
      // Получаем магазины торговой сети по parent id
      let response = await app.$axios.$get(process.env.BACKEND_URL + 'shops/' + data.shop.parent);
      data.shops = response.stalls;
      // Получаем акции в текущей точке
      response =
      await app.$axios.$get(process.env.BACKEND_URL + 'shops/' + data.id + '?expand=sales');
      data.sales = response.sales;
      // если у нас сеть
    }else if(data.shop.shopType.alias === 'network'){
      // Получаем магазины торговой сети по id
      let response = await app.$axios.$get(process.env.BACKEND_URL + 'shops/' + data.id);
      data.shops = response.stalls;
      // Получаем акции торговой сети
      data.sales = await app.$axios.$get(process.env.BACKEND_URL + 'sales/network?id=' + data.id);
    }else{
      // Получаем магазины с акциями
      data.shops = await app.$axios.$get(process.env.BACKEND_URL + 'shops?expand=sales');
    }

    return data;
  },
  head() {
    return {
      title: this.shop.title,
      meta: [
        {
          hid: 'description',
          description:
            'Акции магазина ' +
            this.shop.title +
            ', Адрес: ' +
            this.shop.address
        }
      ]
    };
  },
  components: {
    navbar,
    gridSales,
    shopListMap,
    shopListGrids,
  },
  data() {
    return {
      absenceText: 'Информации о действующих акциях на данный момент нет',
      sales: [],
      shops: [],
      currentIndex: -1,
      shop: {},
      mode: 'sales',
    };
  },
  computed: {
    UPLOADS_URL(){
      return process.env.UPLOADS_URL;
    },
  },
  mounted() {
    if(this.shop.shopType.alias !== 'network'){
      for (let i = 0; i < this.shops.length; i++) {
        if (this.shops[i].id === this.id) {
          this.currentIndex = i;
        }
      }
    }else{
      if(this.sales.length > 0 ){
        this.switchMode('sales');
      }else{
        this.switchMode('shops');
      }
    }
  },
  methods: {
    switchMode(mode){
      this.mode = mode;
    },
  },
};
</script>
<style lang="sass" scoped>
@import ~assets/sass/variables

.sales
//  background-color: #eff3f4
  padding: 5rem 0

.sale-card_content
  margin: 0 !important

.card-image > .fa
  font-size: 8rem
  padding-top: 2rem
  padding-bottom: 2rem
  color: #209cee

.card-content .content
  font-size: 14px
  margin: 1rem 1rem

.card-content
  .content
    h4
      font-size: 16px
      font-weight: 700


.card
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  margin-bottom: 2rem;

.tile.notification
  display: flex
  justify-content: center
  flex-direction: column

.is-shady
  animation: flyintoright 0.4s backwards
  background: #fff
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 0
  border-radius: 4px
  display: inline-block
  margin: 10px
  position: relative
  transition: all 0.2s ease-in-out

.is-shady
  &:hover
    box-shadow: 0 10px 16px rgba(0, 0, 0, 0.13), 0 6px 6px rgba(0, 0, 0, 0.19)
</style>