import React, {  } from 'react';
// import Taro, { } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react';
// import counterStore from '@/common/store/counter';

import './style.less';

const Login = observer(() => {
    return <View className='login'>
        请先登录
    </View>;
});
export default Login;
