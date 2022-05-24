export const state = () => ({
  isModalVisibile: false,
});

export const mutations = {
  setModalActivity(state, payload) {
    state.isModalVisibile = payload;
  },
};

export const getters = {
  isModalActive(state) {
    return state.isModalVisibile;
  },
};
