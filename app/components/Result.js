import React, {
    Component
} from 'react';

export default class Result extends Component {
    render() {
        return <div className="result" >
            <h3> { this.props.name} </h3>
            <p> { this.props.description } </p>
          </div>
    }
}
