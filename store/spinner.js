export const state = () => ({
  show: false,
});

export const mutations = {
  SHOW_SPINNER(state, value) {
    state.show = value;
  },
};