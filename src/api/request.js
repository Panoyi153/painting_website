//对axios进行二次封装
import axios from 'axios'
import store from '@/store';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const requests = axios.create({
    baseURL: "/api",
    timeout: 8000,
    withCredentials: true
});
//请求拦截器
requests.interceptors.request.use((config) => {
    nprogress.start()
    // // 请求头带临时id参数
    // if (store.state.Detail.uuid_token) {
    //     config.headers.userTempId = store.state.Detail.uuid_token;
    // }
    // 请求头带token参数
    if (store.state.User.token) {
        config.headers.token = store.state.User.token
    }
    // config => {
    //     const token = store.state.token;
    //     token && (config.headers.Authorization = 'Bearer ' + token);
    // }
    return config;
})
// 响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done()
    return res.data;
}, (error) => {
    nprogress.done()
    return Promise.reject(new Error(error));
})
export default requests;
