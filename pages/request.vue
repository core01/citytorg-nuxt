<template>
  <div>
    <section class="hero is-default is-bold">
      <div class="hero-head">
        <navbar/>
      </div>
    </section>
    <section class="hero is-fullheight">
      <div class="container">
        <div class="content">
          <form
            class="request-form"
            data-vv-scope="request-form">
            <h2 class="has-text-centered content_h2">Форма обратной связи</h2>
            <div class="field">
              <label class="label">Как вас зовут?</label>
              <div class="control has-icons-left">
                <input
                  v-validate="'required'"
                  v-model="name"
                  :class="{'is-danger': errors.first('request-form.name')}"
                  name="name"
                  class="input"
                  type="text"
                  placeholder="Например: Роман Андреевич">
                <span class="icon is-small is-left">
                  <i class="fas fa-user" />
                </span>
                <span
                  v-show="errors.has('request-form.name')"
                  class="help is-danger">
                  {{ errors.first('request-form.name') }}
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control has-icons-left">
                <input
                  v-validate="'required|email'"
                  v-model="email"
                  :class="{'is-danger': errors.first('request-form.email')}"
                  name="email"
                  class="input"
                  type="email"
                  placeholder="Например: info@citytorg.kz">
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope" />
                </span>
                <span
                  v-show="errors.has('request-form.email')"
                  class="help is-danger">
                  {{ errors.first('request-form.email') }}
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Телефон</label>
              <div class="control has-icons-left">
                <input
                  v-validate="'required'"
                  v-model="phone"
                  :class="{'is-danger': errors.first('request-form.phone')}"
                  name="phone"
                  class="input"
                  type="text"
                  placeholder="+77012345678">
                <span class="icon is-small is-left">
                  <i class="fas fa-mobile-alt" />
                </span>
                <span
                  v-show="errors.has('request-form.phone')"
                  class="help is-danger">
                  {{ errors.first('request-form.phone') }}
                </span>
              </div>
            </div>
            <div class="field">
              <div class="label">Кто вы?</div>
              <div class="control">
                <label class="radio">
                  <input
                    v-validate="'required'"
                    v-model="type"
                    type="radio"
                    name="type"
                    value="Поставщик/Производитель">
                  Поставщик/Производитель
                </label>
                <label class="radio">
                  <input
                    v-validate="'required'"
                    v-model="type"
                    type="radio"
                    name="type"
                    value="Магазин">
                  Магазин
                </label>
                <label class="radio">
                  <input
                    v-validate="'required'"
                    v-model="type"
                    type="radio"
                    name="type"
                    value="Частное лицо">
                  Частное лицо
                </label>
                <span
                  v-show="errors.has('request-form.type')"
                  class="help is-danger">
                  {{ errors.first('request-form.type') }}
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Тема обращения</label>
              <div class="control">
                <div
                  :class="{'is-danger': errors.first('request-form.subject')}"
                  class="select">
                  <select
                    v-validate="'required'"
                    v-model="subject"
                    name="subject">
                    <option value="Заявка на участие в проекте Citytorg.kz">Заявка на участие в проекте Citytorg.kz</option>
                    <option value="Прочие вопросы">Прочие вопросы</option>
                  </select>
                </div>
                <span
                  v-show="errors.has('request-form.subject')"
                  class="help is-danger">
                  {{ errors.first('request-form.subject') }}
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label">Сообщение</label>
              <div class="control">
                <textarea
                  v-validate="'required'"
                  v-model="message"
                  :class="{'is-danger': errors.first('request-form.message')}"
                  name="message"
                  class="textarea"
                  placeholder="Например: Магазин Восток, адрес: ул. Независимости 10, хочу участвовать в проекте, что для этого нужно?"
                />
                <span
                  v-show="errors.has('request-form.message')"
                  class="help is-danger">
                  {{ errors.first('request-form.message') }}
                </span>
              </div>
            </div>
            <div
              v-if="error || success"
              :class="{'is-danger': error, 'is-primary': success }"
              class="notification">{{ statusText }}</div>
            <div class="field is-grouped">
              <div class="control">
                <button
                  class="button is-link"
                  @click.prevent="sendMessage">Отправить</button>
              </div>
              <div class="control">
                <button
                  class="button is-text"
                  @click="reset">Сбросить</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
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
        content: 'Форма обратной связи'
      }
    ]
  },
  components: {
    navbar
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
      statusText: ''
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

    }
  }
};
</script>
<style lang="sass" scoped>

@import ~bulma/sass/utilities/_all
.request-form
  margin-bottom: 2em
+mobile
  .request-form
    width: 100%
+tablet
  .request-form
    width: 700px
+desktop
  .request-form
    width: 60%
    margin: 0 auto 2em auto

</style>