// @flow
import ActiveRouteError from './error';

const INVALID_ROUTE_NAME = 'Invalid routeName, expected RegExp or String.';
const INVALID_ROUTE_PATH = 'Invalid routePath, expected RegExp or String.';
const INVALID_ADAPTER = 'Invalid adapter.';
const NO_ADAPTERS_AVAILABLE = 'No adapters available.';
const NO_ROUTER_SELECTED = 'No router selected.';
const ROUTER_NOT_SUPPORTED_ON_CLIENT = 'The selected router isn\'t supported ' +
  'on client-side.';
const ROUTER_NOT_SUPPORTED_ON_SERVER = 'The selected router isn\'t supported ' +
  'on server-side.';
const SELECTED_ADAPTER_NOT_AVAILABLE = 'The selected adapter is not available.';
export const config = new ReactiveDict(CONFIG_NAME);

const routerAdapters = new Map();

config.setDefault({
  caseSensitive: true,
});

function getRouterAdapter() {
  if (!routerAdapters.size) {
    throw new ActiveRouteError(NO_ADAPTERS_AVAILABLE);
  }

  const routerName = config.get('router');

  if (!routerName) {
    throw new ActiveRouteError(NO_ROUTER_SELECTED);
  }

  const routerAdapter = routerAdapters.get(routerName);

  if (!routerAdapter) {
    throw new ActiveRouteError(SELECTED_ADAPTER_NOT_AVAILABLE);
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

    if (config.equals('caseSensitive', false)) {
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
    throw new ActiveRouteError(INVALID_ROUTE_NAME);
  }

  const routerAdapter = getRouterAdapter();

  if (Meteor.isClient && !routerAdapter.client) {
    throw new ActiveRouteError(ROUTER_NOT_SUPPORTED_ON_CLIENT);
  } else if (Meteor.isServer && !routerAdapter.server) {
    throw new ActiveRouteError(ROUTER_NOT_SUPPORTED_ON_SERVER);
  }

  const routePath = routerAdapter.pathFor(routeName, routeParams);

  return test(routePath, routerAdapter.path());
}

export function isActiveRoutePath(routePath) {
  try {
    check(routePath, Match.OneOf(RegExp, String));
  } catch (error) {
    throw new ActiveRouteError(INVALID_ROUTE_PATH);
  }

  const routerAdapter = getRouterAdapter();

  if (Meteor.isClient && !routerAdapter.client) {
    throw new ActiveRouteError(ROUTER_NOT_SUPPORTED_ON_CLIENT);
  } else if (Meteor.isServer && !routerAdapter.server) {
    throw new ActiveRouteError(ROUTER_NOT_SUPPORTED_ON_SERVER);
  }

  return test(routePath, routerAdapter.path());
}

const routerAdapterPattern = {
  client: Boolean,
  name: String,
  path: Match.Optional(Function),
  pathFor: Match.Optional(Function),
  server: Boolean,
};

export function registerRouter(routerAdapter) {
  try {
    check(routerAdapter, routerAdapterPattern);
  } catch (error) {
    throw new ActiveRouteError(INVALID_ADAPTER);
  }
  routerAdapters.set(routerAdapter.name, routerAdapter);
  config.setDefault('router', adapter.name);
}

export const ActiveRoute = {
  config,
  configure,
  registerRouter,
  name: isActiveRouteName,
  path: isActiveRoutePath,
};

export default ActiveRoute;
