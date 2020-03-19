import io from "socket.io-client";

let socket = {};


export const socketStore = {
  actions: {
    initalizeSocket({
      commit,
      dispatch
    }) {
      //establish connection with socket
      socket = io("//localhost:3000");
      //Handle any on connection events
      socket.on("CONNECTED", data => {
        console.log("Connected to socket, Amplify");
      });

      //register all listeners
      socket.on("newPositiveScore", data => {
        commit("addPositive", data);
        // commit("setProfile", data);
      });
      //register all listeners
      socket.on("newTotalScore", data => {
        commit("setProfile", data);
      });
      socket.on("newRec", data => {
        commit("addRecommends", data);
      });
    },

    joinRoom({ commit, dispatch }, roomName) {
      socket.emit("dispatch", { action: "JoinRoom", data: roomName });
    }
  }
};