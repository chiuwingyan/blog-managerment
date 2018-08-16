//组装模块并导出store

import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getter'
import articleType from './modules/article-type'

Vue.use(Vuex)

let state = {
    token: null,
    username:null
}

export default new Vuex.Store({
    state,      //根级别的状态
    actions,    //根级别的actions
    getters,    //根级别的getters
    mutations,
    modules:{
        articleType
    }
})