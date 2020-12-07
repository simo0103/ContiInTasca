import React, { Component, Fragment } from "react";
// import { initDB } from "./firebase";
import Registration from "./Pages/Registration/index";
import ChoosePaymentType from './Pages/ChoosePaymentType/index';


class App extends Component {
  // componentDidMount() {
  //   initDB(1)
  // }
 constructor(props) {
    super(props);
    this.state = {
      pageName : 'registration'
    }
    this.changePage = this.changePage.bind(this)
  }
  changePage(page) {
    this.setState({
      pageName : page
    })
  }
  render() {
    return (
      <ChoosePaymentType></ChoosePaymentType>
      // <Fragment>
      //   {
      //     this.state.pageName === "registration" ? <Registration changePage={this.changePage}></Registration> : <ChoosePaymentType></ChoosePaymentType>
      //   }
      // </Fragment>
      
    )
  }

}

export default App;
