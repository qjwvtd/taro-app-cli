/**
 * 请求方法封装
*/
import Taro from '@tarojs/taro';

function getStorage(key) {
    return Taro.getStorage({ key }).then(res => res.data).catch(() => '');
}

function updateStorage(data = {}) {
    return Promise.all([
        Taro.setStorage({ key: 'token', data: data['token'] || '' }),
        Taro.setStorage({ key: 'uid', data: data['uid'] || ''})
    ]);
}

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
// export default async function fetch(options) {
export async function fetch(options) {
    const { url, data, method = 'GET', showToast = true, autoLogin = true } = options;
    const token = await getStorage('token');
    const header = token ? { 'Authorization': 'Bearer' + token } : {};
    if (method === 'POST') {
        header['content-type'] = 'application/json;charset=utf-8';
    }

    return Taro.request({
        url,
        method,
        data: data,
        header
    }).then(async (res) => {
        console.log(res);
        if (+res.data.code !== 200) {
            if (+res.data.code === 401) {
                await updateStorage({});
            }
            return Promise.reject(res.data);
        }
        return res.data;
    }).catch((err) => {
        const defaultMsg = +err.code === 401 ? '登录失效' : '请求异常';
        if (showToast) {
            Taro.showToast({
                title: err && err.errorMsg || defaultMsg,
                icon: 'none'
            });
        }

        if (err.code === 401 && autoLogin) {
            Taro.navigateTo({
                url: '/pages/login/index'
            });
        }

        return Promise.reject({ message: defaultMsg, ...err });
    });
}
export default{
    async GET(url, data){
        const option = {
            url: url,
            data: data,
            method: 'GET',
            showToast: true,
            autoLogin: true
        };
        return fetch(option);
    },
    async POST(url, data){
        const option = {
            url: url,
            data: data,
            method: 'POST',
            showToast: true,
            autoLogin: true
        };
        return fetch(option);
    }
};