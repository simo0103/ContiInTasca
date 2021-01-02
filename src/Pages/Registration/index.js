import React, { Component, Fragment } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import firebase from "../../firebase";
import ChoosePaymentType from "../ChoosePaymentType";
import "firebase/auth";

import App from "../../App";

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      username: "",
      openSuccess: false,
      openError: false,
      errorMessage: "",
      pageName: "registrationPage",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  changePage(page) {
    this.setState({
      pageName: page,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var email = this.state.email;
    var password = this.state.password;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({
          openSuccess: true,
        });
        setTimeout(() => {
          this.setState({
            open: false,
            users: "",
          });
          this.changePage("choosePaymentType");
        }, 4000);
      })
      .catch((error) => {
        this.setState({
          openError: true,
          errorMessage: error.message,
        });
        setTimeout(() => {
          this.setState({
            open: false,
          });
        }, 2000);
      });
  }

  render() {
    let page = this.state.pageName;

    const buttonStyleRegistration = {
      backgroundColor: "#f44336",
      color: "white",
    };
    const alertStyle = {
      position: "absolute",
      top: 0,
      width: "600px",
    };
    return (
      <Fragment>
        {
          {
            registrationPage: (
              <Container maxWidth="sm" align="center" className="Registration">
                <Box style={alertStyle}>
                  {this.state.openError && (
                    <Alert severity="error">
                      <AlertTitle>{this.state.errorMessage}</AlertTitle>
                    </Alert>
                  )}
                  {this.state.openSuccess && (
                    <Alert severity="success">
                      <AlertTitle>Ciao {this.state.username}! </AlertTitle>
                    </Alert>
                  )}
                </Box>

                <Box my={2}>
                  <Typography variant="h2">BENVENUTO!</Typography>
                </Box>

                <section className="addusers">
                  <form
                    autoComplete="off"
                    onSubmit={(e) => this.handleSubmit(e)}
                  >
                    <Box my={4}>
                      <TextField
                        type="text"
                        name="username"
                        label="Come ti chiami?"
                        id="input-username"
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        onChange={this.handleChange}
                        value={this.state.username}
                      />
                    </Box>
                    <Box my={4}>
                      <TextField
                        type="text"
                        name="email"
                        label="E-mail"
                        id="input-email"
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        onChange={this.handleChange}
                        value={this.state.email}
                      />
                    </Box>
                    <Box my={4}>
                      <TextField
                        type="password"
                        name="password"
                        label="Password"
                        id="input-password"
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        onChange={this.handleChange}
                        value={this.state.password}
                      />
                    </Box>
                    <Button
                      type="submit"
                      style={buttonStyleRegistration}
                      size="large"
                      fullWidth
                      variant="contained"
                    >
                      Conferma
                    </Button>
                  </form>
                </section>
                <Box my={8}>
                  <Button
                    style={buttonStyleRegistration}
                    type="submit"
                    cursor="pointer"
                    size="large"
                    variant="contained"
                    onClick={() => this.changePage("firstPage")}
                  >
                    INDIETRO
                  </Button>
                </Box>
              </Container>
            ),
            choosePaymentType: (
              <ChoosePaymentType
                changePage={this.changePage}
              ></ChoosePaymentType>
            ),
            firstPage: <App></App>,
          }[page]
        }
      </Fragment>
    );
  }
}
export default Registration;
