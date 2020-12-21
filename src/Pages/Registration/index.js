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
import App from "../../App";

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      users: "",
      open: false,
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
    const listaUtenti = firebase.database().ref("listaUtenti");
    const newUser = {
      users: this.state.users,
    };

    listaUtenti.push(newUser);

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
      this.changePage("choosePaymentType");
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
    let page = this.state.pageName;

    const buttonStyleRegistration = {
      backgroundColor: "#f44336",
      color: "white",
    };
    return (
      <Fragment>
        {
          {
            registrationPage: (
              <Container maxWidth="sm" align="center" className="Registration">
                <Box my={8}>
                  <Typography variant="h2">BENVENUTO!</Typography>
                </Box>
                <Box my={8}>
                  <Typography variant="h3">Come ti chiami?</Typography>
                </Box>
                <section className="addusers">
                  <form
                    autoComplete="off"
                    onSubmit={(e) => this.handleSubmit(e)}
                  >
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
                      style={buttonStyleRegistration}
                      size="large"
                      fullWidth
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
                      <AlertTitle>Ciao {this.state.users}! </AlertTitle>
                    </Alert>
                  )}
                </Box>
                <Button
                  style={buttonStyleRegistration}
                  type="submit"
                  size="large"
                  variant="contained"
                  onClick={() => this.changePage("firstPage")}
                >
                  INDIETRO
                </Button>
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
