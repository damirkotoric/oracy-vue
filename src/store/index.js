import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    activeAudiobook: Object,
    playerStatus: ''
  },
  getters : {
    getActiveAudiobook() {
      return this.state.activeAudiobook
    },
    getPlayerStatus() {
      return this.state.playerStatus
    }
  },
  mutations: {
    setActiveAudiobook(state, payload) {
      this.state.activeAudiobook = payload
    },
    setPlayerStatus(state, payload) {
      this.state.playerStatus = payload
    }
  },
  actions : {
    // Used for async calls to a database.
  }  
})
