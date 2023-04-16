import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FeatureAuth, FeatureContacts } from 'feature';
import { observer } from 'mobx-react';
import { AppContext } from 'core';

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