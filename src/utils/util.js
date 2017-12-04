export default {

    /**
     * fetch get请求
     * @param url  请求地址
     * @param params 参数
     */
    getFetch(url, params){
        if (params) {
            let paramsArray = [];
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

       return  fetch(url, {
            method: 'GET',
        }).then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                return error;
            })
    }
}
