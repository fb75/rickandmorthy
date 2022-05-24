<template>
  <div class="layout-default">
    <nuxt />
    <ui-modal v-if="$store.state.character" :character="$store.state.character" />
  </div>
</template>

<script>
import { useContext, useStore, computed } from "@nuxtjs/composition-api";
export default {
  setup() {
    const { store } = useContext();
    const { getters } = useStore();

    const isModalActive = computed(() => getters["ui/isModalActive"]);

    const modalHandler = () => {
      console.log(isModalActive.value);
      if (isModalActive.value === false) {
        store.commit("ui/setModalActivity", true);
      } else {
        store.commit("ui/setModalActivity", false);
      }
    }

    return {
      modalHandler,
      isModalActive,
    };
  },
};
</script>
