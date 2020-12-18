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
import App from "../../App";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageName: "loginPage",
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    var listaUtenti = firebase.database().ref("listaUtenti");
    listaUtenti.on("value", (snapshot) => {
      const users = snapshot.val();
      this.setState({
        users: users,
      });
    });
  }

  changePage(page) {
    this.setState({
      pageName: page,
    });
  }

  handleChange(e) {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleLogin() {
    let value = this.state.userNameTyped;
    let users = this.state.users || {};
    let userName = Object.values(users).find((x) => x.users === value);
    userName
      ? this.setState(
          {
            openSuccess: true,
          },
          this.goToNextPage()
        )
      : this.setState({
          openError: true,
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
                <Box my={8}>
                  <Typography variant="h3">Qual è il tuo username?</Typography>
                </Box>
                <section className="addusers">
                  <Box my={4}>
                    <TextField
                      type="text"
                      name="userNameTyped"
                      id="outlined-basic"
                      variant="outlined"
                      value={this.state.userNameTyped || ""}
                      fullWidth
                      color="secondary"
                      onChange={this.handleChange}
                    />
                  </Box>
                  <Button
                    style={buttonStyleLogin}
                    size="large"
                    fullWidth
                    variant="contained"
                    onClick={this.handleLogin}
                  >
                    Conferma
                  </Button>
                </section>

                <Box my={8}>
                  {this.state.openSuccess && (
                    <Alert severity="success">
                      <AlertTitle>
                        Bentornato {this.state.userNameTyped}!{" "}
                      </AlertTitle>
                    </Alert>
                  )}
                </Box>
                <Box my={8}>
                  {this.state.openError && (
                    <Alert severity="warning">
                      <AlertTitle>Utente non registrato! </AlertTitle>
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
