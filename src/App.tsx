import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import PrivateModule from './modules/private';
import PublicModule from './modules/public';
import authStore from './store/auth.store';

const App:React.FC = observer(() => {

  useEffect(()=>{
    authStore.isAuth()
  },[])

  return (
    <BrowserRouter>
      {
        authStore.getAccessToken() ? <PrivateModule/> : <PublicModule/>
      }
    </BrowserRouter>
  );
  
})

export default App;