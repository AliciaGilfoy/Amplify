<template>
  <div class="col-11 song">
    <div class="row bg-pers p-3">
      <div class="col-12 text-center pb-3">
        <button class="btn btn-sm btn-primary" @click="recommendTo">recommend to...</button>
        <button class="btn btn-sm btn-secondary" @click="addToFavorites">add to favorites</button>
      </div>
      <div class="col-4 text-center">
        <img :src="songData.albumArtSmall" alt />
      </div>
      <div class="col-8 text-left">
        <p>
          <b>{{songData.title}}</b>
        </p>
        <p>{{songData.artist}}</p>
        <p>{{songData.album}}</p>
      </div>
      <div class="col-12 audio">
        <audio controls>
          <source :src="songData.preview" type="audio/ogg" />
        </audio>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <br />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "song",
  props: ["songData"],
  data() {
    return {};
  },
  computed: {
    songs() {
      return this.$store.state.searchedSongs;
    },
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    addToFavorites() {
      //checked song.id passes
      this.newFavorite = {
        artist: this.songData.artist,
        album: this.songData.album,
        title: this.songData.title,
        preview: this.songData.preview,
        price: this.songData.price,
        id: this.songData.id,
        albumArt: this.songData.albumArt,
        albumArtSmall: this.songData.albumArtSmall,
        albumArtLarge: this.songData.albumArtLarge
      };
      this.$store.dispatch("addToFavorites", this.newFavorite);
      this.$swal("Success!", "This song is now in your favorites", "success");
    },
    recommendTo() {
      let song = this.songData;
      let creatorEmail = this.profile.email;
      this.$swal({
        title: "Recommend this song to...",
        input: "email",
        inputPlaceholder: "Enter your friend's email",
        showCloseButton: true
      }).then(email => {
        this.$store.dispatch("recommendToFromSearch", {
          email,
          song,
          creatorEmail
        });
      });
    }
  },
  components: {}
};
</script>


<style scoped>
.bg-pers {
  background-color: rgba(162, 51, 218, 0.35);
}
@media only screen and (min-width: 768px) {
  .audio {
    padding-left: 30vw;
  }
}
</style>