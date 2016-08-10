import React, { Component } from 'react';
import Relay from 'react-relay';
import Header from './Header';
import Map from './Map';
import Query from './Query';
import Result from './Result';
import Footer from './Footer';

class Base extends Component {
  render () {
    console.log(`****** PROPS ${JSON.stringify(this.props, null, '\t')}`);
    return <div className="container">
      <Header />
      <div className="jumbotron">
        <Map />
        <Query />
      </div>
      <div className="row bob-results">
        <div className="col-lg-6">
          <Result />
        </div>
        <div className="col-lg-6">
          <Result />
        </div>
      </div>
      <Footer />
    </div>
  }
}

export default Relay.createContainer(Base, {
  fragments: {
    businesses: () => Relay.QL`
      fragment on Business @relay(plural: true) {
        id, name, description, category, address, latitude, longitude
      }
    `,
  }
});
