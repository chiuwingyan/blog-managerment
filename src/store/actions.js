export default {
    updateToken ({commit,newVal}){
        setTimeout(() => {
            commit("setToken",666)
        }, 1000);
    }
}