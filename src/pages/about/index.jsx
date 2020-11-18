import React, { useEffect, useState } from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Button, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import counterStore from '@/common/store/counter';
import DT from '@/common/images/dt.jpg';

import './style.less';

const About = observer(() => {
    const [params, setParams] = useState({});
    function backHome(){
        Taro.navigateBack({url: '/pages/index/index'});
    }
    useEffect(() => {
        const obj = getCurrentInstance().router.params;
        console.log(obj);
        if(obj){
            setParams(obj);
        }
    }, []);
    return <View className='about text-center'>
        <View>count:{counterStore.counter}</View>
        <View>id:{params.id}</View>
        <View>name:{params.name}</View>
        <View>status:{params.status}</View>
        <Image src={DT} style={{width:'98%', marginLeft:'1%'}} />
        <Button onClick={backHome}>返回首页</Button>
    </View>;
});

export default About;
