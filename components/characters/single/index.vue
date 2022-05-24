<template>
  <article class="character">
    <img :src="image" alt="image" />
    <p>Name: {{ name }}</p>
    <p>Status: {{ status }}</p>
    <p>Gender: {{ gender }}</p>
    <p>Origin: {{ origin }}</p>
    <p>Location: {{ location }}</p>
    <div class="episodes">
      Episodes:
      <span v-for="(ep, i) in allEpisodes" :key="i">
        <small>{{ ep.episode }}</small>
        <small><strong>{{ ep.name }}</strong></small>
        <small>{{ ep.air_date }}</small>
      </span>
    </div>
  </article>
</template>

<script>
import { ref, computed } from "@nuxtjs/composition-api";
import axios from "axios";
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    creationDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    episode: {
      type: Array,
      required: false,
    },
  },
  setup(props) {
    const characterEpisodes = ref([]);
    const allEpisodes = computed(() => {
      return characterEpisodes.value;
    });

    if (props.episode.length > 0) {
      console.log(props.episode);
      Promise.all(props.episode)
        .then((data) => {
          data.forEach((el) =>
            axios.get(el).then((ep) => characterEpisodes.value.push(ep.data))
          );
        })
        .catch((e) => console.log(e));
    }

    return {
      characterEpisodes,
      allEpisodes,
    };
  },
};
</script>

<style scoped>
.character {
  width: auto;
  display: flex;
  flex-flow: column;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  gap: 0.5em;
  margin: auto;
  overflow: auto;
}
.character img {
  /* width: auto; */
  /* aspect-ratio: 1/1; */
}
.episodes {
  display: flex;
  flex-flow: column;
}
</style>
