import React, { Component } from "react";
import firebase from '../../firebase';
import { Container, Box, Typography, FormControl, FormGroup, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import './index.scss';

class Welcome extends Component {

  render() {
    return (
      <div className="welcome">
        <Container className="container" maxWidth="sm">
          <Box margin={5}>
            <Typography align="center" className="MuiTypography-h2">BENVENUTO</Typography>  
          </Box>
          <Box>
            <Typography align="center" className="MuiTypography-p">Cosa c'è nel tuo portafoglio?</Typography>  
          </Box>
          {/* <Box>
            <form component="fieldset" onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormControlLabel
                  control={
                    <Checkbox checked={this.state.checked} value={this.state.elementChecked} name="cash"
                      onChange={this.handleChange}
                    />
                  }
                label="Contanti"
              />
              <FormControlLabel
                  control={
                    <Checkbox name="bancomat" 
                     onChange={this.handleChange}
                    />
                  }
                label="Bancomat"
              />
              <FormControlLabel
                  control={
                    <Checkbox name="prepaid card" 
                     onChange={this.handleChange}
                    />
                  }
                label="Carta Prepagata"
              />
              <FormControlLabel
                  control={
                    <Checkbox name="buoni pasto" 
                      onChange={this.handleChange}
                    />
                  }
                label="Buoni Pasto"
              />

              <Button variant="contained" color="secondary" type="submit">
                Conferma
            </Button>
            </FormGroup>
          </form>
          </Box> */}
         

        </Container>
      </div>
    )
  }
}

export default Welcome;
