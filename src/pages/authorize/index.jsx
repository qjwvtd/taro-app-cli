import React, { useState } from 'react';
// import Taro, { } from '@tarojs/taro';
import { View, Button,Image} from '@tarojs/components';
import { observer } from 'mobx-react';
// import counterStore from '@/common/store/counter';

import './style.less';

const Authorize = observer(() => {
    const [response, setResponse] = useState({});
    function wxLogin(){
        wx.login({
            success(res){
                console.log(res);
                const {code} = res;
                const appid = 'wx2e7d42abb6e77143';
                const secret = '21c72980b3860532e22d99b32c4157d7';
                // 补上自己的 APPID 和 SECRET
                const requestBaseUrl = 'https://api.weixin.qq.com/sns/jscode2session';
                const url = requestBaseUrl + '?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code';
                wx.request({
                    url: url,
                    success(requestData){
                        // 获取到用户的 openid
                        setResponse(requestData.data);
                        console.log("requestData:", requestData);
                    }
                });
            }
        });
    }
    return <View className='authorize'>
        <View className='text-center' style={{padding:'50px 0'}}>
            <View class='header'>
                <Image 
                    style={{width:'60px',height:'60px'}}
                    src='https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico' 
                />
            </View>

            <View class='text-content'>
                <view>申请获取以下权限</view>
                <text>获得你的公开信息(昵称，头像等)</text>
            </View>
        </View>
        <Button onClick={wxLogin}>授权登录</Button>
        <View style={{padding:'20px',border:'1px solid red'}}>
            <View>openid:{response.openid}</View>
            <View>session_key:{response.session_key}</View>
        </View>
    </View>;
});
export default Authorize;
