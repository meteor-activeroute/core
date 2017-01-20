# activeroute:core

The core logic for activeroute.

The core of activeroute gives you javascript helpers for figuring out which
route is the current route.

For blaze helpers please see [activeroute:blaze].

## Install

```sh
meteor add activeroute:core
```

Don't forget to install a router adapter too.

* [activeroute:iron-router]
* [activeroute:flow-router]

## Usage

```js
import ActiveRoute from 'meteor/activeroute:core';
import adapter from 'meteor/activeroute:iron-router';

const activeRoute = new ActiveRoute({
  routerAdapter: adapter,
});

activeRoute.name('home');
// return true/false
```

[activeroute:blaze]: https://github.com/meteor-activeroute/blaze
[activeroute:flow-router]: https://github.com/meteor-activeroute/flow-router
[activeroute:iron-router]: https://github.com/meteor-activeroute/iron-router
