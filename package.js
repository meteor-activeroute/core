// @flow
Package.describe({
  documentation: 'README.md',
  git: 'https://github.com/meteor-activeroute/core.git',
  name: 'activeroute:core',
  summary: 'Core logic for active-route.',
  version: '0.1.0',
});

Package.onUse(function onUse(api) {
  api.versionsFrom('1.4.2.2');

  api.use('ecmascript');

  api.mainModule('lib/core.js', ['client', 'server'], { lazy: true });
});
