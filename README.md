# request-local-storage

This module uses
[continuation-local-storage](https://github.com/othiym23/node-continuation-local-storage)
to provide access to objects that are scoped to the lifespan of a request.

## Usage:

### Storage access

Use `getNamespace` to retrieve a module-level object provider.

Note that `getNamespace` _returns a function_.  It should be called at the
module level.  The function that's returned must be called _for each access_.

Example:

```javascript
const RLS = require('request-local-storage').getNamespace();

function getInstance() {

	// Call `RLS()` to get the _current_ request's local object.
	if (!RLS().instance) {
		RLS().instance = new Instance();
	}

	return RLS().instance;
}
```

### Request initialization

It's easy!

Say you have a request handling function that looks like:

```javascript
function handle(req, res, next) {
	...
}
```

You can initialize `request-local-storage` like this:

```javascript
const RequestLocalStorage = require('request-local-storage');

function handle(req, res, next) { RequestLocalStorage.startRequest(() => {
	...
}}
```

In the browser you don't need to wrap a function.  Just call
`RequestLocalStorage.startRequest()` whenever you start a new request.


