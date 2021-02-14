import React, { Component } from "react";
import axios from "axios";

export default class Register extends Component {
  state = {};
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: this.Username,
      phone: this.Phone,
      email: this.Email,
      password: this.Password,
      confirmPassword: this.ConfirmPassword,
    };
    axios
      .post("accounts/register", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.status == 400) {
          this.setState({
            message: "Plese insert the value",
          });
        }
      });
  };

  render() {
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
        <h3>Sign Up</h3>
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            onChange={(e) => (this.Username = e.target.value)}
          />
        </div>
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
          <label>Phone Number</label>
          <input
            type="number"
            className="form-control"
            placeholder="Phone Number"
            onChange={(e) => (this.Phone = e.target.value)}
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Repeat Password"
            onChange={(e) => (this.ConfirmPassword = e.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-block">Sign Up</button>
      </form>
    );
  }
}
