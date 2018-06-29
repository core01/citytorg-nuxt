<template>
  <div>
    <section class="hero is-default is-bold">
      <div class="hero-head">
        <navbar/>
      </div>

    </section>
    <section class="hero  sale-card">
      <div class="container has-text-centered">
        <div class="content">
          <h2 class="has-text-centered content_h2">{{ sale.title }}</h2>
        </div>
        <div class="columns">
          <div class="column is-4">
            <figure class="image is-4by3 sale-card__figure">
              <img
                v-if="sale.images"
                :src="UPLOADS_URL + sale.images[0]['450x320']"
                :alt="sale.title"
                class="sale-card__image">
              <img
                v-else
                :alt="sale.title"
                src="https://via.placeholder.com/350x250"
                class="sale-card__image">
            </figure>

          </div>
          <div class="column is-8">
            <sale-type :sale="sale"/>
            <div
              class="has-text-left sale-card__description"
              v-html="sale.description"/>
            <div class="sale-card-prices">
              <div class="sale-card__price-title">
                Цена:
              </div>
              <div
                v-if="sale.old_price"
                class="sale-card__old-price">
                {{ sale.old_price }} ₸
              </div>
              <div class="sale-card__price">
                {{ sale.price }} ₸
              </div>
            </div>
            <div
              v-if="sale.date_end"
              class="sale-card__date">
              Окончание акции:
              <b>{{ sale.date_end | dateFormat }}</b>
            </div>
            <div class="buttons is-centered sale-card-buttons">
              <a
                v-scroll-to="'#shops'"
                class="button is-info is-outlined">
                <span>Посмотреть магазины</span>
                <span class="icon">
                  <i class="fa fa-angle-double-down"/>
                </span>
              </a>
              <a
                v-if="sale.link"
                :href="sale.link"
                target="_blank"
                class="button is-link is-outlined"
              >
                <span>Прочитать в блоге</span>
                <span class="icon">
                  <i class="fa fa-book"/>
                </span>
              </a>
            </div>
          </div>
        </div>
        <hr>
      </div>
    </section>

    <section
      id="shops"
      class="hero is-fullheight shops">
      <div class="container">
        <div class="content">
          <h2 class="has-text-centered content_h2">Магазины</h2>
        </div>
        <div class="tabs is-toggle">
          <ul>
            <li
              :class="{'is-active': mode === 'list'}"
              @click.prevent="switchMode('list')">
              <a>Список магазинов</a>
            </li>
            <li
              :class="{'is-active': mode === 'map'}"
              @click.prevent="switchMode('map')">
              <a>Магазины на карте</a>
            </li>
          </ul>
        </div>
        <shopListGrids
          v-if="mode === 'list'"
          :shops="sale.shops"/>
        <div
          v-else
          class="container">
          <shop-list-map
            :shops="sale.shops"/>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import navbar from '../../components/navbar/navbar.vue';
import shopListGrids from '../../components/shops/list/grids.vue';
import shopListMap from '../../components/shops/list/map.vue';
import saleType from '../../components/sales/type.vue';
import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  sanitize: true,
  smartLists: true,
  smartypants: true
});
export default {
  async asyncData({ app, params }) {
    let [id]  = params.alias.split('-');
    let data = {};
    data.sale = await app.$axios.$get(process.env.BACKEND_URL + 'sales/' + id + '?expand=shops');

    return data;
  },
  head() {
    return {
      title: this.sale.title,
      meta: [
        {
          hid: 'description',
          description:
            'Условия акции' +
            this.sale.title +
            ', срок действия, магазины'
        }
      ]
    };
  },
  components: {
    navbar,
    shopListGrids,
    shopListMap,
    saleType
  },
  data() {
    return {
      mode: 'list'
    };
  },
  computed: {
    UPLOADS_URL(){
      return process.env.UPLOADS_URL;
    },
  },
  mounted() {},
  methods: {
    switchMode(mode) {
      this.mode = mode;
    }
  }
};
</script>
<style lang="sass" scoped>

@import ~assets/sass/variables

.sale-card__title
  font-size: 1.5rem
  font-weight: normal
  margin-bottom: 1.4rem
// .shops
//   background-color: #eff3f4
.sale-card-buttons
  margin-top: 10px

.sale-card__price
  color: $red
  font-size: 28px
  font-weight: bold
  padding: 0 5px
.sale-card__old-price
  color: #f60
  font-weight: bold
  font-size: 22px
  text-decoration: line-through
  padding: 0 5px
.sale-card__price-title
  padding: 0 5px 0 0
  font-size: 22px
.sale-card-prices
  display: flex
  justify-content: flex-start
  align-items: flex-end
  flex-grow: 1


.sale-card__date
  text-align: left
  font-size: 22px
</style>