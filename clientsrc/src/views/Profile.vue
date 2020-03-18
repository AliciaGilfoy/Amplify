<template>
  <div class="container-fluid about text-light">
    <div class="row justify-content-between pt-2">
      <div class="col-3">
        <i class="icon-large far fa-bell fa-3x">
          <span v-if="recommendedSongs.length > 0" class="notify">{{recommendedSongs.length}}</span>
        </i>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <div v-if=" profile.username == 'New User'">
          <div class="card border-danger mb-3" style="max-width: 20rem;">
            <div class="card-header" style="color:red;">Please Create A User Name!</div>
            <div class="card-body">
              <form @submit.prevent="changeUserName">
                <input
                  v-model="newUsername.body"
                  type="text"
                  placeholder="Enter New User Name Here..."
                  rows="1"
                  class="col-12"
                />\
                <button type="submit" class="btn-sm btn-outline-danger">Danger</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 text-center" style="padding-top: 4em;">
      <h3 class="text-light">
        Welcome
        <span style="color: purple; text-decoration: underline;">{{ profile.username }}</span>
      </h3>
      <br />
      <img class="rounded text-center" style="display: inline-flex;
}" :src="profile.picture" alt />
      <p>{{ profile.email }}</p>
      <div class="row justify-content-center">
        <div class="col-3">
          Enjoyed:
          <br />
          <h2 class="score">{{profile.positiveRecommend}}</h2>
        </div>
        <div class="col-1">
          <br />
          <h2 class="score">/</h2>
        </div>
        <div class="col-3">
          Sent:
          <br />
          <h2 class="score">{{profile.totalRecommends}}</h2>
        </div>
        <div class="col-1">
          <br />
          <h2 class="score">=</h2>
        </div>
        <div class="col-3">
          Score:
          <br />
          <h2 class="score">{{Math.round(100*(profile.positiveRecommend/profile.totalRecommends))}}%</h2>
        </div>
      </div>
    </div>

    <div class="col-12 text-center">
      <div id="search" class="row" style="padding-top: 2em;
}">
        <div class="col-12 justify-content-center">
          <form class="row justify-content-center" @submit.prevent="searchiTunes">
            <input class="input" type="text" placeholder="Search For Tracks..." v-model="query" />
            <button class="search btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
    <div id="search-results" class="row justify-content-center">
      <song v-for="song in searchedSongs" :key="song.id" :songData="song" />
    </div>
  </div>
</template>

<script>
import song from "../components/song";
export default {
  name: "Profile",
  mounted() {
    return this.$store.dispatch("getRecommends");
    return this.$store.dispatch("getScoreVariables");
  },
  data() {
    return {
      query: "",
      newUsername: {}
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    recommendedSongs() {
      return this.$store.state.recommendedSongs;
    },
    searchedSongs() {
      return this.$store.state.searchedSongs;
    }
  },
  methods: {
    searchiTunes() {
      this.$store.dispatch("getMusicByQuery", this.query);
    },

    changeUserName() {
      let body = this.newUsername.body;
      this.$store.dispatch("changeUserName", body);
    }
  },
  components: {
    song
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
.my-img {
  max-width: 70%;
}
.input {
  height: 4em;
  width: 100%;
  max-width: 20rem;
}
.search {
  width: 100%;
  max-width: 20rem;
}
.score {
  color: teal;
}
.notify {
  color: white;
  font-size: 1rem;
  border-radius: 50%;
  background: rgba(255, 0, 0, 0.5);
  padding: 3px;
}
</style>
