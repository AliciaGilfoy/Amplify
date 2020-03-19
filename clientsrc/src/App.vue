<template>
  <div id="app" class="bg-whole">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "App",
  async beforeCreate() {
     this.$store.dispatch("initalizeSocket");
    await onAuth();
    if (this.$auth.isAuthenticated) {
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      this.$store.dispatch("joinRoom", this.$auth.userInfo.email);
    }
  },
  components: {
    Navbar
  }
};
</script>

<style>
.bg-whole {
  /* background-color: black; */
  background-image: url(https://silviahartmann.com/background-tile-art/images/black_water_tile.jpg);
  /* filter: blur(10px); */
  min-height: 100vh;
  height: 100%;
}
</style>
