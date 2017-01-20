# ACTIVEROUTE:CORE

The core logic for activeroute.

The core of activeroute gives you javascript helpers for figuring out which
route is the current route.

For blaze helpers please see [activeroute:blaze] etc.

## Install

```sh
meteor add activeroute:core
```

## Usage

```js
import ActiveRoute from 'activeroute:core';
import adapter from 'activeroute:iron-router';

const activeRoute = new ActiveRoute({
  routerAdapter: adapter,
});

activeRoute.name('home');
// return true / false
```

[activeroute:blaze]: (https://github.com/meteor-activeroute/blaze)
