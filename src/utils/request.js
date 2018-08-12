import axios from 'axios'
import { resolve } from 'url';


axios.defaults.timeout = 5000;       
axios.defaults.baseURL = 'http://localhost:3333/';
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest'
}
//发送请求前的拦截器
axios.interceptors.request.use(function(config){
    if(localStorage.getItem('token') && localStorage.getItem('token') !== null){
        config.headers['Authorization']= `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
},function(error){
    Promise.reject(error)
})

//请求相应前的拦截器
axios.interceptors.response.use(function(response){
    return response;
},function(error){
    Promise.reject(error)
})

export default{
    //get请求
    get(url,param){
       return axios({
           method:'get',
           url,
           params:param,
       })
    },

    //post请求
    post(url,parma){
        return axios({
            method:'post',
            url,
            data:parma,
        })
    }
}