<template>
  <div class="list-favourites">
    <h1>Your favourites characters</h1>
    <div
      class="character"
      v-for="(character, i) in $store.state.favourites"
      :key="i"
    >
      <p>{{ character.name }}</p>
      <button class="remove" @click="removeFromFavourites(character)">-</button>
    </div>
  </div>
</template>

<script>
import { useContext } from "@nuxtjs/composition-api";
export default {
  setup() {
    const { store } = useContext();
    const removeFromFavourites = (character) => {
      store.commit("removeFavourite", character);
    };

    return {
      removeFromFavourites,
    };
  },
};
</script>

<style scoped>
.character {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}
.character .remove {
  width: 3rem;
  padding: 0;
}
</style>
