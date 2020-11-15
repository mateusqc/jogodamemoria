import React, { useState } from 'react';
import './App.css';
import { UserContext } from './context/userContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import UrlRouter from './constants/UrlRouter';

import Template from './pages/template';
import Index from './pages/index';
import HiscoresPage from './pages/hiscores/hiscores';
import GameModesPage from './pages/gameModes/gameModes';

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
              <Route exact component={HiscoresPage} path={UrlRouter.hiscores} />
              <Route
                exact
                component={GameModesPage}
                path={UrlRouter.gameModes}
              />
            </Switch>
          </Template>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
