import React, { useEffect } from 'react';
import { AtButton } from 'taro-ui';
import { View, Image, Button } from '@tarojs/components';
import { observer } from 'mobx-react';
import http from '@/common/http';
import {openToView} from '@/common/utils';
import logo from '@/common/images/logo.png';
import store from '@/common/store';
import tablist from './tablist';

import './style.less';

const Index = observer(() => {
    const {user} = store;
    useEffect(() => {
        console.log(http, tablist);
    }, []);
    return <View className='index text-center'>
        <Image src={logo} style={{width:'5rem', height: '5rem'}} />
        <View className='indexTitle'>四川省农产品质量安全追溯管理信息平台</View>
        {
            user?.data?.id ? tablist.map((item) => {
                return  <View key={item.url} className='indexRow'>
                    <AtButton type='primary' size='normal' onClick={() => openToView(item.url)}>{item.title}</AtButton>
                </View>;
            }) : <Button type='primary' style={{width: '10rem', marginTop: '2rem'}} onClick={() => openToView('/pages/login/index')}>去登录</Button>
        }
    </View>;
});
export default Index;
