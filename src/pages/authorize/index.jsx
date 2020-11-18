import React, { useState } from 'react';
// import Taro, { } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { observer } from 'mobx-react';
// import counterStore from '@/common/store/counter';

import './style.less';

const Authorize = observer(() => {
    const [response, setResponse] = useState({});
    function wxLogin(){
        wx.login({
            success(res){
                console.log(res);
                wx.request({
                    // 补上自己的 APPID 和 SECRET
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx2e7d42abb6e77143=21c72980b3860532e22d99b32c4157d7&js_code=' + res.code + '&grant_type=authorization_code',
                    success(userData){
                        // 获取到用户的 openid
                        console.log("用户:", userData);
                        setResponse(userData);
                    }
                });
            }
        });
    }
    return <View className='authorize'>
        <View className='text-center' style={{padding:'50px 0'}}>
            <Text>请先授权</Text>
        </View>
        <Button onClick={wxLogin}>点击授权</Button>
        <View style={{padding:'20px'}}>
            <Text selectable>{JSON.stringify(response)}</Text>
        </View>
    </View>;
});
export default Authorize;
