import React, { Component } from "react";
// import { initDB } from "./firebase";
import Registration from "./Pages/Registration";
// import WelcomePage from './Pages/WelcomePage/index';


class App extends Component {
  // componentDidMount() {
  //   initDB(1)
  // }
  render() {
    return (
      <Registration></Registration>
    )
  }
}

export default App;
