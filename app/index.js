import React from 'react';
import { render } from 'react-dom';
import Base from './components/Base';

// Where our React app touches our HTML
const entryDiv = document.getElementById('bob-portal')

render(<Base/>, entryDiv);
