import React, {  } from 'react';
import { Provider } from 'mobx-react';

import counterStore from './store/counter';

import './app.less';

const store = {
  counterStore
};

function App({children}){
  return <Provider store={store}>
    {children}
  </Provider>;
}

export default App;
