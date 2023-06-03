import config from './config.js';
import Ghi from './ghi.js';
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
    var app = {}, n = 0, el, ghi
    while (el = document.querySelector('[' + config.prefix + '-controller]')) {
        ghi = new Ghi(el)
        if (el.id) {
            app['$' + el.id] = ghi
        }
        n++
    }
    return n > 1 ? app : ghi
}

export default api;
