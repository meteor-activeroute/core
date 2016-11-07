// @flow
import { check, Match } from 'meteor/check';
import { ReactiveDict } from 'meteor/reactive-dict';
import {
  CONFIG_NAME,
  INVALID_ADAPTER,
  INVALID_ROUTE_NAME,
  INVALID_ROUTE_PATH,
  NO_ADAPTERS_AVAILABLE,
  NO_ROUTER_SELECTED,
  ROUTER_NOT_SUPPORTED_ON_CLIENT,
  ROUTER_NOT_SUPPORTED_ON_SERVER,
  SELECTED_ADAPTER_NOT_AVAILABLE,
} from './constants';
import ActiveRouteError from './error';

export const config = new ReactiveDict(CONFIG_NAME);

config.setDefault({
  caseSensitive: true,
});

const routerAdapters = new Map();

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

function test({ value, pattern }) {
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

export function isActiveRouteName({ regex, name, params = {} }) {
  try {
    if (name) {
      check(name, String);
    } else if (regex) {
      check(regex, RegExp);
    } else {
      throw new ActiveRouteError(INVALID_ROUTE_NAME);
    }
  } catch (error) {
    console.log(error);
    throw new ActiveRouteError(INVALID_ROUTE_NAME);
  }

  const routerAdapter = getRouterAdapter();

  if (Meteor.isClient && !routerAdapter.client) {
    throw new ActiveRouteError(ROUTER_NOT_SUPPORTED_ON_CLIENT);
  } else if (Meteor.isServer && !routerAdapter.server) {
    throw new ActiveRouteError(ROUTER_NOT_SUPPORTED_ON_SERVER);
  }

  const routePath = routerAdapter.pathFor({ name, params });

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
  name: String,
  path: Match.Optional(Function),
  pathFor: Match.Optional(Function),
};

export function registerRouter(routerAdapter) {
  try {
    check(routerAdapter, routerAdapterPattern);
  } catch (error) {
    throw new ActiveRouteError(INVALID_ADAPTER);
  }

  const isDefined = routerAdapter.path || routerAdapter.pathFor;

  const adapter = {
    ...routerAdapter,
    client: isDefined && Meteor.isClient,
    server: isDefined && Meteor.isServer,
  };

  routerAdapters.set(adapter.name, adapter);
  config.setDefault('router', adapter.name);
}

export const ActiveRoute = {
  config,
  registerRouter,
  name: isActiveRouteName,
  path: isActiveRoutePath,
};

export default ActiveRoute;
