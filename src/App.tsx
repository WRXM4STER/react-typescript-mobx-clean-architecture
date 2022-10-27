import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import authEntity from './core/domain/entities/auth.entity';
import FeatureAuth from 'feature-auth';
import FeatureContacts from 'feature-contacts';


const App:React.FC = observer(() => {

  useEffect(()=>{
    authEntity.isAuth()
  },[])

  return (
    <BrowserRouter>
      {
        authEntity.getAccessToken() ? <FeatureContacts/> : <FeatureAuth/>
      }
    </BrowserRouter>
  );
  
})

export default App;