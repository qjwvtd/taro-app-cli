import Taro from '@tarojs/taro';
//uuid
export function getUUid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//起始页跳转页面，不需要返回的时候调用
export function openToView(url){
    Taro.navigateTo({url});
}
//非起始页跳转页面，跳转后有返回功能
export function openBackView(url){
    Taro.navigateBack({url});
}