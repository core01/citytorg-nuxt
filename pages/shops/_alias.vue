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
                :src="shop.images[0]['450x320']"
                :alt="shop.title">
              <img
                v-else
                :alt="shop.title"
                src="http://via.placeholder.com/350x250" >
              <div class="shop-image__text">Образец</div>
            </figure>

            <table class="table">
              <tbody>
                <tr v-if="shop.phone">
                  <th>Телефон:</th>
                  <td>{{ shop.phone }}</td>
                </tr>
                <tr>
                  <th>Адрес:</th>
                  <td>{{ shop.address }}</td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    v-html="shop.description"/>
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
            <shop-list-map
              :shops="shops"
              :zoom="13"
              :current-index="currentIndex"/>
          </div>
        </div>
      </div>
    </section>
    <section
      v-if="sales.length > 0"
      id="sales"
      class="hero is-fullheight sales">
      <grid-sales
        :sales="sales"
        absence-text="absence_text"/>
    </section>
  </div>
</template>
<script>
import navbar from '../../components/navbar/navbar.vue';
import gridSales from '../../components/sales/list/grids.vue';
import shopListMap from '../../components/shops/list/map.vue';
// import { createClient } from '~/plugins/contentful.js';
// const client = createClient();
export default {
  async asyncData({ app, params }) {
    let [id]  = params.alias.split('-');
    id = parseInt(id);
    let data = {
      shop: {},
      sales: [],
      shops: [],
      currentIndex: -1
    };
    data.shops = await app.$axios.$get(process.env.BACKEND_URL + 'shops');
    for (let i = 0; i < data.shops.length; i++) {
      if (data.shops[i].id === id) {
        data.shop = data.shops[i];
        // console.log(data.shop);
        data.currentIndex = i;
        data.sales = data.shop.sales;
      }
    }
    // console.log(data.shop);
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
    shopListMap
  },
  data() {
    return {
      absence_text: 'Информации о действующих акциях на данный момент нет'
    };
  },
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import ~assets/sass/variables

.sales
  background-color: #eff3f4
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