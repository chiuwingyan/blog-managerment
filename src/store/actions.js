export default {
    updateToken ({commit,newVal}){
        setTimeout(() => {
            commit("setToken",newVal)
        }, 1000);
    }
}