import React from 'react';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'


const App = () => {
    return (
      <>
        <Route path="/" component={Home} exact={true}/>
        {/* exact 설정을 안하면 /Login도 /에 포함되어 나타남 */}
        <Route path="/Login" component={Login} />
      </>
    );
};

export default App;