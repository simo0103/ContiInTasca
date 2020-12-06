import React, { Component } from "react";
import { initDB } from "./firebase";
// import WelcomePage from './Pages/WelcomePage/index';


class App extends Component {
  componentDidMount() {
    initDB(1)
  }
  render() {
    return (
      <p>ciao</p>
    )
  }
}

export default App;
