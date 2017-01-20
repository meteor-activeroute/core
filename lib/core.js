// @flow
import {
  INVALID_CONSTRUCTOR_ARGUMENTS,
  INVALID_ADAPTER,
  INVALID_NAME_ARGUMENTS,
  INVALID_PATH_ARGUMENTS,
  INVALID_ROUTE_NAME,
  INVALID_ROUTE_NAME_REGEX,
  INVALID_ROUTE_PARAMS,
  INVALID_ROUTE_PATH,
  INVALID_ROUTE_PATH_REGEX,
} from './constants';
import ActiveRouteCoreError from './error';

function isFunction(functionToCheck) {
  const getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function test({ config, pattern, regexPattern, value }) {
  if (!value || (!pattern && !regexPattern)) {
    return false;
  }

  let result = false;

  if (pattern) {
    let v = value;
    let p = pattern;

    if (!config.caseSensitive) {
      v = value.toLowerCase();
      p = pattern.toLowerCase();
    }

    result = v === p;
  } else if (regexPattern) {
    result = value.search(regexPattern);
    result = result > -1;
  }

  return result;
}

class ActiveRoute {
  config = { caseSensitive: false };
  routerAdapter;

  constructor({ routerAdapter, ...config } = {}) {
    if (!routerAdapter) {
      throw new ActiveRouteCoreError(INVALID_CONSTRUCTOR_ARGUMENTS);
    }

    if (!isFunction(routerAdapter.getCurrentName) ||
      !isFunction(routerAdapter.getCurrentPath) ||
      !isFunction(routerAdapter.getPath)) {
      throw new ActiveRouteCoreError(INVALID_ADAPTER);
    }

    this.routerAdapter = routerAdapter;
    this.config = { ...this.config, ...config };
  }

  name(options = {}) {
    if (typeof options === 'string') {
      options = {
        name: options,
      };
    } else if (options instanceof RegExp) {
      options = {
        regex: options,
      };
    }

    const { name, params, queryParams } = options;
    let { regex } = options;

    if (typeof regex === 'string') {
      regex = new RegExp(regex);
    }

    if (name && typeof name !== 'string') {
      throw new ActiveRouteCoreError(INVALID_ROUTE_NAME);
    } else if (regex && !(regex instanceof RegExp)) {
      throw new ActiveRouteCoreError(INVALID_ROUTE_NAME_REGEX);
    } else if (!name && !regex) {
      throw new ActiveRouteCoreError(INVALID_NAME_ARGUMENTS);
    } else if (params && (params !== Object(params) || Array.isArray(params))) {
      throw new ActiveRouteCoreError(INVALID_ROUTE_PARAMS);
    }

    let testOptions = {
      config: this.config,
    };

    if (name && (params || queryParams)) {
      testOptions = {
        ...testOptions,
        pattern: this.routerAdapter.getPath({ routeName: name, routeParams: params, routeQueryParams: queryParams }),
        value: this.routerAdapter.getCurrentPath(this.config.controller),
      };
    } else if (name) {
      testOptions = {
        ...testOptions,
        pattern: name,
        value: this.routerAdapter.getCurrentName(this.config.controller),
      };
    } else if (regex) {
      testOptions = {
        ...testOptions,
        regexPattern: regex,
        value: this.routerAdapter.getCurrentName(this.config.controller),
      };
    }

    return test(testOptions);
  }

  path(options = {}) {
    if (typeof options === 'string') {
      options = {
        path: options,
      };
    } else if (options instanceof RegExp) {
      options = {
        regex: options,
      };
    }

    const { path } = options;
    let { regex } = options;

    if (typeof regex === 'string') {
      regex = new RegExp(regex);
    }

    if (path && typeof path !== 'string') {
      throw new ActiveRouteCoreError(INVALID_ROUTE_PATH);
    } else if (regex && !(regex instanceof RegExp)) {
      throw new ActiveRouteCoreError(INVALID_ROUTE_PATH_REGEX);
    } else if (!path && !regex) {
      throw new ActiveRouteCoreError(INVALID_PATH_ARGUMENTS);
    }

    const testOptions = {
      config: this.config,
      pattern: path,
      regexPattern: regex,
      value: this.routerAdapter.getCurrentPath(this.config.controller),
    };

    return test(testOptions);
  }
}

export default ActiveRoute;
