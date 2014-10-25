require-namespaced
==================

A solution for a problem you shouldn't have. You should use private npm packages.

## Why You Should Not Use This Module.

This is really a problem that you shouldn't have. You should really just use `npm` and private registries. This should only be used if using a private registry really isn't an option. This module will be unpublished when the public registry has full support for [scoped packages](https://docs.npmjs.com/misc/scope).

## Why did I make this module?

I'm working for a client for whom it's infeasable to deploy a private npm install. That, and the public registry doesn't yet have great support for private scoped packages. So, instead to allow us to write modular code, my solution is to create a module that wraps `require`.

## How to use?

Given a directory structure for your project such as:

```
  ├── Procfile
  ├── README.md
  ├── bin/
  ├── lib/
  |   ├── server.js
  │   ├── apps/
  │   │   ├── admin/
  │   │   │   ├── node_modules/
  │   │   │   ├── routes/
  │   │   │   ├── views/
  │   │   │   ├── index.js
  │   │   │   ├── package.json
  │   │   │   └── README.md
  │   │   └── api
  │   │       ├── node_modules/
  │   │       ├── routes/
  │   │       ├── views/
  │   │       ├── index.js
  │   │       ├── package.json
  │   │       └── README.md
  |   └── services/
  |       ├── database/
  │       │   ├── node_modules/
  │       │   ├── index.js
  │       │   ├── package.json
  │       │   └── README.md
  |       ├── user/
  │       │   ├── node_modules/
  │       │   ├── index.js
  │       │   ├── package.json
  │       │   └── README.md
  │       └── media/
  │           ├── node_modules/
  │           ├── index.js
  │           ├── package.json
  │           └── README.md
  ├── package.json
  └── index.js
```

Then you can do something like the following in `lib/server.js`:

```
  var requireNS = require('require-namespaced');
  var path = require('path');

  requireNS.add('apps', path.join(__dirname, 'apps'));
  requireNS.add('services', path.join(__dirname, 'services'));
```

Then later in an `lib/apps/admin/index.js` you can do something like:

```
  var requireNS = require('require-namespaced');
  var mediaService = requireNS('services', 'media');
  var userService = requireNS('services', 'user');
```

If a module isn't found, then an error will be thrown just like with `require`, but the `namespace` you were looking in will be included in the `err.message`.
