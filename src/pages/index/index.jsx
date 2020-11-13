import React, {  } from 'react';
import Taro, {} from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { observer } from 'mobx-react';
import counterStore from '@/store/counter';

import './style.less';

const Index = observer(() => {
    function increment(){
        counterStore.increment();
    }
    function decrement(){
        counterStore.decrement();
    }
    function incrementAsync(){
        counterStore.incrementAsync();
    }
    function openAboutView(){
    //跳转到目的页面，打开新页面及传参
        const data = counterStore.data;
        Taro.navigateTo({
            url: '/pages/about/index?id='+data.id+'&name='+data.name + '&status=' + data.status
        });
    }
    return <View className='index'>
        <Button onClick={increment}>+</Button>
        <Button onClick={decrement}>-</Button>
        <Button onClick={incrementAsync}>异步处理</Button>
        <View className='text-center'>{counterStore.counter}</View>
        <View className='text-center'>{JSON.stringify(counterStore.data)}</View>
        <Button onClick={openAboutView} className='toAbout'>去关于我们</Button>
    </View>;
});
export default Index;
