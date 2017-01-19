// @flow
class ActiveRouteCoreError extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'activeroute:core';
  }
}

export default ActiveRouteCoreError;
