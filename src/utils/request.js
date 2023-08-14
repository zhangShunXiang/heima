import axios from "axios";
import store from '@/store'
const request = axios.create({
    baseURL: 'https://toutiao.itheima.net'
});
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    const user=store.state.user
    if(user){
        //  console.log(user.token,'11111111');
         config.headers.Authorization = `Bearer ${user.token}`
    }
 
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
export default request