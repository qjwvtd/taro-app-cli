import React, { useState } from 'react';
// import Taro, { } from '@tarojs/taro';
import { View, Button, Image} from '@tarojs/components';
import { observer } from 'mobx-react';
import {getWxUserInfo} from '@/common/utils/wx.js';

import './style.less';

const Authorize = observer(() => {
    const [user, setUser] = useState('');
    //授权
    function bindGetUserInfo(e){
        const data = e.detail.userInfo;
        if (data){
            console.log('用户按了允许授权按钮');
            getWxUserInfo().then((res) => {
                if(res.rawData){
                    setUser(res.rawData);
                    wx.showToast({title:'授权成功'});
                }
            });
        }
        if(!data){
            console.log('用户按了拒绝按钮');
            wx.showModal({title:'授权失败', content:'不授权将无法使用我们的服务咯,亲!!'});
            setUser('');
        }
    }
    return <View className='authorize'>
        <View className='text-center' style={{padding:'50px 0'}}>
            <View class='header'>
                <Image
                    style={{width:'60px', height:'60px'}}
                    src='https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico'
                />
            </View>
            <View class='text-content'>
                <view>申请获取以下权限</view>
                <text>获得你的公开信息(昵称，头像等)</text>
            </View>
        </View>
        <Button open-type='getUserInfo' onGetUserInfo={bindGetUserInfo}>点我授权</Button>
        <View style={{padding:'20px', border:'1px solid red'}}>
            <View className='wordWrapView'>{user}</View>
        </View>
    </View>;
});
export default Authorize;
