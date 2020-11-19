import http from '@/common/http';

//获取图形验证码
export const getBase64Img = (data) => http.POST('https://saas-dev.dhwork.cn/api/versatile/v1/verifyCode/base64', data);