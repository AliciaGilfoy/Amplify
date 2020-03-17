import Vue from "vue";
import Vuex, {
  Store
} from "vuex";
import Axios from "axios";
import router from "../router";
import Song from "../models/song";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost") ?
  "http://localhost:3000/" :
  "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    profile: {},
    searchedSongs: [],
    recommendedSongs: [],
    favoriteSongs: [],
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setSearchedSongs(state, results) {
      state.searchedSongs = results;
    },
    addFavorite(state, favData) {
      state.favoriteSongs.push(favData)
    },
    setFavorites(state, favorites) {
      state.favoriteSongs = favorites
    },
    setRecommends(state, recommends) {
      state.recommendedSongs = recommends
    },
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({
      commit
    }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getMusicByQueryFav({
      commit,
      dispatch
    }, query) {
      try {
        let res = await api.get("favorites/" + query)
        commit("setSearchedSongs", res.data);
      } catch (error) {

      }

    },
    async getMusicByQueryRec({ commit, dispatch }, query) {
      try {

        let res = await api.get("recommends/" + query)
        commit("setSearchedSongs", res.data);
      } catch (error) {

      }

    },
    async getMusicByQuery({
      commit,
      dispatch
    }, query) {
      try {
        let url = "https://itunes.apple.com/search?callback=?&term=" + query;
        // @ts-ignore
        $.getJSON(url)
          .then(res => {
            let results = res.results
              .filter(s => s.kind == "song").map(sd => new Song(sd))

            commit("setSearchedSongs", results);
          }).
          catch(e => {
            console.log(e)
          })
      } catch {
        (err => {
          throw new Error(err);
        })
      }
    },
    async addToFavorites({ commit, dispatch }, newFavorite) {
      let res = await api.post("favorites", {
        Song: newFavorite
      })
      commit("addFavorite", res.data)
    },
    async getFavoritesByEmail({ commit, dispatch }) {
      let res = await api.get("favorites")
      commit("setFavorites", res.data)
    },
    async deleteFavorite({ commit, dispatch }, id) {
      let res = await api.delete("favorites/" + id)
      dispatch("getFavoritesByEmail")
    },
















    async recommendTo({ commit, dispatch }, { email, song }) {
      //  debugger
      let obj = {
        receiver: email.value,
        song: song.Song,
        sender: song.creatorEmail
      }
      let res = await api.post("recommends", obj)
      dispatch("getTotalForPut")
    },

    async recommendToFromSearch({ commit, dispatch }, { email, song, creatorEmail }) {
      //also used when recommending from recommends
      let obj = {
        receiver: email.value,
        song: song,
        sender: creatorEmail
      }
      let res = await api.post("recommends", obj)
      dispatch("getTotalForPut")
      dispatch("getRecommends")
    },



    async getRecommends({ commit, dispatch }) {
      let res = await api.get("recommends")
      commit("setRecommends", res.data)
    },

    async deleteRec({ commit, dispatch }, id) {
      let res = await api.delete("recommends/" + id)
      dispatch("getRecommends")
    },



    async getTotalForPut({ commit, dispatch }) {
      //1
      let resT = await api.get("profile")
      dispatch("scoreTotalRec", resT.data.totalRecommends)
    },

    async scoreTotalRec({ commit, dispatch }, totalRec) {
      try {
        //2
        // debugger
        let objProp = { totalRecommends: (totalRec + 1) }
        let res = await api.put("profile/total", objProp)
        // console.log(res.data)
        commit("setProfile", res.data)
      } catch (error) {

      }
    },

    like({ commit, dispatch }, { newFavorite, id }) {
      //debugger
      dispatch("addToFavorites", newFavorite)
      dispatch("getPositivesForPut")
      dispatch("deleteRec", id)
    },

    async getPositivesForPut({ commit, dispatch }) {
      //1
      let resT = await api.get("profile")
      dispatch("scoreGoodRec", resT.data.positiveRecommend)
    },

    async scoreGoodRec({ commit, dispatch }, posRec) {
      try {
        //2
        //debugger
        let objProp = { positiveRecommend: (posRec + 1) }
        let res = await api.put("profile/positive", objProp)
        // console.log(res.data)
        commit("setProfile", res.data)
      } catch (error) {

      }
    },

    async getScoreVariables({ commit, dispatch }) {
      let resT = await api.get("profile")
      // console.log(resT.data)
      //dispatch("scoreTotalRec", resT.data.totalRecommends)


    }






  }
});