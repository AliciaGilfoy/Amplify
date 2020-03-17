<template>
  <div class="container-fluid">
    <div class="row text-center">
      <div class="col-12 p-3">
        <h5>Here is a list of songs your friends think you might like!</h5>
      </div>
    </div>
    <div id="search" class="row text-center text-light">
      <div class="col-12 justify-content-center">
        <form class="row justify-content-center p-3" @submit.prevent="searchRecommends">
          <input class type="text" placeholder="search for tracks" v-model="query" />
          <button class="btn btn-secondary" type="submit">Search</button>
        </form>
      </div>
    </div>

    <div id="search-results" class="row justify-content-center">
      <song v-for="song in searchedSongs" :key="song.id" :songData="song" />
    </div>

    <div class="row justify-content-center">
      <song v-for="song in recommendedSongs" :key="song.id" :songData="song" />
    </div>
  </div>
</template>


<script>
import songsf from "../components/favSong";
import song from "../components/recSong";
export default {
  name: "Recommends",
  mounted() {
    return this.$store.dispatch("getRecommends");
  },
  data() {
    return {
      query: ""
    };
  },
  computed: {
    recommendedSongs() {
      return this.$store.state.recommendedSongs.reverse();
    },
    searchedSongs() {
      return this.$store.state.searchedSongs;
    }
  },
  methods: {
    searchRecommends() {
      this.$store.dispatch("getMusicByQueryRec", this.query);
    }
  },
  components: {
    song,
    songsf
  }
};
</script>


<style scoped>
</style>