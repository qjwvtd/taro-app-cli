import React, {  } from 'react';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react';

import './style.less';

const Processing = observer(() => {
    return <View className='processing text-center'>
        <View>生产加工</View>
    </View>;
});

export default Processing;
