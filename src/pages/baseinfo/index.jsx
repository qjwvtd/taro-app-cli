import React from 'react';
import { View } from '@tarojs/components';
import { observer } from 'mobx-react';

import './style.less';

const BaseInfo = observer(() => {
    return <View className='base text-center'>
        基础信息
    </View>;
});

export default BaseInfo;
