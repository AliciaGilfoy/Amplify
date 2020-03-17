<template>
  <div class="container-fluid text-center">
    <div id="search" class="row text-light p-3">
      <div class="col-12 justify-content-center">
        <h1>My Favorites</h1>

        <form class="row justify-content-center" @submit.prevent="searchFavorites">
          <input class type="text" placeholder="search for tracks" v-model="query" />
          <button class="btn btn-secondary" type="submit">Search</button>
        </form>
      </div>
    </div>

    <div id="search-results" class="row justify-content-center">
      <songs v-for="song in searchedSongs" :key="song.id" :songData="song" />
    </div>

    <div class="row justify-content-center">
      <songs v-for="song in favorites" :key="song.id" :songData="song" />
    </div>
  </div>
</template>


<script>
import songs from "../components/favSong";
export default {
  name: "Favorites",
  mounted() {
    return this.$store.dispatch("getFavoritesByEmail");
  },
  data() {
    return {
      query: ""
    };
  },
  computed: {
    favorites() {
      return this.$store.state.favoriteSongs;
    },
    profile() {
      return this.$store.state.profile;
    },
    searchedSongs() {
      return this.$store.state.searchedSongs;
    }
  },
  methods: {
    searchFavorites() {
      this.$store.dispatch("getMusicByQueryFav", this.query);
    }
  },
  components: {
    songs
  }
};
</script>


<style>
h5 {
  color: white;
}
</style>