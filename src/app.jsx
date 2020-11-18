//taro-ui样式文件必须在入口文件最顶部引入
import 'taro-ui/dist/style/index.scss';
import React, { useEffect } from 'react';
import Taro, { } from '@tarojs/taro';
import { Provider } from 'mobx-react';
import counterStore from './common/store/counter';

//自定义样式
import './app.less';

const store = {
    counterStore
};

function App({children}){
    //小程序授权
    function auth(){
        wx.getSetting({
            success(res) {
                console.log(res);
                const user = res.authSetting['scope.userInfo'];
                //已授权
                if(user){
                    wx.getUserInfo({
                        success: (userinfo) => {
                            console.log(userinfo);
                        }
                    });
                }
                //未授权,跳到授权页面
                if(!user){
                    Taro.navigateTo({url:'/pages/authorize/index'});
                }
                // if (!res.authSetting['scope.userInfo']) {
                //     wx.openSetting({
                //         success(){
                //             res.authSetting = {
                //                 "scope.userInfo": true,
                //                 "scope.userLocation": true,
                //                 "scope.address": true
                //             };
                //         }
                //     }),
                //     wx.authorize({
                //         scope: 'scope.userInfo',
                //         success(){
                //             // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                //             wx.startRecord();
                //         }
                //     });
                // }
            }
        });
    }
    useEffect(() => {
        auth();
    }, []);
    return <Provider store={store}>
        {children}
    </Provider>;
}

export default App;
