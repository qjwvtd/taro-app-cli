import React, {  } from 'react';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react';

import './style.less';

const Farming = observer(() => {
    return <View className='farming text-center'>
        <View>农事活动</View>
    </View>;
});

export default Farming;
