import { observable } from 'mobx';

const user = observable({
    data: {},
    setUserInfo(data) {
        this.data = data;
    },
    getUserInfo() {
        return this.data;
    }
});
export default user;