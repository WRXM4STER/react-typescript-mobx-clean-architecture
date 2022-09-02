import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import authEntity from './core/domain/entities/auth.entity';
import PrivateModule from './modules/private';
import PublicModule from './modules/public';


const App:React.FC = observer(() => {

  useEffect(()=>{
    authEntity.isAuth()
  },[])

  return (
    <BrowserRouter>
      {
        authEntity.getAccessToken() ? <PrivateModule/> : <PublicModule/>
      }
    </BrowserRouter>
  );
  
})

export default App;