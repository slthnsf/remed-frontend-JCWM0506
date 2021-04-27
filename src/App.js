import React from 'react';
import { Switch, Route } from 'react-router'
import NavbarComp from './component/navbar';
import LandingPage from './pages/landingPage';
import ProductManagement from './pages/productManagement';
import { getProductAction } from './actions'
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    this.props.getProductAction()
  }
  render() { 
    return ( 
      <div>
        <NavbarComp />
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/product-management" component={ProductManagement}/>
        </Switch>
      </div>
     );
  }
}
 
export default connect(null, {getProductAction})(App);