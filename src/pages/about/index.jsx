import React from 'react';
import { View, Image } from '@tarojs/components';
import { observer } from 'mobx-react';
import logo from '@/common/images/logo.png';

import './style.less';

const About = observer(() => {
    return <View className='about text-center'>
        <Image src={logo} style={{width:'5rem', height: '5rem'}} />
        <View className='aboutTitle'>四川省农产品</View>
        <View className='aboutTitle'>质量安全追溯管理信息平台</View>
    </View>;
});

export default About;
