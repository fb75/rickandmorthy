<template>
  <div class="characters-list">
    <h1>All characters</h1>
    <ul>
      <li
        v-for="character in characters"
        :key="character.id"
        @click.stop="openModal(character)"
      >
        <span>{{ character.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { useContext } from "@nuxtjs/composition-api";
export default {
  props: {
    characters: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const { store } = useContext();
    const openModal = (character) => {
      store.commit("setCharacter", character);
      store.commit("ui/setModalActivity", true);
    };

    return {
      openModal,
    };
  },
};
</script>
<style scoped>
.characters-list {
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly; */
}
.characters-list ul {
  list-style: none;
}
.characters-list ul span {
  cursor: pointer;
}

</style>
