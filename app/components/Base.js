import React, { Component } from 'react';
import Header from './Header';
import Map from './Map';
import Query from './Query';
import Result from './Result';
import Footer from './Footer';

// Our fetch module for making simple queries to our GraphQL API
var fetch = require('graphql-fetch')('http://localhost:8000/graphql')

class Base extends Component {
  constructor(props) {
      super(props);
      this.state = {
          businesses: [],
          offset: 0,
          limit: 10
      };
  }
  componentDidMount() {
    let query = `
        query {
            businesses {
                id, name, description, category, address, latitude, longitude
            }
        }
    `;

    fetch(query)
          .then((results) => {
            if (results.errors) console.warn('****** ERRORS', results.errors);

              this.setState({ businesses: results.data.businesses })
          })
          .catch((error) => {
            console.warn(`****** ERRORS ${error}`);
          });
  }
  render() {
      console.log(this.state.businesses);
      let resultsLeft = [], resultsRight = [];
      for (let i = 0; i < this.state.businesses.length; i++) {
        // If even numbered, put in one column, else other column
        if ( (i+1) % 2 == 0) {
            console.log('even', i);
            resultsLeft.push(<Result result={this.state.businesses[i]} />);
        } else {
            resultsRight.push(<Result result={this.state.businesses[i]} />);
        }
      }
    return <div className="container">
      <Header />
      <div className="jumbotron">
        <Map />
        <Query />
      </div>
      <div className="row bob-results">
        <div className="col-lg-6">
            {resultsLeft}
        </div>
        <div className="col-lg-6">
            {resultsRight}
        </div>
      </div>
      <Footer />
    </div>
  }
}

export default Base;

