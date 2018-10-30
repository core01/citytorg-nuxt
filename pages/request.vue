<template>
  <section class="min-h-screen">
    <div class="container mx-auto px-1 md:px-0">
      <div class="content">
        <form
          class="request-form  text-black-tundora"
          data-vv-scope="request-form"
        >
          <h2 class="text-center content_h2">Форма обратной связи</h2>

          <div class="mb-3">
            <label class="block font-bold mb-2">Как вас зовут?</label>
            <input
              v-validate="'required'"
              v-model="name"
              :class="{'border-red': errors.first('request-form.name')}"
              name="name"
              class="appearance-none block w-full text-grey-darker border rounded p-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Например: Роман Андреевич"
            >
            <p
              v-show="errors.has('request-form.name')"
              class="text-red text-xs italic"
            >
              {{ errors.first('request-form.name') }}
            </p>
          </div>

          <div class="mb-3">
            <label class="block font-bold mb-2">Email</label>
            <input
              v-validate="'required|email'"
              v-model="email"
              :class="{'border-red': errors.first('request-form.email')}"
              name="email"
              class="appearance-none block w-full text-grey-darker border rounded p-2 leading-tight focus:outline-none"
              type="email"
              placeholder="Например: info@citytorg.kz"
            >
            <p
              v-show="errors.has('request-form.email')"
              class="text-red text-xs italic"
            >
              {{ errors.first('request-form.email') }}
            </p>
          </div>
          <div class="mb-3">
            <label class="block font-bold mb-2">Телефон</label>
            <input
              v-validate="'required'"
              v-model="phone"
              :class="{'border-red': errors.first('request-form.phone')}"
              name="phone"
              class="appearance-none block w-full text-grey-darker border rounded p-2 leading-tight focus:outline-none"
              type="text"
              placeholder="+77012345678"
            >
            <p
              v-show="errors.has('request-form.phone')"
              class="text-red text-xs italic"
            >
              {{ errors.first('request-form.phone') }}
            </p>
          </div>

          <div class="mb-3">
            <label class="block font-bold mb-2">Кто вы?</label>
            <label>
              <input
                v-validate="'required'"
                v-model="type"
                type="radio"
                name="type"
                value="Поставщик/Производитель"
              > Поставщик/Производитель
            </label>
            <label>
              <input
                v-validate="'required'"
                v-model="type"
                type="radio"
                name="type"
                value="Магазин"
              > Магазин
            </label>
            <label>
              <input
                v-validate="'required'"
                v-model="type"
                type="radio"
                name="type"
                value="Частное лицо"
              > Частное лицо
            </label>
            <p
              v-show="errors.has('request-form.type')"
              class="text-red text-xs italic"
            >
              {{ errors.first('request-form.type') }}
            </p>
          </div>

          <div class="mb-3">
            <label class="block font-bold mb-2">Тема обращения</label>
            <div class="relative inline-block">
              <select
                v-validate="'required'"
                v-model="subject"
                name="subject"
                class="block appearance-none border p-2 pr-8 rounded leading-tight focus:outline-none bg-white"
              >
                <option value="Заявка на участие в проекте Citytorg.kz">Заявка на участие в проекте Citytorg.kz
                </option>
                <option value="Прочие вопросы">Прочие вопросы</option>
              </select>
              <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            <p
              v-show="errors.has('request-form.subject')"
              class="text-red text-xs italic"
            >
              {{ errors.first('request-form.subject') }}
            </p>
          </div>
          <div class="mb-3">
            <label class="block font-bold mb-2">Сообщение</label>
            <textarea
              v-validate="'required'"
              v-model="message"
              :class="{'border-red': errors.first('request-form.message')}"
              name="message"
              class="w-full appearance-none block w-full text-grey-darker border rounded p-2 leading-tight focus:outline-none"
              rows="6"
              placeholder="Например: Магазин Восток, адрес: ул. Независимости 10, хочу участвовать в проекте, что для этого нужно?"
            />
            <p
              v-show="errors.has('request-form.message')"
              class="text-red text-xs italic"
            >
              {{ errors.first('request-form.message') }}
            </p>
          </div>
          <div
            v-if="error || success"
            :class="{'bg-red-lightest border-red text-red-dark': error, 'bg-blue-lightest border-blue text-blue-dark': success }"
            class=" border-t border-b px-4 py-3 mb-3"
            role="alert">
            <p class="text-sm">{{ statusText }}</p>
          </div>
          <div>
            <button
              class="inline-block border py-2 px-3 rounded cursor-pointer border-blue-matisse bg-blue-matisse text-white"
              @click.prevent="sendMessage"
            >Отправить
            </button>
            <button
              class="inline-block py-2 px-3 cursor-pointer underline ml-2  text-black-tundora"
              @click="reset"
            >Сбросить
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import navbar from '../components/navbar/navbar.vue';

export default {
  head: {
    title: 'Обратная связь',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Форма обратной связи',
      },
    ],
  },
  components: {
    navbar,
  },
  data() {
    return {
      email: '',
      name: '',
      subject: 'Заявка на участие в проекте Citytorg.kz',
      type: 'Поставщик/Производитель',
      message: '',
      phone: '',
      error: false,
      success: false,
      statusText: '',
    };
  },
  methods: {
    reset() {
      this.email = '';
      this.name = '';
      this.message = '';
      this.phone = '';
    },
    sendMessage() {
      let vm = this;
      vm.error = false;
      vm.success = false;
      this.$validator.validateAll('request-form').then(result => {
        if (result) {
          vm.$store.commit('SHOW_SPINNER', true);
          vm.$axios.$post('/application', vm.$data).then(response => {
            vm.$store.commit('SHOW_SPINNER', false);
            vm.pending = false;
            if (response.status) {
              vm.success = true;
              vm.statusText = 'Ваше обращение успешно отправлено!';
            } else {
              vm.error = true;
              vm.statusText = 'Ошибка при отправке сообщения, пожалуйста попробуйте позже!';
            }
          });
        } else {
          // notification
          vm.error = true;
          vm.statusText = 'Ошибка при заполнении формы, пожалуйста проверьте все поля и попробуйте снова!';
        }
      });

    },
  },
};
</script>
<style lang="postcss" scoped>
.request-form {
  margin-bottom: 2em;
}
@screen sm {
  .request-form {
    width: 100%;
  }
}
@screen md {
  .request-form {
    width: 700px;
  }
}
@screen lg {
  .request-form {
    width: 60%;
    margin: 0 auto 2em auto;
  }
}
</style>