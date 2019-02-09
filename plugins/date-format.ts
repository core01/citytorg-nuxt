import Vue from "vue";
import moment from "moment";

Vue.filter("dateFormat", value => {
  if (!value) return "";
  moment.locale("ru");

  return moment(value).format("LL");
});
