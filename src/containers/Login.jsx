import React, { Component, useState } from "react";
import "../index.css";
import CustomInput from "../components/CustomInput";
import Button from "../components/Button";
import { Card, Grid } from "@material-ui/core";

export default class Login extends Component {
  state = {
    userName: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  render() {
    return (
      <div className="Login">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "50vh" }}
        >
          <Grid item xs={3}>
            <Card>
              <form className="form">
                <CustomInput
                  labelText="Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  handleChange={this.handleChange}
                  type="text"
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  handleChange={this.handleChange}
                  type="password"
                />

                <Button
                  type="button"
                  color="primary"
                  className="form__custom-button"
                >
                  Log in
                </Button>
              </form>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
