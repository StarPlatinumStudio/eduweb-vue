import Vue from 'vue'
import Vuex from 'vuex'
// import * as getters from './getters'
// import * as mutations from './mutations'
// import * as actions from './actions'
Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    userData: {},
    openid: '',
    access_token: '',
    homeWorkDetial: '',
    theClass: {}
  }
//   },
//   getters,
//   mutations,
//   actions
})
export default store
