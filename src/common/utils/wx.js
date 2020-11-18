//微信授权成功后获取微信用户数据
export function getWxUserInfo(){
    return new Promise((resove,reject) => {
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