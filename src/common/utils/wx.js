//检查用户是否授权,如果已授权就执行wxLogin
export function checkUserAuth(){
    return new Promise((resove, reject) => {
        wx.getSetting({
            success(res) {
                console.log(res);
                const user = res.authSetting['scope.userInfo'];
                resove(user);
                // //已授权
                // if(user){
                //     wx.getUserInfo({
                //         success: (userinfo) => {
                //             console.log(userinfo);
                //         }
                //     });
                // }
                // //未授权,跳到授权页面
                // if(!user){
                //     Taro.navigateTo({url:'/pages/authorize/index'});
                // }
            },
            fail(err){
                reject(err);
            }
        });
    });
}
//微信登录,并根据登录拿到的code获取用户信息
export function wxLogin(){
    return new Promise((resove,reject) => {
        wx.login({
            success(res){
                console.log(res);
                wx.request({
                    // 补上自己的 APPID 和 SECRET
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx2e7d42abb6e77143=21c72980b3860532e22d99b32c4157d7&js_code=' + res.code + '&grant_type=authorization_code',
                    success(userData){
                        // 获取到用户
                        resove(userData);
                    }
                });
            }
        });
    });
}
