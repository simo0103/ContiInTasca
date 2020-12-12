import React, { Component, Fragment } from "react";
import { getUserFromDb } from "./firebase";
import Registration from "./Pages/Registration/index";
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
                      type="submit"
                      size="large"
                      color="secondary"
                      variant="contained"
                      onClick={() => this.changePage("login")}
                    >
                      SI
                    </Button>
                  </Box>
                  <Box component="span" m={1}>
                    <Button
                      type="submit"
                      size="large"
                      color="secondary"
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
            login: <div>Login</div>,
          }[page]
        }

        {/* {
  this.state.pageName === "registration" ? : <ChoosePaymentType></ChoosePaymentType>
  } */}
      </Fragment>
    );
  }
}

export default App;
