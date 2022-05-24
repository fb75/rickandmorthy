<template>
  <div class="page-home">
    <h1>Rick and Morty's Character Search</h1>
    <ui-input-search />
    <main>
      <div class="list">
        <characters-list
          v-if="$store.state.characters"
          :characters="$store.state.characters"
        />
        <h3 v-else>No characters found!</h3>
      </div>
      <div class="favourites">
        <characters-favourites v-if="$store.state.favourites" />
      </div>
    </main>
    <ui-pagination />
  </div>
</template>

<style scoped>
.page-home {
  width: 90%;
  margin: auto;
  /* padding: 1em; */
}

main {
  width: 100%;
  min-height: 55vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  flex: 1 1 450px;
}
.list, .favourites {
  width: 50%;
}

@media (max-width: 768px) {
  main {
    min-height: auto;
  }
}
</style>
