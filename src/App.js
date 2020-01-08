import React, { Component } from "react";
import LoginPage from "./routes/LoginPage";
import Header from "./components/Header/Header";
import NotFoundPage from "./routes/NotFoundPage";
import RegisterUser from "./routes/RegisterUser";
import UserDashboard from "./routes/UserDashboard";
import BandDashboard from "./routes/BandDashboard";
import AllSetlists from "./routes/AllSetlists";
import SelectedSetlist from './routes/SelectedSetlist';
import CreateSetlist from "./routes/CreateSetlist";
import LoginFail from './routes/LoginFail';
import RegisterBand from './routes/RegisterBand';
import AllSongs from './routes/AllSongs';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import { Route, Switch } from "react-router-dom";
import './App.css';

// revisit .env to update API KEY 


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      bands: [],
      hasError: false
      // add more here later
    };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {

    return (
      <div className='App'>
        <header className='App_header'>
          <Header />
        </header>
        <main className='App_main'>
          {this.state.hasError && <p className='red'>There was an error!</p>}
          <Switch>
            <PublicOnlyRoute
              exact
              path={'/'}
              component={LoginPage}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegisterUser}
            />
            <PrivateRoute
              exact
              path={'/dashboard/band/:bandId/setlists/createsetlist'}
              component={CreateSetlist}
            />
            <PrivateRoute
              exact
              path={'/dashboard/band/:bandId/setlists'}
              component={AllSetlists}
            />
            <PrivateRoute
              exact
              path={'/dashboard/band/:bandId/setlist'}
              component={SelectedSetlist}
            />
            <PrivateRoute
              exact
              path={'/dashboard/band/:bandId/songs'}
              component={AllSongs}
            />
            <PrivateRoute
              exact
              path={'/dashboard/user'}
              component={UserDashboard}
            />
            <PrivateRoute
              exact
              path={'/dashboard/band/:bandId'}
              component={BandDashboard}
            />
            <PublicOnlyRoute
              path={'/loginfail'}
              component={LoginFail}
            />
            <PrivateRoute
              exact
              path={'/registerband'}
              component={RegisterBand}
            />
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App;
