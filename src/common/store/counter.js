import { observable } from 'mobx';
import {getUUid} from '@/common/utils';
import { getBase64Img } from '@/common/api/public';

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
        const sendData = {
            "height": 40,
            "key": getUUid(),
            "lineSize": 0,
            "stringNum": 4,
            "width": 100
        };
        getBase64Img(sendData).then((res) => {
            this.img = 'data:image/jpeg;base64,' + res.data;
            this.data = {id:1, name:'zhangxiaojun', status:'牛逼啦...'};
        });
    }
});

export default counterStore;