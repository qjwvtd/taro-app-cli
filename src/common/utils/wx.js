//微信授权成功后获取微信用户数据
export function getWxUserInfo(){
    return new Promise((resove, reject) => {
        wx.getUserInfo({
            withCredentials: true,
            success: (userinfo) => {
                resove(userinfo);
            },
            fail(){
                reject(false);
            }
        });
    });
}
//检查微信是否授权
export function checkAuth(){
    return new Promise((resove) => {
        wx.getSetting({
            success(scope) {
                const user = scope.authSetting['scope.userInfo'];
                //已授权
                if(user){
                    getWxUserInfo().then((res) => {
                        resove({status: true, data: res});
                    });
                }
                //未授权
                if(!user){
                    resove({status: false, data: null});
                }
            }
        });
    });
}