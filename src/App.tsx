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
    this.context.authService?.setAuth()
  }

  render() { 
    if (this.context.authService?.isLoading()) {
      return (
        <h1>Loading...</h1>
      );
    }
    return (
      <BrowserRouter>
        {
          this.context.authService?.isAuth() ? <FeatureContacts/> : <FeatureAuth/>
        }
      </BrowserRouter>
    );
  }

}

export default App;