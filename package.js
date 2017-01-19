// @flow
Package.describe({
  documentation: 'README.md',
  git: 'https://github.com/meteor-activeroute/core.git',
  name: 'activeroute:core',
  summary: 'Core logic for active-route.',
  version: '0.1.0',
});

Package.onUse((api) => {
  api.versionsFrom('1.4');
  api.use([
    'check',
    'ecmascript',
    'reactive-dict',
  ]);
  api.mainModule('lib/core.js');
});
