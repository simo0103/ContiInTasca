import React, { Component } from "react";
import firebase from '../../firebase';
import { Container, Box, Typography, FormControl, FormGroup, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import './index.scss';

class Welcome extends Component {

  render() {
    return (
      <div className="welcome">
        <Container className="container" maxWidth="sm">
  
          <Box my={8}>
            <Typography align="center" variant="h3">COSA C'E' NEL TUO PORTAFOGLIO?</Typography>  
          </Box>
          <Box>
            <form component="fieldset">
              <FormControlLabel
                  control={
                    <Checkbox name="cash"
                    />
                  }
                label="Contanti"
              />
              <FormControlLabel
                  control={
                    <Checkbox name="bancomat" 
                    />
                  }
                label="Bancomat"
              />
              <FormControlLabel
                  control={
                    <Checkbox name="prepaid card" 
                    />
                  }
                label="Carta Prepagata"
              />
              <FormControlLabel
                  control={
                    <Checkbox name="buoni pasto" 
                    />
                  }
                label="Buoni Pasto"
              />
              <Box my={8}>
                <Button variant="contained" size="large" fullWidth color="secondary" type="submit">
                  Conferma
              </Button>
              </Box>

          </form>
          </Box>
         

        </Container>
      </div>
    )
  }
}

export default Welcome;
