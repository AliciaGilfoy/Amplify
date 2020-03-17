<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      <img src="../assets/amplify2.png" class="img-fluid our-logo" alt />
      <!-- ../assets/pop.png -->
      <span style="color:purple">Amplify</span>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: $route.name == 'Home' }">
          <router-link :to="{ name: 'Home' }" class="nav-link" style="color:purple">Home</router-link>
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Profile' }"
        >
          <router-link class="nav-link" style="color:purple" :to="{ name: 'Profile' }">Profile</router-link>
        </li>

        <!-- NOTE DO THIS ON THE BACK END -->
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Favorites' }"
        >
          <router-link
            class="nav-link"
            :to="{ name: 'Favorites' }"
            style="color:purple"
          >My Favorites</router-link>
        </li>
        <!-- and this -->
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'Recommends' }"
        >
          <router-link
            class="nav-link"
            :to="{ name: 'Recommends' }"
            style="color:purple"
          >See what your friends recommend</router-link>
        </li>
        <!-- end chore here -->
      </ul>
      <span class="navbar-text">
        <button class="btn btn-success" @click="login" v-if="!$auth.isAuthenticated">Login</button>
        <button class="btn btn-danger" @click="logout" v-else>logout</button>
      </span>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { getUserData } from "@bcwdev/auth0-vue";
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      if (this.$auth.isAuthenticated) {
        this.$store.dispatch("setBearer", this.$auth.bearer);
        this.$store.dispatch("getProfile");
      }
    },
    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({ returnTo: window.location.origin });
    }
  }
};
</script>

<style scoped>
.our-logo {
  width: 10vw;
  max-width: 50px;
  height: auto;
}
</style>
