

export default {
    setToken(state,newVal){
        state.token = newVal;
        localStorage.setItem('token',newVal);
    },
    setUsername(state,newVal){
        state.username = newVal;
        localStorage.setItem('username',newVal)
    }
}