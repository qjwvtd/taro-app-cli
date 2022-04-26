import React, { useState, useEffect } from 'react';
import Taro, { } from '@tarojs/taro';
import { AtTabBar } from 'taro-ui';
import { observer } from 'mobx-react';
import counterStore from '@/common/store/counter';
import http from '@/common/http';

const MainTabBar = observer(() => {
    const [current, updateCurrent] = useState(0);
    const tablist = [
        { title: '首页' },
        { title: '农事活动' },
        { title: '生产加工' },
        { title: '关于我们' }
    ];
    function handleClick(value) {
        updateCurrent(value);
        const data = counterStore.data;
        let url = null;
        switch (value) {
            case 0:
                url = '/pages/index/index';
                break;
            case 1:
                url = '/pages/farming/index';
                break;
            case 2:
                url = '/pages/processing/index';
                break;
            case 3:
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
    return <AtTabBar
        tabList={tablist}
        onClick={handleClick}
        current={current}
        fontSize={20}
        backgroundColor='#ececec'
        color='#ea6bb8'
        fixed
    />;
});
export default MainTabBar;
