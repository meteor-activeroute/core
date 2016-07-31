Package.describe({
  documentation: 'README.md',
  git: 'https://github.com/meteor-activeroute/core.git',
  name: 'activeroute:core',
  version: '0.0.1',
  summary: 'The core utilities for active-route',
});

Package.onUse((api) => {
  api.versionsFrom('1.3.2.4');
  api.use([
    'check',
    'ecmascript',
    'reactive-dict',
  ]);
  api.mainModule('lib/activeroute.js');
});
