import { api } from "../services/AxiosService";


export const favoriteStore = {
  actions: {
    async getMusicByQueryFav({ commit, dispatch }, query) {
      try {
        let res = await api.get("favorites/" + query)
        commit("setSearchedSongs", res.data);
      } catch (error) {

      }

    },
    async addToFavorites({ commit, dispatch }, newFavorite) {
      debugger
      let resF = await api.get("favorites")
      let id = newFavorite.id
      let thing = resF.data.filter(h => h.Song.id = id);
      console.log(thing)
      if (thing.length == 0) {
        let res = await api.post("favorites", {
          Song: newFavorite
        })
        commit("addFavorite", res.data)
      } else {
        console.log("already in favorites")
      }
      // let res = await api.post("favorites", {
      //   Song: newFavorite
      // })
      // commit("addFavorite", res.data)
    },


    async getFavoritesByEmail({ commit, dispatch }) {
      let res = await api.get("favorites")
      commit("setFavorites", res.data)
    },
    async deleteFavorite({ commit, dispatch }, id) {
      let res = await api.delete("favorites/" + id)
      dispatch("getFavoritesByEmail")
    },
  }
}