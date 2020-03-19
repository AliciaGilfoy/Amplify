import Vue from "vue";
import Vuex, {
  Store
} from "vuex";
import router from "../router";
import Song from "../models/song";
import { api } from "../services/AxiosService";
import { socketStore } from "./socketStore";
import { favoriteStore } from "./favoriteStore";
import { recommendStore } from "./recommendStore";

Vue.use(Vuex);



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
    addRecommends(state, recommends) {
      state.recommendedSongs.push(recommends)
    },
    addPositive(state, score) {
      state.profile.positiveRecommend = score
    }
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


    async getMusicByQuery({ commit, dispatch }, query) {
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
    async changeUserName({ commit, dispatch }, body) {

      let res = await api.put("profile/username", { username: body })
      commit("setProfile", res.data)
    },
    async getTotalForPut({ commit, dispatch }) {
      //1
      let resT = await api.get("profile")
      dispatch("scoreTotalRec", resT.data.totalRecommends)
    },

    async scoreTotalRec({ commit, dispatch }, totalRec) {
      try {
        //2
        let objProp = { totalRecommends: (totalRec + 1) }
        let res = await api.put("profile/total", objProp)
        commit("setProfile", res.data)
      } catch (error) {

      }
    },
    async getPositivesForPut({ commit, dispatch }) {
      //1
      let resT = await api.get("profile")
      dispatch("scoreGoodRec", resT.data.positiveRecommend)
    },
    updateScore({ commit, dispatch }, payload) {
      console.log(payload)
    },
    async scoreGoodRec({ commit, dispatch }, posRec) {
      try {
        //2
        let objProp = { positiveRecommend: (posRec + 1) }
        let res = await api.put("profile/positive", objProp)
        commit("setProfile", res.data)
      } catch (error) {

      }
    },
    async getScoreVariables({ commit, dispatch }) {
      let resT = await api.get("profile")
      // console.log(resT.data)
      //dispatch("scoreTotalRec", resT.data.totalRecommends)


    }
  },
  modules: {
    favoriteStore,
    recommendStore,
    socketStore
  }
});