import React from 'react';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Menu from './components/menu';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Menu></Menu>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
