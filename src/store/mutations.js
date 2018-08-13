import { SET_TOKEN } from './mutation-type'

export default {
    [SET_TOKEN] (state,newVal){
        state.token = newVal;
        localStorage.setItem('token',newVal);
    }
}