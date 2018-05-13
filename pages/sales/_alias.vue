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
          <h2 class="has-text-centered content_h2">{{ sale.fields.title }}</h2>
        </div>
        <div class="columns">
          <div class="column is-4">
            <figure class="image is-4by3 sale-card__figure">
              <img
                v-if="sale.fields.photos"
                :src="sale.fields.photos[0].fields.file.url"
                :alt="sale.fields.title"
                class="sale-card__image">
              <img
                v-else
                :alt="shop.fields.title"
                src="http://via.placeholder.com/350x250"
                class="sale-card__image">
            </figure>

          </div>
          <div class="column is-8">
            <sale-type :types="sale.fields.type"/>
            <div
              class="has-text-left sale-card__description"
              v-html="sale.fields.description"/>
            <div class="sale-card-prices">
              <div class="sale-card__price-title">
                Цена:
              </div>
              <div
                v-if="sale.fields.old_price"
                class="sale-card__old-price">
                {{ sale.fields.old_price }} ₸
              </div>
              <div class="sale-card__price">
                {{ sale.fields.price }} ₸
              </div>
            </div>
            <div
              v-if="sale.fields.date_end"
              class="sale-card__date">
              Окончание акции:
              <b>{{ sale.fields.date_end | dateFormat }}</b>
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
                v-if="sale.fields.blog_link"
                :href="sale.fields.blog_link"
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
          :shops="sale.fields.shops"/>
        <div
          v-else
          class="container">
          <shop-list-map
            :shops="sale.fields.shops"/>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import navbar from '../../components/navbar/navbar.vue'
import shopListGrids from '../../components/shops/list/grids.vue'
import shopListMap from '../../components/shops/list/map.vue'
import saleType from '../../components/sales/type.vue'
import { createClient } from '~/plugins/contentful.js'
import marked from 'marked'

const client = createClient()

marked.setOptions({
  renderer: new marked.Renderer(),
  sanitize: true,
  smartLists: true,
  smartypants: true
})
export default {
  async asyncData({ env, params }) {
    let saleData = {}
    await client
      .getEntries({
        content_type: 'sales',
        order: '-sys.createdAt',
        'fields.alias': params.alias
      })
      .then(async entries => {
        saleData.sale = entries.items[0]
        saleData.sale.fields.description = marked(
          saleData.sale.fields.description
        )
        // salesData.shop = entries.items[0];
        // await client.getEntries({
        //   'links_to_entry': shopData.shop.sys.id
        // }).then(entries => {
        //   shopData['sales'] = entries.items
        // }).catch(error => {
        //   console.log(error)
        // })
      })
    return saleData
  },
  head() {
    return {
      title: this.sale.fields.title,
      meta: [
        {
          hid: 'description',
          description:
            'Условия акции' +
            this.sale.fields.title +
            ', срок действия, магазины'
        }
      ]
    }
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
    }
  },
  mounted() {},
  methods: {
    switchMode(mode) {
      this.mode = mode
    }
  }
}
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
