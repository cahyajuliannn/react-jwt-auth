import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { Component } from "react";
import Home from "./components/home.component";
import Nav from "./components/nav.component";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login.component";
import Register from "./components/register.component";

import jwt from "jwt-decode";
import axios from "axios";

export default class App extends Component {
  state = {};
  _isMounted = false;

  componentDidMount = () => {
    this._isMounted = true;
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      var decoded = jwt(storedToken);
      axios.get("accounts/" + decoded.id).then(
        (res) => {
          if (this._isMounted) {
            this.setUser(res.data);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };
  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav user={this.state.user} setUser={this.setUser} />
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={() => (
                    <Home user={this.state.user} setUser={this.setUser} />
                  )}
                />
                <Route
                  exact
                  path="/login"
                  component={() => <Login setUser={this.setUser} />}
                />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
