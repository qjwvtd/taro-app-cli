import { observable } from 'mobx';

const counterStore = observable({
  counter: 0,
  data: {},
  counterStore() {
    this.counter++;
  },
  increment() {
    this.counter++;
  },
  decrement() {
    this.counter--;
  },
  incrementAsync() {
    setTimeout(() => {
      this.data = {id:1, name:'zhangxiaojun', status:'牛逼啦...'};
    }, 1000);
  }
});

export default counterStore;