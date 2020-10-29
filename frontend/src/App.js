import React, { useState } from 'react';
import './App.css';
import { UserContext } from './context/userContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import UrlRouter from './contants/UrlRouter';

import Template from './pages/template';
import Index from './pages/index';
import Hiscores from './pages/hiscores';

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  return (
    <div className='App'>
      <UserContext.Provider value={{ user, setUser }}>
        <Router history={history}>
          <Template>
            <Switch>
              <Route exact component={Index} path={UrlRouter.index} />
              <Route exact component={Hiscores} path={UrlRouter.hiscores} />
            </Switch>
          </Template>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
