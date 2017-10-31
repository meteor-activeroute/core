# activeroute:core

<a target="_blank" rel="nofollow" href='https://app.codesponsor.io/link/n1D2X97JRsqcMiGrQVhHNMDy/meteor-activeroute/core'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/n1D2X97JRsqcMiGrQVhHNMDy/meteor-activeroute/core.svg' />
</a>

---

This is the core logic of activeroute.

activeroute:core provides javascript helpers for
figuring out which route is the current route.
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
