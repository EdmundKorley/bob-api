import React from 'react';
import { render } from 'react-dom';
import Relay from 'react-relay';
import Base from './components/Base';
import BaseRoute from './routes/BaseRoute';

// Where our React app touches our HTML
const entryDiv = document.getElementById('bob-portal')

render(
  <Relay.RootContainer Component={Base} route={new BaseRoute()} />,
  entryDiv);
