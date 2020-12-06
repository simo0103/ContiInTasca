import React, { Component, useState } from "react";
import firebase from '../../firebase';
import { Container, Box, Typography, spacing, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox     } from '@material-ui/core';
import './index.scss';

class Welcome extends Component {

  render() {
    return (
      <div className="welcome">
        <Container className="container" maxWidth="lg">
          <Box margin={5}>
            <Typography align="center" className="MuiTypography-h2">WELCOME</Typography>  
          </Box>
          <Box>
            <Typography align="center" className="MuiTypography-p">Cosa c'è nel tuo portafoglio?</Typography>  
          </Box>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox  name="cash"/>}
              />
              <FormLabel component="legend">Cards</FormLabel>
              <FormControlLabel
                control={<Checkbox  name="bancomat"/>}
              />
              <FormControlLabel
                control={<Checkbox name="prepaid card"/>}
              />

            </FormGroup>
          </FormControl>

        </Container>
      </div>
    )
 }
}

export default Welcome;
