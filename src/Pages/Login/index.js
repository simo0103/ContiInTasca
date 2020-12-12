import React, { Component } from "react";
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.login = this.login.bind(this);
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

  handleChange(e) {
    e.preventDefault();
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  login() {
    let value = this.state.userNameTyped;
    let users = this.state.users || {};
    let userName = Object.values(users).find((x) => x.users === value);
    userName
      ? this.setState({
          openSuccess: true,
        })
      : this.setState({
          openError: true,
        });
  }

  render() {
    return (
      <Container maxWidth="sm" align="center" className="Login">
        <Box my={8}>
          <Typography variant="h2" color="secondary">
            Login
          </Typography>
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
            size="large"
            fullWidth
            color="secondary"
            variant="contained"
            onClick={this.login}
          >
            Conferma
          </Button>
        </section>
        <Box my={8}>
          {this.state.openSuccess && (
            <Alert severity="success">
              <AlertTitle>Bentornato {this.state.userNameTyped}! </AlertTitle>
            </Alert>
          )}
        </Box>
        <Box my={8}>
          {this.state.openError && (
            <Alert severity="success">
              <AlertTitle>Utente non registrato! </AlertTitle>
            </Alert>
          )}
        </Box>
      </Container>
    );
  }
}
export default Login;
