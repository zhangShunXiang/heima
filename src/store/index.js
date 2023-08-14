import todoStorage from '@/utils/storage'
import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/index'

Vue.use(Vuex)
const userToken = 'USERTOKEN'
export default new Vuex.Store({
  state: {
    user: todoStorage.getStorage(userToken),
    userInf:''
  },
  getters: {
  },
  mutations: {
    setUserToken(state, val) {
      state.user = val
      todoStorage.setSotrage(userToken, val)
    },
    async getUserInf() {
     const res= await api.getUserInf()
        this.state.userInf=res
        console.log(res,111);
    },
    remoToken(name){
      state.user=null
      todoStorage.removeStorage()

    }

  },
  actions: {
  },
  modules: {
  }
})
