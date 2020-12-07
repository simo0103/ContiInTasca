import React, { Component } from "react";
import firebase from './firebase';
import { Button, Container, Box, ListItem } from '@material-ui/core';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';

class Esempio extends Component {
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const listaUscite = firebase.database().ref('listaUscite');
    const uscite = {
      spesa: this.state.spesa,
      importo: this.state.importo
    }
    
    listaUscite.push(uscite);
    this.setState({
      spesa: '',
      importo: ''
    })
     listaUscite.on('value', u => {
    console.log(u.val())
    })
  }
  constructor() {
    super();
    this.state = {
      spesa: '',
      importo: '',
      listaUscite: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  deleteFromList(itemId) {
    const itemRef = firebase.database().ref(`/listaUscite/${itemId}`)
    itemRef.remove();
  }

  componentDidMount() {
    const itemsInList = firebase.database().ref('listaUscite');
    itemsInList.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          importo: items[item].importo,
          spesa: items[item].spesa
        });
      }
      this.setState({
        listaUscite : newState
      })
    })
  }
  
  render() {
    return (
      <div className="Esempio">
        <Container className="container">
          <section className="addSpesa">
            <form onSubmit={this.handleSubmit}>
              <label>Cosa hai comprato?</label>
              <input type="text" name="spesa" onChange={this.handleChange} value={this.state.spesa}  />
              <label>Quanto hai speso?</label>
              <input type="number" name="importo"  onChange={this.handleChange} value={this.state.importo}/>
              <Button variant="contained">Submit</Button>
            </form>
          </section>

          <Box className="listaspese">
            <p>LISTA SPESE</p>
            <Box>
              {
                this.state.listaUscite.map((item) => {
                  return (
                    <ListItem button key={item.id}>
                      <span>{item.spesa}</span>
                      <span>{item.importo}</span>
                      <DeleteOutlineSharpIcon variant="contained" color="secondary" onClick = {() => this.deleteFromList(item.id)}>Delete</DeleteOutlineSharpIcon>
                    </ListItem>
                  )
                
                })
              }
            </Box>
          </Box>
        </Container>
      </div>
    )
 }
}

export default Esempio;
// src
// --- layout
//     -Nav
//     -Footer
//     -PageContainer

// --- components
//     - Button
//         style.scss
//         index.js
//     - List
//     - Carousel

// --- Pages
//         WelcomePage
//             - components
//             - style
//             index.js
// --- utils

// --- helpers

// Esempio.js
// Esempio.scss