<template>
  <div>
    <section class="sale-card">
      <div class="container mx-auto px-1 md:px-0">
        <div class="content">
          <h2 class="text-center content_h2">
            {{ sale.title }}
          </h2>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-2/5 text-center">
            <no-ssr>
              <figure class="mb-6">
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
                    @click="imageIndex = 0"
                  />
                </div>
                <img
                  v-else
                  :alt="sale.title"
                  src="~assets/images/placeholder.png"
                  class="sale-card__image"
                />
              </figure>
            </no-ssr>
          </div>
          <div class="w-full lg:w-3/5">
            <div class="flex justify-start text-center text-sm mb-2">
              <nuxt-link
                v-if="sale.category"
                :to="{
                  name: 'categories-alias',
                  params: {
                    alias: sale.category.id + '-' + sale.category.alias,
                    fetchData: true,
                  },
                }"
                class="self-start bg-transparent text-grey-darker py-1 px-2 mr-2 border border-grey rounded no-underline hover:bg-grey-lighter"
              >
                {{ sale.category.title }}
              </nuxt-link>
              <sale-class :sale="sale" />
            </div>
            <div class="py-2 text-lg">
              <div v-html="sale.description" />
              <div class="flex justify-start flex-grow items-center">
                <div class="">
                  Цена:
                </div>
                <div class="text-2xl font-bold text-red-akcion px-2">
                  {{ sale.price }} ₸
                </div>
                <div
                  v-if="sale.old_price"
                  class="text-2xl font-bold text-blue-matisse line-through"
                >
                  {{ sale.old_price }} ₸
                </div>
              </div>
              <div v-if="sale.future" class="text-lg">
                Начало акции: <b>{{ sale.date_start | dateFormat }}</b>
              </div>
              <div v-if="sale.date_end" class="text-lg">
                Окончание акции:
                <b>{{ sale.date_end | dateFormat }}</b>
              </div>

              <div class="buttons mt-2">
                <a
                  v-if="sale.shops.length > 0"
                  v-scroll-to="'#shops'"
                  class="cursor-pointer bg-transparent hover:bg-blue-matisse text-blue-matisse hover:text-white py-1 px-2 border border-blue-matisse hover:border-transparent rounded inline-flex items-center text-base"
                >
                  <span>Посмотреть магазины</span>
                  <span class="justify-center items-center inline-flex w-5 h-5">
                    <i class="fa fa-caret-down" />
                  </span>
                </a>
                <a
                  v-if="sale.link"
                  :href="sale.link"
                  target="_blank"
                  class="cursor-pointer bg-transparent hover:bg-blue-matisse text-blue-matisse hover:text-white py-1 px-2 border border-blue-matisse hover:border-transparent rounded inline-flex items-center text-base"
                >
                  <span>Прочитать в блоге</span>
                  <span class="justify-center items-center inline-flex w-6 h-6">
                    <i class="fa fa-book" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr class="border-none" />
      </div>
    </section>

    <section v-if="sale.shops.length > 0" id="shops" class="shops min-h-screen">
      <div class="container mx-auto px-1 md:px-0">
        <div class="content">
          <h2 class="text-center content_h2">
            Магазины
          </h2>
        </div>
        <div class="mb-3 p-3">
          <shops-tabs :mode="mode" @switch-mode="switchMode" />
        </div>
        <shopListGrids v-if="mode === 'grids'" :shops="sale.shops" />
        <div v-else class="container">
          <shop-list-map :shops="sale.shops" />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import shopListGrids from '../../../components/shops/list/grids.vue';
import shopListMap from '../../../components/shops/list/map.vue';
import saleClass from '../../../components/sales/class.vue';
import shopsTabs from '../../../components/tabs/shops.vue';

export default {
  middleware: 'saleCityCheck',
  components: {
    shopListGrids,
    shopListMap,
    saleClass,
    shopsTabs,
  },
  data() {
    return {
      mode: 'grids',
      imageIndex: null,
      images: [],
      previews: [],
    };
  },
  computed: {},
  async asyncData({ app, params }) {
    let [id] = params.alias.split('-');
    let data = {};
    data.sale = await app.$axios.$get('api/sales/' + id + '?expand=shops,city');

    return data;
  },
  head() {
    return {
      title: this.sale.title,
      meta: [
        {
          hid: 'description',
          description:
            'Условия акции' + this.sale.title + ', срок действия, магазины',
        },
      ],
    };
  },
  mounted() {
    if (this.sale.images) {
      for (let image of this.sale.images) {
        this.images.push('/' + image.regular);
        this.previews.push('/' + image.small);
      }
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
.sale-card__image {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
}
</style>
