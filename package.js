// @flow
Package.describe({
  documentation: 'README.md',
  git: 'https://github.com/meteor-activeroute/core.git',
  name: 'activeroute:core',
  summary: 'The core of activeroute',
  version: '0.1.0',
});

Package.onUse((api) => {
  api.versionsFrom('1.4');
  api.use([
    'check',
    'ecmascript',
    'reactive-dict',
  ]);
  api.mainModule('lib/activeroute.js');
});
