// @flow
export default class ActiveRouteError extends Error {

  constructor(...args) {
    super(...args);
    this.name = 'ActiveRouteError';
  }

}
