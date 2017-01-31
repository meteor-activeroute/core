// @flow
class ActiveRouteCoreError extends Error {
  constructor() {
    super();
    this.name = 'activeroute:core';
  }
}

export default ActiveRouteCoreError;
