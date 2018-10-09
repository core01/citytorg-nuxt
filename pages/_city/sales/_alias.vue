<template>
  <div>
    <section class="sale-card">
      <div class="container mx-auto">
        <div class="content">
          <h2 class="text-center content_h2">{{ sale.title }}</h2>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-2/5 text-center">
            <no-ssr>
              <figure class="sale-card__figure">
                <div v-if="images.length > 0">
                  <gallery
                    :images="images"
                    :index="imageIndex"
                    :options="{
                      closeOnEscape: true,
                      closeOnSlideClick: true,
                      closeOnSwipeUpOrDown: true,
                      continuous: true,
                    }"
                    @close="imageIndex = null"
                  />
                  <img
                    :src="previews[0]"
                    class="preview-image"
                    @click="imageIndex = 0">
                </div>
                <img
                  v-else
                  :alt="sale.title"
                  src="~assets/images/placeholder.png"
                  class="sale-card__image"
                >
              </figure>
            </no-ssr>
          </div>
          <div class="w-full lg:w-3/5">
            <sale-type :sale="sale"/>
            <div class="py-2 px-4">
              <div
                class="has-text-left sale-card__description"
                v-html="sale.description"
              />
              <div class="sale-card-prices">
                <div class="sale-card__price-title">
                  Цена:
                </div>
                <div
                  v-if="sale.old_price"
                  class="sale-card__old-price"
                >
                  {{ sale.old_price }} ₸
                </div>
                <div class="sale-card__price">
                  {{ sale.price }} ₸
                </div>
              </div>
              <div
                v-if="sale.date_end"
                class="sale-card__date"
              >
                Окончание акции:
                <b>{{ sale.date_end | dateFormat }}</b>
              </div>

              <div class="buttons text-center sale-card-buttons">
                <a
                  v-scroll-to="'#shops'"
                  v-if="sale.shops.length > 0"
                  class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded inline-flex items-center">
                  <span>Посмотреть магазины</span>
                  <span class="justify-center items-center inline-flex w-6 h-6">
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
        </div>
        <hr class="border-none">
      </div>
    </section>

    <section
      v-if="sale.shops.length > 0"
      id="shops"
      class="shops min-h-screen"
    >
      <div class="container mx-auto">
        <div class="content">
          <h2 class="text-center content_h2">Магазины</h2>
        </div>
        <div class="mb-3 p-3">
          <shops-tabs
            :type="type"
            @switch-type="switchType"
          />
        </div>
        <shopListGrids
          v-if="type === 'grids'"
          :shops="sale.shops"
        />
        <div
          v-else
          class="container"
        >
          <shop-list-map :shops="sale.shops"/>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import navbar from '../../../components/navbar/navbar.vue';
import shopListGrids from '../../../components/shops/list/grids.vue';
import shopListMap from '../../../components/shops/list/map.vue';
import saleType from '../../../components/sales/type.vue';
import shopsTabs from '../../../components/tabs/shops.vue';

export default {
  middleware: 'saleCityCheck',
  async asyncData({app, params}) {
    let [id] = params.alias.split('-');
    let data = {};
    data.sale = await app.$axios.$get(process.env.BACKEND_URL + 'sales/' + id + '?expand=shops,city');

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
              ', срок действия, магазины',
        },
      ],
    };
  },
  components: {
    navbar,
    shopListGrids,
    shopListMap,
    saleType,
    shopsTabs,
  },
  data() {
    return {
      type: 'grids',
      UPLOADS_URL: process.env.UPLOADS_URL,
      imageIndex: null,
      images: [],
      previews: [],
    };
  },
  computed: {},
  mounted() {
    if(this.sale.images){
      for (let image of this.sale.images) {
        this.images.push(this.UPLOADS_URL + image.regular);
        this.previews.push(this.UPLOADS_URL + image.small);
      }
    }
  },
  methods: {
    switchType(type) {
      this.type = type;
    },
  },
};
</script>
<style lang="postcss" scoped>
$blue: #204b98;
$red: #e31e24;

.sale-card__title {
  font-size: 1.5rem;
  font-weight: normal;
  margin-bottom: 1.4rem;
}

.sale-card-buttons {
  margin-top: 10px;
}

.sale-card__price {
  color: $red;
  font-size: 28px;
  font-weight: bold;
  padding: 0 5px;
}

.sale-card__old-price {
  color: #f60;
  font-weight: bold;
  font-size: 22px;
  text-decoration: line-through;
  padding: 0 5px;
}

.sale-card__price-title {
  padding: 0 5px 0 0;
  font-size: 22px;
}

.sale-card-prices {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-grow: 1;
}

.sale-card__date {
  text-align: left;
  font-size: 22px;
}
</style>