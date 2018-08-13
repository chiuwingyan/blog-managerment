import { SET_ARTICLE_TYPE } from './../mutation-type'

export default {
    namespaced:true,
    state:{
        type:['css']
    },
    mutations:{
        [SET_ARTICLE_TYPE](state,newVal){
            state.type.push(newVal);
        }
    }
}