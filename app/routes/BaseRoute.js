import Relay from 'react-relay';

// Our relay route
export default class BaseRoute extends Relay.Route {
  static routeName = 'BaseRoute';
  static queries = {
    businesses: (Component) => Relay.QL`
      query BusinessesQuery {
        businesses {
          ${Component.getFragment('businesses')},
        }
      }
    `,
  };
}
