import axios from 'axios'
import { resolve } from 'url';


axios.defaults.timeout = 5000;       
axios.defaults.baseURL = 'http://192.168.1.4:8181/';
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest'
}
//发送请求前的拦截器
axios.interceptors.request.use(function(config){
    if(localStorage.getItem('token') && localStorage.getItem('token') !== null){
        config.headers['Authorization']= localStorage.getItem('token');
    }
    return config;
},function(error){
    Promise.reject(error)
})

//请求相应前的拦截器
axios.interceptors.response.use(function(response){
    console.log(response);
    return response;
},function(error){
    console.log('error',error)
    if (error && error.response) {
        switch (error.response.status) {
            case 401:
                console.log('未授权，请重新登录')
                break;
        
            default:
                break;
        }
    }
    return Promise.reject(error.response.data);
})

export default{
    //get请求
    get(url,param){
       return new Promise((resolve,reject) => {
           axios({
               method: 'get',
               url,
               params: param,
           }).then((resp) => {
               if (resp.data.code === 1) {
                   return resolve(resp.data)
               } else {
                   reject(resp.data)
               }
           })
       }).catch(data => {
           console.log(data.msg)
       }) 
    },

    //post请求
    post(url,parma){
    return new Promise((resolve,reject) => {
        axios({
            method: 'post',
            url,
            data: parma,
        }).then((resp) => {
            if(resp.data.code === 1){
                return resolve(resp.data)
            }else{
                reject(resp.data)
            }
        })
            }).catch((data)=>{
                console.log(data.msg)
            })    
    },

    //delete请求
    delete(url){
        return new Promise((resolve, reject) => {
            axios({
                method: 'delete',
                url,
            }).then((resp) => {
                if (resp.data.code === 1) {
                    return resolve(resp.data)
                } else {
                    reject(resp.data)
                }
            })
        }).catch((data) => {
            console.log(data.msg)

    })
}
}