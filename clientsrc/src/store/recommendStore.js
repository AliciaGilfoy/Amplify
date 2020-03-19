import { api } from "../services/AxiosService";


export const recommendStore = {
  actions: {
    async getMusicByQueryRec({ commit, dispatch }, query) {
      try {

        let res = await api.get("recommends/" + query)
        commit("setSearchedSongs", res.data);
      } catch (error) {

      }

    },
    async recommendTo({ commit, dispatch }, { email, song }) {
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

    like({ commit, dispatch }, { newFavorite, id, sender }) {
      dispatch("addToFavorites", newFavorite)
      dispatch("likedRecommend", sender)
      dispatch("deleteRec", id)
    },
    async likedRecommend({ commit, dispatch }, sender) {
      let res = await api.put('profile/positive/' + sender)
    }
  }
}