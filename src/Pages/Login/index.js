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
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import App from "../../App";
import "firebase/auth";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      username: "",
      openSuccess: false,
      openError: false,
      errorMessage: "",
      pageName: "loginPage",
    };
    this.handleLogin = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  getUserInfo() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        username: user.displayName,
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        this.getUserInfo();
        this.setState(
          {
            openSuccess: true,
          },
          this.goToNextPage()
        );
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
          openError: true,
        });
      });
  }

  goToNextPage() {
    setTimeout(() => {
      this.changePage("otherPage");
    }, 2000);
  }

  render() {
    let page = this.state.pageName;

    const buttonStyleLogin = {
      backgroundColor: "#009688",
      color: "white",
    };

    return (
      <Fragment>
        {
          {
            loginPage: (
              <Container maxWidth="sm" align="center" className="Login">
                <Box my={8}>
                  <Typography variant="h2">Login</Typography>
                </Box>

                <section className="addusers">
                  <form
                    autoComplete="off"
                    onSubmit={(e) => this.handleSubmit(e)}
                  >
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
                      style={buttonStyleLogin}
                      size="large"
                      fullWidth
                      variant="contained"
                    >
                      Conferma
                    </Button>
                  </form>
                </section>

                <Box my={8}>
                  {this.state.openSuccess && (
                    <Alert severity="success">
                      <AlertTitle>Bentornato {this.state.username}</AlertTitle>
                    </Alert>
                  )}
                </Box>
                <Box my={8}>
                  {this.state.openError && (
                    <Alert severity="warning">
                      <AlertTitle>{this.state.errorMessage}</AlertTitle>
                    </Alert>
                  )}
                </Box>
                <Button
                  style={buttonStyleLogin}
                  type="submit"
                  size="large"
                  variant="contained"
                  onClick={() => this.changePage("firstPage")}
                >
                  INDIETRO
                </Button>
              </Container>
            ),
            otherPage: <div>ALTRA PAGINA!</div>,
            firstPage: <App></App>,
          }[page]
        }
      </Fragment>
    );
  }
}
export default Login;
