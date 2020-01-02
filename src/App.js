import React, { Component } from "react";
import LoginPage from "./routes/LoginPage";
import Header from "./components/Header/Header";
import NotFoundPage from "./routes/NotFoundPage";
import RegisterUser from "./routes/RegisterUser";
import UserDashboard from "./routes/UserDashboard";
import BandDashboard from "./routes/BandDashboard";
import AllSetlists from "./routes/AllSetlists";
import LoginFail from './routes/LoginFail';
import RegisterBand from './routes/RegisterBand';
import PrivateRoute from './components/Utils/PrivateRoute';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
import { Route, Switch } from "react-router-dom";
// import Context from "./Context";

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

    // fetch('http://localhost:8000/api', {
    //   method: 'POST',
    //   headers: {
    //     // 'Content-type': 'application/json',
    //     'Content-type': 'text/plain',
    //     'Authorization': '`Bearer` + ${getAuthToken()}`',
    //   },
    //   body: 'mattocattt'
    // })
    //   .then((res) => {

    //     return res.text()

    //   })
    //   .then((res) => {

    //     console.log(res);
    //   })

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
              path={'/dashboard/band/setlists'}
              component={AllSetlists}
            />
            <PrivateRoute
              path={'/dashboard/user'}
              component={UserDashboard}
            />
            <PrivateRoute
              path={`/dashboard/band/`}
              component={BandDashboard}
            />
            <PublicOnlyRoute
              path={'/loginfail'}
              component={LoginFail}
            />
            <PrivateRoute
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

  //   fetch('http://localhost:8000/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //       // 'Authorization': `Bearer ${config.REACT_APP_API_KEY}`,
  //     },
  //     body: 'mattocattt'
  //   })
  //     .then((res) => {
  //   console.log(res);
  // })

  // return (
  //   <main className="App">
  //     'hello errbody'
  //     </main>
  // );
}

export default App;
