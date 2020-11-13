import React, { useEffect,useState } from 'react';
import Taro,{ getCurrentInstance } from '@tarojs/taro'
import { View, Button } from '@tarojs/components';
import { observer } from 'mobx-react';
import counterStore from '@/store/counter';

import './style.less';

const About = observer(() => {
  const [params,setParams] = useState({});
  function backHome(){
    Taro.navigateBack({url: '/pages/index/index'});
  }
  useEffect(() => {
    const obj = getCurrentInstance().router.params;
    console.log(obj);
    if(obj){
      setParams(obj);
    }
  },[]);
  return <View className="about">
    <View>count:{counterStore.counter}</View>
    <View>id:{params.id}</View>
    <View>name:{params.name}</View>
    <Button onClick={backHome}>返回首页</Button>
  </View>;
});

export default About;
