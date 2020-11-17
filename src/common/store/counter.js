import { observable } from 'mobx';
import http from '@/common/http';
import {getUUid} from '@/common/utils';

const counterStore = observable({
    counter: 0,
    data: {},
    img: null,
    increment() {
        this.counter++;
    },
    decrement() {
        this.counter--;
    },
    incrementAsync() {
        const url = 'https://saas-dev.dhwork.cn/api/versatile/v1/verifyCode/base64';
        const sendData = {
            "height": 40,
            "key": getUUid(),
            "lineSize": 0,
            "stringNum": 4,
            "width": 100
        };
        http.POST(url, sendData).then((res) => {
            this.img = 'data:image/jpeg;base64,' + res.data;
            this.data = {id:1, name:'zhangxiaojun', status:'牛逼啦...'};
        });
    }
});

export default counterStore;