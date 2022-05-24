<template>
  <div class="modal" :class="modalClass">
    <characters-single
      :name="character.name"
      :creation-date="dateUS"
      :status="character.status"
      :gender="character.gender"
      :origin="character.origin['name']"
      :location="character.location['name']"
      :image="character.image"
      :episode="character.episode"
    />
    <div class="ctas">
      <button @click="closeModal">close</button>
      <button @click="addToFavourites">Add to favourites</button>
    </div>
  </div>
</template>

<script>
import { computed, useContext, useStore } from "@nuxtjs/composition-api";
export default {
  props: {
    character: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    const { store } = useContext();
    const { getters } = useStore();
    const isModalActive = computed(() => getters["ui/isModalActive"]);
    const dateUS = computed(() => {
      let d = new Date(props.character.created);
      return d.toLocaleDateString("en-US");
    });
    const modalClass = computed(() =>
      !isModalActive.value ? "closed" : "open"
    );
    const closeModal = () => {
      store.commit("setCharacter", null);
      store.commit("ui/setModalActivity", false);
    };
    const addToFavourites = () => {
      store.commit("addFavourite");
      store.commit("ui/setModalActivity", false);
    };

    return {
      dateUS,
      isModalActive,
      modalClass,
      closeModal,
      addToFavourites,
    };
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  display: flex;
  flex-flow: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  width: 100%;
  height: 100vh;
  padding: 3em;
  transition: all 0.5s ease-in-out;
  z-index: 999;
}
.closed {
  top: 100%;
}
.open {
  top: 0;
}
.ctas {
  width: 70%;
  justify-content: space-between;
  display: flex;
}
.ctas button {
  cursor: pointer;
  background: #ffff;
  color: #000;
}
</style>
