//taro-ui样式文件必须在入口文件最顶部引入
import 'taro-ui/dist/style/index.scss';
import React, {  } from 'react';
import { Provider } from 'mobx-react';
import counterStore from './common/store/counter';

//自定义样式
import './app.less';

const store = {
    counterStore
};

function App({children}){
    return <Provider store={store}>
        {children}
    </Provider>;
}

export default App;
