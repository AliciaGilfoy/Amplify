import {api} from "../services/AxiosService";


export const favoriteStore ={
  actions: {
    async getMusicByQueryFav({commit, dispatch }, query) {
      try {
        let res = await api.get("favorites/" + query)
        commit("setSearchedSongs", res.data);
      } catch (error) {

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
  }
}