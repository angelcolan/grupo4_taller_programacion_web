import config from './config.js';
import Pau from './pau.js';
import directives from './directives';
import filters from './filters.js';

const controllers = config.controllers,
    datum = config.datum,
    api = {};

api.data = function (id, data) {
    if (!data) return datum[id]
    if (datum[id]) {
        console.warn('data object "' + id + '"" already exists and has been overwritten.')
    }
    datum[id] = data
}

api.controller = function (id, extensions) {
    if (!extensions) return controllers[id]
    if (controllers[id]) {
        console.warn('controller "' + id + '" already exists and has been overwritten.')
    }
    controllers[id] = extensions
}

api.directive = function (name, fn) {
    if (!fn) return directives[name]
    directives[name] = fn
}

api.filter = function (name, fn) {
    if (!fn) return filters[name]
    filters[name] = fn
}

api.bootstrap = function (opts) {
    if (opts) {
        config.prefix = opts.prefix || config.prefix
    }
    const app = {},
        ctrlSlt = '[' + config.prefix + '-controller]',
        dataSlt = '[' + config.prefix + '-data]';
    let n = 0, el, pau;
    while (el = document.querySelector(ctrlSlt) || document.querySelector(dataSlt)) {
        pau = new Pau(el)
        if (el.id) {
            app['$' + el.id] = pau
        }
        n++
    }
    return n > 1 ? app : pau
}

export default api;
