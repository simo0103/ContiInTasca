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
  constructor() {
    super();
    this.state = {
      users: "",
      open: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const listaUtenti = firebase.database().ref("listaUtenti");
    const users = {
      users: this.state.users,
    };

    listaUtenti.push(users);

    listaUtenti.on("value", (u) => {
      console.log(u.val());
    });

    this.setState({
      open: true,
    });
    setTimeout(() => {
      this.setState({
        open: false,
        users: "",
      });
      this.props.changePage("cards");
    }, 4000);
  }

  componentDidMount() {
    const usersInList = firebase.database().ref("listaUtenti");
    usersInList.on("value", (snapshot) => {
      let users = snapshot.val();
      this.setState({
        allUsers: users,
        usersId: Object.entries(users).map(([k, v]) => k),
      });
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
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <Box my={4}>
              <TextField
                type="text"
                name="users"
                id="outlined-basic"
                variant="outlined"
                fullWidth
                color="secondary"
                onChange={this.handleChange}
                value={this.state.users}
              />
            </Box>
            <Button
              type="submit"
              size="large"
              fullWidth
              color="secondary"
              disabled={!this.state.users}
              variant="contained"
            >
              Conferma
            </Button>
          </form>
        </section>
        <Box my={8}>
          {this.state.open && (
            <Alert severity="success">
              <AlertTitle>Bentornato {this.state.users}! </AlertTitle>
            </Alert>
          )}
        </Box>
      </Container>
    );
  }
}
export default Login;
