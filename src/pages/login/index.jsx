import React, {  } from 'react';
import { Form, View, Input, Button } from '@tarojs/components';
import { observer } from 'mobx-react';
import store from '@/common/store';
import {openToView} from '@/common/utils';
import {login} from '@/common/api/login';

import './style.less';

//13060008882, Zlk18227813680?

const Login = observer(() => {
    const {user} = store;
    function onLoginSubmit(e){
        console.log('e', e);
        const {detail: { value: {name, password}}} = e;
        console.log('name, password', name, password);
        if(!name || !password){
            return;
        }
        // 摸拟登录
        if(name === 'admin' && password === 'admin'){
            user.setUserInfo({id: '123456789', name, password});
            openToView('/pages/index/index');
            return;
        }
        // 调用接口
        login({name, password, sysIds: "1,3,4,6,10,15,16"}).then((res) => {
            console.log('login info', res);
            if(res?.code === 200){
                user.setUserInfo(res?.data);
                openToView('/pages/index/index');
            }
        });
    }
    return <View className='login '>
        登录
        <View className='loginForm'>
            <Form onSubmit={onLoginSubmit}>
                <View><Input name='name' type='text' placeholder='输入用户名' /></View>
                <View><Input name='password' type='password' password placeholder='输入密码' /></View>
                <Button type='primary' formType='submit'>登录</Button>
            </Form>
        </View>
    </View>;
});
export default Login;
