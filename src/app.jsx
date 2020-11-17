//taro-ui样式文件必须在入口文件最顶部引入
import 'taro-ui/dist/style/index.scss';
import React, { useEffect } from 'react';
import { Provider } from 'mobx-react';
import counterStore from './common/store/counter';

//自定义样式
import './app.less';

const store = {
    counterStore
};

function App({children}){
    useEffect(() => {
        //小程序授权
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.record']) {
                    wx.authorize({
                        scope: 'scope.record',
                        success () {
                            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                            wx.startRecord();
                        }
                    })
                }
            }
        })
    },[]);
    return <Provider store={store}>
        {children}
    </Provider>;
}

export default App;
