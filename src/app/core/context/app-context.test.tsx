import { describe } from '@jest/globals';
import { useContext } from 'react';
import { AuthService } from 'app/core/service';
import { AppContext } from './app-context';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { observer } from 'mobx-react-lite';

interface AppProviderProps {
  children:React.ReactNode
}

const AppProvider:React.FC<AppProviderProps> = ({children}:AppProviderProps) => {
  
  const authService = new AuthService()

  return (
      <AppContext.Provider value={{authService}}>
        <div>Message: {children}</div>
      </AppContext.Provider>
  );
};

const TestComponent:React.FC = observer(() => {

  const { authService } = useContext(AppContext);

  return (
    <>
      <input type="button" title="login" value="login" onClick={() => authService?.signIn('test_access_token')} />
      <input type="button" title="exit" value="exit" onClick={() => authService?.signOut()} />
      {authService?.isAuth() ? "sign in" : "sign out"}
    </>
  );
});

describe('app-context test', () => {

    it('should be default', () => {
      const { getByText } = render(
        <AppProvider>
          <TestComponent />
        </AppProvider>
      );
      expect(getByText(/^Message:/)).toHaveTextContent("sign out");
    });

    it("test for sign in/out", () => {
      const { getByText, getByTitle } = render(
        <AppProvider>
          <TestComponent />
        </AppProvider>
      );
      expect(getByText(/^Message:/)).toHaveTextContent("sign out");
      userEvent.click(getByTitle("login"));
      expect(getByText(/^Message:/)).toHaveTextContent("sign in");
      userEvent.click(getByTitle("exit"));
      expect(getByText(/^Message:/)).toHaveTextContent("sign out");
    });

});