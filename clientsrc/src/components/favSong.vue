<template>
  <div class="col-11 song">
    <div class="row bg-pers p-3">
      <div class="col-12 text-center pb-3">
        <button class="btn btn-sm btn-primary" @click="recommendTo">recommend to...</button>
        <button class="btn btn-sm btn-secondary" @click="removeFromFavorites">remove</button>
      </div>
      <div class="col-4 text-center">
        <img :src="songData.Song.albumArtSmall" alt />
      </div>
      <div class="col-8 text-left text-light">
        <p>
          <b>{{songData.Song.title}}</b>
        </p>
        <p>{{songData.Song.artist}}</p>
        <p>{{songData.Song.album}}</p>
      </div>
      <div class="col-12">
        <audio controls>
          <source :src="songData.Song.preview" type="audio/ogg" />
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
  computed: {},
  methods: {
    removeFromFavorites() {
      this.$store.dispatch("deleteFavorite", this.songData.id);
    },
    recommendTo() {
      let song = this.songData;
      this.$swal({
        title: "Recommend this song to...",
        input: "email",
        inputPlaceholder: "Enter your friend's email",
        showCloseButton: true
      }).then(email => {
        this.$store.dispatch("recommendTo", { email, song });
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
</style>