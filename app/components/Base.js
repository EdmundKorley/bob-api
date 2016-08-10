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
    this.state = {};
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

              console.log(`RESULTS ****`);
              console.log(results);
              return results;
          })
          .catch((error) => {
            console.warn(`****** ERRORS ${error}`);
          });
  }
  render() {
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

export default Base;

