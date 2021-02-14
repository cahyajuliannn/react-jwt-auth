import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  state = {};
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.Email,
      password: this.Password,
    };
    axios
      .post("accounts/login", data)
      .then((res) => {
        const token = res.data;
        localStorage.setItem("token", token);
        this.setState({
          loggedIn: true,
        });
        this.props.setUser(res.data);
      })
      .catch((err) => {
        this.setState({
          message: err.response.data,
        });
      });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to={"/"} />;
    }

    let error = "";
    if (this.state.message) {
      error = (
        <div className="alert alert-danger" role="alert">
          {this.state.message}
        </div>
      );
    }
    return (
      <form onSubmit={this.handleSubmit}>
        {error}
        <h3>Log In</h3>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={(e) => (this.Email = e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => (this.Password = e.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-block">Sign In</button>
      </form>
    );
  }
}
