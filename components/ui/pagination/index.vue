<template>
  <div class="pagination">
    <button class="control" @click="gotoPage(1)">first</button>
    <button class="control" @click="pageBack()">back</button>
    <div v-for="(page, i) in slicedPages" :key="i">
      <button
        class="control"
        :class="{ active: page === currentPage }"
        @click="pagesHandler(page, i)"
      >
        {{ page }}
      </button>
    </div>
    <button class="control" @click="pageForward()">forward</button>
    <button class="control" @click="gotoPage($store.state.info.pages)">
      last
    </button>
  </div>
</template>

<script>
import { ref, computed, onMounted, useContext } from "@nuxtjs/composition-api";
export default {
  setup() {
    const { store } = useContext();

    const currentPage = ref(1);
    const pagesArray = ref([]);
    const totalPages = store.state.info.pages;

    onMounted(() => {
      for (let i = 1; i <= totalPages / 7; i++) {
        pagesArray.value.push(i);
      }
    });

    const slicedPages = computed(() => {
      return pagesArray.value;
    });

    const spliceHelperHandler = (array) => {
      pagesArray.value.splice(0, pagesArray.value.length, ...array);
    };

    const loopHelperHandler = () => {
      let arr = [];
      if (currentPage.value >= 1 && currentPage.value <= totalPages - 5) {
        for (let j = currentPage.value; j <= currentPage.value + 5; j++) {
          arr.push(j);
        }
        spliceHelperHandler(arr);
      } else if (
        currentPage.value > totalPages - 5 &&
        currentPage.value <= totalPages
      ) {
        for (let j = 37; j <= totalPages; j++) {
          arr.push(j);
        }
        spliceHelperHandler(arr);
      } else if (currentPage.value <= totalPages - 4) {
        for (let j = currentPage.value; j <= currentPage.value + 5; j++) {
          arr.push(j);
        }
        spliceHelperHandler(arr);
      }
    };

    const pageBack = () => {
      console.log(currentPage.value);
      if (currentPage.value > 1) {
        currentPage.value--;
        pageLoadHandler((currentPage.value));
      }
      loopHelperHandler();
    };

    const pageForward = () => {
      if (currentPage.value < totalPages) {
        currentPage.value++;
        pageLoadHandler((currentPage.value));
      }
      loopHelperHandler();
    };

    const pagesHandler = (page) => {
      currentPage.value = page;
      pageLoadHandler(page);
      loopHelperHandler();
    };

    const gotoPage = (page) => {
      currentPage.value = page;
      pageLoadHandler(page);
      loopHelperHandler();
    };

    const pageLoadHandler = (page) => {
      store.dispatch("pageLoad", page);
    };

    return {
      currentPage,
      pagesArray,
      slicedPages,
      totalPages,
      gotoPage,
      loopHelperHandler,
      pagesHandler,
      pageBack,
      pageForward,
      pageLoadHandler,
      spliceHelperHandler,
    };
  },
};
</script>

<style scoped>
.pagination {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* margin: 2rem 0; */
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
}
.pagination .control {
  width: 5rem;
}
.active {
  background: gray;
}
</style>
