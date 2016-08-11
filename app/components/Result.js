import React, {
    Component
} from 'react';

export default class Result extends Component {
    render() {
        const { name, description, address, category, latitude, longitude } = this.props.result;
        return <div className="result">
            <h3>{name}</h3>
            <p>{description}</p>
            <p>{address}</p>
            <p>{category}</p>
            <p>{latitude}, {longitude}</p>
          </div>
    }
}
