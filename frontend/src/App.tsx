import React from 'react';
import GlobalStyle from './styles/global';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalStyle/>
      <Login/>
    </div>
  );
}

export default App;
