import React, { Component, Fragment } from "react";
import { getUserFromDb } from "./firebase";
import Registration from "./Pages/Registration/index";
import Login from "./Pages/Login/index";
import ChoosePaymentType from "./Pages/ChoosePaymentType/index";
import { Typography, Button, Container, Box } from "@material-ui/core";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageName: "firstPage",
    };
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    getUserFromDb();
  }

  changePage(page) {
    this.setState({
      pageName: page,
    });
  }

  render() {
    const buttonStyleLogin = {
      backgroundColor: "#009688",
      color: "white",
    };

    const buttonStyleRegistration = {
      backgroundColor: "#f44336",
      color: "white",
    };

    let page = this.state.pageName;

    return (
      <Fragment>
        {
          {
            firstPage: (
              <div>
                <Container maxWidth="lg" align="center">
                  <Box my={8}>
                    <Typography variant="h3">
                      Ciao! Sei già registrato?
                    </Typography>
                  </Box>
                  <Box component="span" m={1}>
                    <Button
                      style={buttonStyleLogin}
                      type="submit"
                      size="large"
                      variant="contained"
                      onClick={() => this.changePage("login")}
                    >
                      SI
                    </Button>
                  </Box>
                  <Box component="span" m={1}>
                    <Button
                      style={buttonStyleRegistration}
                      type="submit"
                      size="large"
                      variant="contained"
                      onClick={() => this.changePage("registration")}
                    >
                      NO
                    </Button>
                  </Box>
                </Container>
              </div>
            ),
            registration: (
              <Registration changePage={this.changePage}></Registration>
            ),
            login: <Login></Login>,
          }[page]
        }
      </Fragment>
    );
  }
}

export default App;
