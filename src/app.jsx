//taro-ui样式文件必须在入口文件最顶部引入
import 'taro-ui/dist/style/index.scss';
import React, { useEffect } from 'react';
import Taro, { } from '@tarojs/taro';
import { Provider } from 'mobx-react';
import counterStore from './common/store/counter';
import {getWxUserInfo} from '@/common/utils/wx.js';

//自定义样式
import './app.less';

const store = {
    counterStore
};

function App({children}){
    //检查小程序是否授权
    function checkAuth(){
        wx.getSetting({
            success(res) {
                console.log(res);
                const user = res.authSetting['scope.userInfo'];
                //已授权
                if(user){
                    console.log('已授权', user);
                    getWxUserInfo().then((res) => {
                        console.log(res);
                    });
                }
                //未授权,跳到授权页面
                if(!user){
                    console.log('未授权', user);
                    Taro.navigateTo({url:'/pages/authorize/index'});
                }
            }
        });
    }
    useEffect(() => {
        checkAuth();
    }, []);
    return <Provider store={store}>
        {children}
    </Provider>;
}

export default App;
