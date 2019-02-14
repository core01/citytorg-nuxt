export default async ({ route, store }) => {
  store.commit("pages/SET_PREVIOUS", store.state.pages.current);
  store.commit("pages/SET_CURRENT", route.name);
};
