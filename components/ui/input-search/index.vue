<template>
  <div class="input-search">
    <form @submit.prevent.stop="submitHandler()">
      <input
        class="search"
        placeholder="Search for character name"
        type="text"
        v-model="vModel.name"
      />
      <div class="filters">
        <div class="status">
          <p>Status</p>
          <label for="alive">Alive</label>
          <input
            type="checkbox"
            id="alive"
            value="alive"
            v-model="vModel.status"
            :disabled="!vModel.name || vModel.status.length > 0"
          />
          <label for="dead">Dead</label>
          <input
            type="checkbox"
            id="dead"
            value="dead"
            v-model="vModel.status"
            :disabled="!vModel.name || vModel.status.length > 0"
          />
          <label for="unknown">Unknown</label>
          <input
            type="checkbox"
            id="unknown"
            value="unknown"
            v-model="vModel.status"
            :disabled="!vModel.name || vModel.status.length > 0"
          />
        </div>
        <div class="species">
          <p>Species</p>
          <label for="human">Human</label>
          <input
            type="checkbox"
            id="human"
            value="human"
            v-model="vModel.species"
            :disabled="!vModel.name || vModel.species.length > 0"
          />
          <label for="humanoid">Humanoid</label>
          <input
            type="checkbox"
            id="humanoid"
            value="humanoid"
            v-model="vModel.species"
            :disabled="!vModel.name || vModel.species.length > 0"
          />
        </div>
        <div class="gender">
          <p>Gender</p>
          <label for="female">Female</label>
          <input
            type="checkbox"
            id="female"
            value="female"
            v-model="vModel.gender"
            :disabled="!vModel.name || vModel.gender.length > 0"
          />
          <label for="female">Male</label>
          <input
            type="checkbox"
            id="male"
            value="male"
            v-model="vModel.gender"
            :disabled="!vModel.name || vModel.gender.length > 0"
          />
          <label for="female">Genderless</label>
          <input
            type="checkbox"
            id="genderless"
            value="genderless"
            v-model="vModel.gender"
            :disabled="!vModel.name || vModel.gender.length > 0"
          />
          <label for="female">Unknown</label>
          <input
            type="checkbox"
            id="unknown"
            value="unknown"
            v-model="vModel.gender"
            :disabled="!vModel.name || vModel.gender.length > 0"
          />
        </div>
      </div>
      <div class="ctas">
        <button type="submit">Search</button>
        <button @click="resetHandler()">Reset filters</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useContext, ref, computed } from "@nuxtjs/composition-api";
export default {
  setup() {
    const { store } = useContext();
    const vModel = ref({
      name: null,
      status: [],
      species: [],
      gender: [],
    });

    const resetHandler = () => {
      vModel.value = {
        name: null,
        status: [],
        species: [],
        gender: [],
      };
    };

    const submitHandler = () => {
      if (vModel.value.name) {
        console.log(vModel.value.name);
        if (
          vModel.value.status.length === 0 &&
          vModel.value.species.length === 0 &&
          vModel.value.gender.length === 0
        ) {
          store.dispatch("searchCharacter", vModel.value.name);
        } else if (
          vModel.value.status.length > 0 &&
          vModel.value.species.length === 0 &&
          vModel.value.gender.length === 0
        ) {
          let queryParams = "";
          for (let l of vModel.value.status) {
            queryParams += `&status=${l}`;
          }
          console.log(queryParams);
          store.dispatch("searchCharacter", vModel.value.name + queryParams);
        } else if (
          vModel.value.status.length === 0 &&
          vModel.value.species.length > 0 &&
          vModel.value.gender.length === 0
        ) {
          let queryParams = "";
          for (let l of vModel.value.species) {
            queryParams += `&species=${l}`;
          }
          console.log(queryParams);
          store.dispatch("searchCharacter", vModel.value.name + queryParams);
        } else if (
          vModel.value.status.length === 0 &&
          vModel.value.species.length === 0 &&
          vModel.value.gender.length > 0
        ) {
          let queryParams = "";
          for (let l of vModel.value.gender) {
            queryParams += `&gender=${l}`;
          }
          console.log(queryParams);
          store.dispatch("searchCharacter", vModel.value.name + queryParams);
        } else {
          let queryParams = "";
          for (let l of vModel.value.status) {
            queryParams += `&status=${l}`;
          }
          for (let l of vModel.value.gender) {
            queryParams += `&gender=${l}`;
          }
          for (let l of vModel.value.species) {
            queryParams += `&species=${l}`;
          }
          console.log(queryParams);
          store.dispatch("searchCharacter", vModel.value.name + queryParams);
        }
      } else {
        document.querySelector(".search").focus();
      }
    };

    return {
      vModel,
      resetHandler,
      submitHandler,
    };
  },
};
</script>

<style>
.input-search {
  margin: 1.5rem auto;
}
form {
  width: 70%;
  display: flex;
  flex-flow: column;
  margin: auto;
  gap: 0.5rem;
}
.input-search input {
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
}

.filters {
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
}
.filters .status,
.filters .gender,
.filters .species {
  margin-bottom: 0.5rem;
}
.filters .status p,
.filters .gender p,
.filters .species p {
  font-weight: 700;
}
.filters .status input,
.filters .gender input,
.filters .species input {
  margin-right: 0.5rem;
}
.filters input {
  width: auto;
}
.ctas {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: .5em;
}
button {
  font-family: "Get Schwifty";
  font-size: 1.22rem;
  display: inline;
  background: transparent;
  cursor: pointer;
  width: 15rem;
  padding: 0.35rem;
  transition: all .15s ease-in-out;
}
button:hover {
  background: #000;
  color: #fff;
  cursor: pointer;
  width: 15rem;
  padding: 0.35rem;
}
</style>
