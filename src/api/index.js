import request from "@/utils/request";
const search = params => request({//
    url: '/v1_0/search',
    params
})
const login = data => request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
})
const sendCode = mobile => request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`,
})
const getUserInf = token => request({
    method: 'GET',
    url: '/v1_0/user',
    headers: {
        // Authorization: `Bearer ${token}`
     }
})
//获取频道
const getChannels = () => request({
    method: 'GET',
    url: `/v1_0/channels`,
})
//获取文章列表
const getArtList=(params)=>request({
    method:'GET'
    ,url:'/v1_0/articles',
    params 
})
//获取用户频道
const getUserChannels = () => request({
    method: 'GET',
    url: `/v1_0/user/channels`,
})
// 自动补全
const searchSuggestion = (params) => request({
    method: 'GET',
    url: `/v1_0/suggestion`,
    params
})
 const api = {
    search,
    login,
    sendCode,
    getUserInf,
    getChannels,
    getArtList,
    getUserChannels,
    searchSuggestion
}
export default api 