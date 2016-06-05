import conf from './config';

const INVALID_ROUTE_NAME = 'Invalid routeName, expected RegExp or String.';
const INVALID_ROUTE_PATH = 'Invalid routePath, expected RegExp or String.';
const INVALID_ADAPTER = 'Invalid adapter.';
const NO_ADAPTERS_AVAILABLE = 'No adapters available.';
const NO_ROUTER_SELECTED = 'No router selected.';
const SELECTED_ADAPTER_NOT_AVAILABLE = 'The selected adapter is not available.';

const routerAdapters = new Map();

conf.setDefault({
  caseSensitive: true,
});

function getRouterAdapter() {
  if (!routerAdapters.size) {
    throw new Error(NO_ADAPTERS_AVAILABLE);
  }

  const routerName = conf.get('router');

  if (!routerName) {
    throw new Error(NO_ROUTER_SELECTED);
  }

  const routerAdapter = routerAdapters.get(routerName);

  if (!routerAdapter) {
    throw new Error(SELECTED_ADAPTER_NOT_AVAILABLE);
  }

  return routerAdapter;
}

function test(value, pattern) {
  let result;

  if (!value || !pattern) {
    return false;
  }

  if (Match.test(pattern, RegExp)) {
    result = value.search(pattern);
    result = result > -1;
  } else if (Match.test(pattern, String)) {
    let tempValue = value;
    let tempPattern = pattern;

    if (conf.equals('caseSensitive', false)) {
      tempValue = value.toLowerCase();
      tempPattern = pattern.toLowerCase();
    }

    result = tempValue === tempPattern;
  }

  return result || false;
}

export function config(...args) {
  conf.set(...args);
}

export function configure(options) {
  config(options);
}

export function isActiveRouteName(routeName, routeParams = {}) {
  try {
    check(routeName, Match.OneOf(RegExp, String));
  } catch (error) {
    throw new Error(INVALID_ROUTE_NAME);
  }

  const routerAdapter = getRouterAdapter();

  const routePath = routerAdapter.pathFor(routeName, routeParams);

  return test(routePath, routerAdapter.path());
}

export function isActiveRoutePath(routePath) {
  try {
    check(routePath, Match.OneOf(RegExp, String));
  } catch (error) {
    throw new Error(INVALID_ROUTE_PATH);
  }

  const routerAdapter = getRouterAdapter();

  return test(routePath, routerAdapter.path());
}

const routerAdapterPattern = {
  path: Function,
  pathFor: Function,
  name: String,
};

export function registerRouter(routerAdapter) {
  try {
    check(routerAdapter, routerAdapterPattern);
  } catch (error) {
    throw new Error(INVALID_ADAPTER);
  }
  routerAdapters.set(routerAdapter.name, routerAdapter);
  conf.setDefault('router', routerAdapter.name);
}

export const ActiveRoute = {
  config,
  configure,
  registerRouter,
  name: isActiveRouteName,
  path: isActiveRoutePath,
};

export default ActiveRoute;
