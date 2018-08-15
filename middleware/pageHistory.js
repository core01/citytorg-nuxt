export default async ({ app, route, store }) => {
  store.commit('SET_PREVIOUS_PAGE', store.state.meta.pages.current);
  store.commit('SET_CURRENT_PAGE', route.name);
};