import React, { useEffect } from 'react';
import Taro, {  } from '@tarojs/taro';
import { Provider } from 'mobx-react';
import store from '@/common/store';
import {checkAuth} from '@/common/utils/wx.js';
//taro-ui样式
import 'taro-ui/dist/style/index.scss';
//自定义样式
import './app.less';

function App({children}){
    useEffect(() => {
        checkAuth().then((res) => {
            //已授权
            if(res.status){
                console.log(res.data);
            }
            //未授权,跳到授权页面
            if(!res.status){
                console.log('未授权', res);
                Taro.redirectTo({url: '/pages/authorize/index'});
            }
        });
    }, []);
    return <Provider store={store}>
        {children}
    </Provider>;
}

export default App;
