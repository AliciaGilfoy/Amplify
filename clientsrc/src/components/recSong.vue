<template>
  <div class="col-11 song">
    <div class="row bg-pers p-3">
      <div class="col-12 text-center pb-3">
        <button class="btn btn-sm btn-primary" @click="recommendTo">recommend to...</button>
        <button class="btn btn-sm btn-secondary" @click="addToFavorites">add to favorites</button>
      </div>

      <div class="col-12">
        <br />
      </div>

      <div class="col-4 text-center">
        <img :src="songData.song.albumArtSmall" alt />
      </div>
      <div class="col-8 text-left text-light">
        <p>
          <b>{{songData.song.title}}</b>
        </p>
        <p>{{songData.song.artist}}</p>
        <p>{{songData.song.album}}</p>
      </div>

      <div class="col-12 text-center">
        <audio controls>
          <source :src="songData.song.preview" type="audio/ogg" />
        </audio>
      </div>
      <div class="col-12 buttons">
        <button
          class="btn btn-info btn-outline-success text-light col-6 col-md-4"
          @click="like"
        >Like</button>
        <button
          class="btn btn-warning btn-outline-danger text-light col-6 col-md-4"
          @click="mehThis"
        >Meh</button>
      </div>
      <!-- end row -->
    </div>
    <!-- end row -->

    <div class="row">
      <div class="col-12">
        <br />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "rec-song",
  props: ["songData"],
  data() {
    return {};
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    removeFromFavorites() {
      this.$store.dispatch("deleteFavorite", this.songData.id);
    },
    addToFavorites() {
      this.newFavorite = {
        artist: this.songData.song.artist,
        album: this.songData.song.album,
        title: this.songData.song.title,
        preview: this.songData.song.preview,
        price: this.songData.song.price,
        songId: this.songData.song.id,
        albumArt: this.songData.song.albumArt,
        albumArtSmall: this.songData.song.albumArtSmall,
        albumArtLarge: this.songData.song.albumArtLarge
      };
      this.$store.dispatch("addToFavorites", this.newFavorite);
      this.$swal("Success!", "This song is now in your favorites", "success");
    },
    like() {
      this.$swal(
        "Liked and Saved!",
        "Your friend is happy to hear you like their recommendation, it has been saved in your favorites!",
        "success"
      );
      this.newFavorite = {
        artist: this.songData.song.artist,
        album: this.songData.song.album,
        title: this.songData.song.title,
        preview: this.songData.song.preview,
        price: this.songData.song.price,
        songId: this.songData.song.id,
        albumArt: this.songData.song.albumArt,
        albumArtSmall: this.songData.song.albumArtSmall,
        albumArtLarge: this.songData.song.albumArtLarge
      };
      let newFavorite = this.newFavorite;
      let id = this.songData.id;
      let sender = this.songData.sender;
      this.$store.dispatch("like", { newFavorite, id, sender });
    },

    recommendTo() {
      let song = this.songData.song;
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
    },

    mehThis() {
      this.$swal(
        "Don't Worry!",
        "We won't tell them that you don't care for this song!",
        "info"
      );
      //debugger;
      this.$store.dispatch("deleteRec", this.songData.id);
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
  .buttons {
    padding-left: 22vw;
  }
}
</style>