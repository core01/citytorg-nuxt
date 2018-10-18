<template>
  <div>
    <section class="shop min-h-screen">
      <div class="container mx-auto">
        <div class="content">
          <h2 class="text-center content_h2">{{ shop.title }}</h2>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-2/5 text-center">
            <div class="block">
              <no-ssr>
                <figure class="shop-image">
                  <div
                    v-if="images.length > 0">
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
                    :alt="shop.title"
                    src="~assets/images/placeholder.png"
                  >
                  <div
                    v-if="shop.sample"
                    class="shop-image__text"
                  >Образец
                  </div>
                </figure>
              </no-ssr>
              <div>
                <p>
                  Адрес: {{ shop.address }}
                </p>
                <p v-html="shop.description"/>
              </div>
              <div
                v-if="sales.length >0"
                class="buttons text-center"
              >
                <button
                  v-scroll-to="'#items'"
                  class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded inline-flex items-center"
                >
                  <span>Посмотреть акции в магазине</span>
                  <span class="justify-center items-center inline-flex w-6 h-6">
                    <i class="fas fa-angle-double-down"/>
                  </span>
                </button>
              </div>
              <p v-else>
                В данном магазине в настоящее время нет акций
              </p>
            </div>
          </div>
          <div class="w-full lg:w-3/5">
            <no-ssr>
              <shop-list-map
                :shops="shops"
                :zoom="13"
                :current-id="id"
              />
            </no-ssr>
          </div>
        </div>
      </div>
    </section>
    <section
      v-if="shop.stalls.length > 0 || sales.length > 0"
      id="items"
      class="min-h-screen"
    >
      <div class="container mx-auto">
        <div
          v-if="shop.shopType.alias === 'network' && shop.stalls.length > 0 && sales.length > 0"
          class="flex flex-wrap"
        >
          <div class="w-full lg:w-1/2">
            <div class="tabs is-toggle">
              <ul>
                <li
                  :class="{'is-active': mode === 'sales'}"
                  @click.prevent="switchMode('sales')"
                >
                  <a>Список акций</a>
                </li>
                <li
                  :class="{'is-active': mode === 'shops'}"
                  @click.prevent="switchMode('shops')"
                >
                  <a>Список магазинов</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="content">
          <grid-sales
            v-if="mode === 'sales'"
            :sales="sales"
            :absence-text="absenceText"
            :loading="false"
          />
          <shopListGrids
            v-else
            :shops="shops"
          />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import navbar from '../../../components/navbar/navbar.vue';
import gridSales from '../../../components/sales/list/grids.vue';
import shopListMap from '../../../components/shops/list/map.vue';
import shopListGrids from '../../../components/shops/list/grids.vue';

export default {
  async asyncData({app, params}) {
    let [id] = params.alias.split('-');
    let data = {
      id: parseInt(id),
      shop: {},
      sales: [],
      shops: [],
    };
    data.shop = await app.$axios.$get(process.env.BACKEND_URL + 'shops/' + data.id + '?expand=sales,shopType,stalls');
    data.sales = data.shop.sales;
    // Если у нас точка торговой сети
    if (data.shop.parent !== 0) {
      // Получаем магазины торговой сети по parent id
      let response = await app.$axios.$get(process.env.BACKEND_URL + 'shops/' + data.shop.parent + '?expand=stalls,shopType');
      data.shops = response.stalls;
      // Получаем акции в текущей точке
      response =
          await app.$axios.$get(process.env.BACKEND_URL + 'shops/' + data.id + '?expand=sales');
      data.sales = response.sales;
      // если у нас сеть
    } else if (data.shop.shopType.alias === 'network') {
      // Получаем магазины торговой сети по id
      let response = await app.$axios.$get(process.env.BACKEND_URL + 'shops/' + data.id +
      '?expand=stalls,shopType');
      data.shops = response.stalls;
      // Получаем акции торговой сети
      data.sales = await app.$axios.$get(process.env.BACKEND_URL + 'sales/network?id=' + data.id);
    } else {
      // Получаем магазины с акциями
      data.shops = await app.$axios.$get(process.env.BACKEND_URL + 'shops?expand=shopType');
    }

    return data;
  },
  head() {
    return {
      title: this.shop.title,
      meta: [
        {
          hid: 'description',
          description: 'Акции магазина ' + this.shop.title + ', Адрес: ' + this.shop.address,
        },
      ],
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
      shop: {},
      mode: 'sales',
      UPLOADS_URL: process.env.UPLOADS_URL,
      images: [],
      imageIndex: null,
      previews: [],
    };
  },
  computed: {},
  mounted() {
    if (this.shop.shopType.alias === 'network') {
      if (this.sales.length > 0) {
        this.switchMode('sales');
      } else {
        this.switchMode('shops');
      }
    }
    for (let image of this.shop.images) {
      this.images.push(this.UPLOADS_URL + image.regular);
      this.previews.push(this.UPLOADS_URL + image.small);
    }
  },
  methods: {
    switchMode(mode) {
      this.mode = mode;
    },
  },
};
</script>
<style lang="postcss" scoped>
.sales {
  padding: 5rem 0;
}

.sale-card_content {
  margin: 0 !important;
}

.card-image > .fa {
  font-size: 8rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  color: #209cee;
}

.card-content .content {
  font-size: 14px;
  margin: 1rem 1rem;
}

.card-content .content h4 {
  font-size: 16px;
  font-weight: 700;
}

.card {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  margin-bottom: 2rem;
}

.tile.notification {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.is-shady {
  animation: flyintoright 0.4s backwards;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 0;
  border-radius: 4px;
  display: inline-block;
  margin: 10px;
  position: relative;
  transition: all 0.2s ease-in-out;
}

.is-shady:hover {
  box-shadow: 0 10px 16px rgba(0, 0, 0, 0.13), 0 6px 6px rgba(0, 0, 0, 0.19);
}
</style>