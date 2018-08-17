import axios from 'axios'
import {resolve} from 'url';
import store from '@/store'
import {Message} from 'element-ui';

axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'http://localhost:8181/';
// axios.defaults.baseURL = 'http://39.108.174.244:8181/';
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest'
}
//发送请求前的拦截器
axios.interceptors.request.use(function (config) {
  if (store.state.token && store.state.token !== null) {
    config.headers['Authorization'] = store.state.token;
  }
  return config;
}, function (error) {
  Promise.reject(error)
})

//请求相应前的拦截器
axios.interceptors.response.use(function (response) {
  console.log(response);
  return response;
}, function (error) {
  console.log('error', error)
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

export default {
  //get请求
  get(url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
      }).then((resp) => {
        if (resp.data.code === 1) {
          resolve(resp.data)
        } else {
          reject(resp.data)
        }
      })
    }).catch(data => {
      Message({
        type: 'fail',
        message: data.msg
      });
      console.log(data.msg)
    })
  },

  //post请求
  post(url, parma) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: parma,
      }).then((resp) => {
        if (resp.data.code === 1) {
          resolve(resp)
        } else {
          reject(resp.data)
        }
      })
    }).catch((data) => {
      Message({
        type: 'warning',
        message: data.msg
      });
      console.log(data.msg)
    })
  },
  put(url, parma) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url,
        data: parma,
      }).then((resp) => {
        if (resp.data.code === 1) {
          resolve(resp)
        } else {
          reject(resp.data)
        }
      })
    }).catch((data) => {
      Message({
        type: 'warning',
        message: data.msg
      });
      console.log(data.msg)
    })
  },

  //delete请求
  delete(url) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url,
      }).then((resp) => {
        if (resp.data.code === 1) {
          resolve(resp.data)
        } else {
          reject(resp.data)
        }
      })
    }).catch((data) => {
      console.log(data.msg)

    })
  }
}
