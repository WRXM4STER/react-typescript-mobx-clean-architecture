import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { AppContext } from 'core/context';
import { FeatureAuth } from 'feature/auth';
import { FeatureContacts } from 'feature/contacts';

@observer
class App extends React.Component {

  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;

  componentDidMount() {
    this.context.authService?.isAuth()
  }

  render() { 
    return (
      <BrowserRouter>
        {
          this.context.authService?.getAccessToken() ? <FeatureContacts/> : <FeatureAuth/>
        }
      </BrowserRouter>
    );
  }

}

export default App;