import http from '@/common/http';

//login
export const login = (data) => http.POST('/WG_IP/basesupport-service/account/login', data);