import VeeValidate, { Validator } from "vee-validate";
import Vue from "vue";
import config from "../validator/config";

import ru from "vee-validate/dist/locale/ru";

Validator.localize("ru", ru);
Vue.use(VeeValidate, config);
