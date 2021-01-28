// /**
//  * 这是请求的配置

axios.defaults.baseURL = 'https://developer.duyiedu.com/vue/bz/';

axios.interceptors.response.use(response => {
    const { status } = response; // 解构状态码
    const { baseURL, url } = response.config; // 解构请求地址

    if (status === 200) {
        // 对请求视频，做特殊处理
        if (baseURL + 'video' === url) {
            return {
                data: response.data.data,
                count: response.data.count
            }
        }
        return response.data.data;
    }
    return response; // 记得返回
});