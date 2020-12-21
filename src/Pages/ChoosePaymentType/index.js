import React, { Component } from "react";
import firebase from "../../firebase";
import {
  Container,
  Box,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import "./index.scss";

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      tipoPagamento: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="welcome">
        <Container className="container" maxWidth="sm">
          <Box my={8}>
            <Typography align="center" variant="h3">
              COSA C'E' NEL TUO PORTAFOGLIO?
            </Typography>
          </Box>
          <Box>
            <form component="fieldset">
              <FormControlLabel
                control={
                  <Checkbox
                    name="cash"
                    value="this.state.value"
                    onChange={this.handleChange}
                  />
                }
                label="Contanti"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="bancomat"
                    value="this.state.value"
                    onChange={this.handleChange}
                  />
                }
                label="Bancomat"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="prepaid card"
                    value="this.state.value"
                    onChange={this.handleChange}
                  />
                }
                label="Carta Prepagata"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="buoni pasto"
                    value="this.state.value"
                    onChange={this.handleChange}
                  />
                }
                label="Buoni Pasto"
              />
              <Box my={8}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  color="secondary"
                  type="submit"
                >
                  Conferma
                </Button>
              </Box>
            </form>
          </Box>
        </Container>
      </div>
    );
  }
}

export default Welcome;
