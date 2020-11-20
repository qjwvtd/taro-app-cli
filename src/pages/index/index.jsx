import React, { useState, useEffect } from 'react';
import Taro, { } from '@tarojs/taro';
import { AtTabBar } from 'taro-ui';
import { View, Button, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import counterStore from '@/common/store/counter';
import http from '@/common/http';

import './style.less';

const Index = observer(() => {
    const [current, updateCurrent] = useState(0);
    const tablist = [{ title: '首页' }, { title: '关于我们', text: 8 }];
    function increment() {
        counterStore.increment();
    }
    function decrement() {
        counterStore.decrement();
    }
    function incrementAsync() {
        counterStore.incrementAsync();
    }
    function handleClick(value) {
        updateCurrent(value);
        const data = counterStore.data;
        let url = null;
        switch (value) {
            case 0:
                url = '/pages/index/index';
                break;
            case 1:
                url = '/pages/about/index?id=' + data.id + '&name=' + data.name + '&status=' + data.status;
                break;
        }
        //跳转到目的页面
        Taro.navigateTo({
            url: url
        });
    }
    useEffect(() => {
        console.log(http);
    }, []);
    return <View className='index'>
        <Button onClick={increment}>+</Button>
        <Button onClick={decrement}>-</Button>
        <Button onClick={incrementAsync}>图形验证码</Button>
        <View className='text-center'>{counterStore.counter}</View>
        <Image className='text-center' style={{width:'100px', height:'40px'}} src={counterStore.img} />
        <View className='text-center'>{JSON.stringify(counterStore.data)}</View>
        <AtTabBar
            tabList={tablist}
            onClick={handleClick}
            current={current}
            fontSize={20}
            backgroundColor='#ececec'
            color='#ea6bb8'
            fixed
        />
    </View>;
});
export default Index;
