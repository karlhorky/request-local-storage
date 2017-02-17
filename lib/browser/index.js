"use strict";

if (false) var key = "_request_local_storage_", cls = require("continuation-local-storage").createNamespace(key), bind = cls.bind.bind(cls), patch = function patch(func) {
    return func(cls);
}, getContainer = function getContainer() {
    return cls.get(key);
}, startRequest = function startRequest(start) {
    cls.run(function() {
        cls.set(key, []);
        start();
    });
}; else var container = [], bind = function bind(f) {
    return f;
}, patch = function patch() {}, getContainer = function getContainer() {
    return container;
}, startRequest = function startRequest() {
    return container = [];
};

var namespaces = 0, getCountNamespaces = function getCountNamespaces() {
    return namespaces;
}, getNamespace = function getNamespace() {
    var getter = function(i) {
        return function() {
            var container = getContainer();
            if (!container) throw new Error("RLS() access outside of request!");
            return container[i] || (container[i] = {});
        };
    }(namespaces++);
    getter.isActive = function() {
        return !!getContainer();
    };
    if (false && Object.observe) Object.observe(getter, function(changes) {
        throw new Error('Use of "RLS.' + changes[0].name + '" should be "RLS().' + changes[0].name + '"!');
    });
    return getter;
};

module.exports = global.requestLocalStorage || {
    getNamespace: getNamespace,
    getCountNamespaces: getCountNamespaces,
    startRequest: startRequest,
    bind: bind,
    patch: patch
};

if (!global.requestLocalStorage) global.requestLocalStorage = module.exports;