
export default {
    namespaced:true,
    state:{
        type:['css']
    },
    mutations:{
        setArticleType(state,newVal){
            state.type.push(newVal);
        }
    }
}