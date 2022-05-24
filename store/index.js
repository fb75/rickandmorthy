import axios from "axios";

export const state = () => ({
  characters: null,
  info: null,
  character: null,
  favourites: [],
});

export const mutations = {
  setCharacters(state, data) {
    state.characters = data;
  },
  setInfo(state, data) {
    state.info = data;
  },
  setCharacter(state, data) {
    state.character = data;
  },
  addFavourite(state) {
    const isCharacterAdded = state.favourites.some(
      (el) => el === state.character
    );
    if (!isCharacterAdded) state.favourites.push(state.character);
  },
  removeFavourite(state, payload) {
    console.log(payload);
    const elIndex= state.favourites.findIndex((el) => el === payload);
    state.favourites.splice(elIndex, 1)
  },
};

export const actions = {
  async loadCharacters({ commit }) {
    console.log("%cLoading characters", "color: magenta;");

    await axios
      .get(`https://rickandmortyapi.com/api/character`)
      .then((data) => {
        commit("setCharacters", data.data.results);
        commit("setInfo", data.data.info);
      })
      .catch((error) => {
        console.log("An error occurred fetching data!");
      });
  },
  async searchCharacter({ commit }, payload) {
    console.log("ACTION------------->", payload);
    await axios
      .get(`https://rickandmortyapi.com/api/character?name=${payload}`)
      .then((data) => {
        commit("setCharacters", data.data.results);
      })
      .catch((error) => {
        commit("setCharacters", null);
        console.log("An error occurred fetching data!");
      });
  },
  async pageLoad({ commit }, payload) {
    console.log("ACTION------------->", payload);
    await axios
      .get(`https://rickandmortyapi.com/api/character/?page=${payload}`)
      .then((data) => {
        commit("setCharacters", data.data.results);
      })
      .catch((error) => {
        commit("setCharacters", null);
        console.log("An error occurred fetching data!");
      });
  },

  async nuxtServerInit({ dispatch }) {
    await dispatch("loadCharacters");
  },
};
