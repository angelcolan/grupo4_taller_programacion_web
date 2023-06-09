import config from './config.js';
import Emitter from './emitter';
import DirectiveParser from './directive-parser.js';
import TextNodeParser from './textnode-parser.js';

const slice = Array.prototype.slice,
    ctrlAttr = config.prefix + '-controller',
    eachAttr = config.prefix + '-each'

var depsObserver = new Emitter(),
    parsingDeps = false

function Pau(el, options) {

    if (typeof el === 'string') {
        el = document.querySelector(el)
    }

    this.el = el
    el.pau = this
    this._bindings = {}
    this._computed = []

    options = options || {}
    for (let op in options) {
        this[op] = options[op]
    }

    const dataPrefix = config.prefix + '-data'
    let scope = this.scope =
        (options && options.data)
        || config.datum[el.getAttribute(dataPrefix)]
        || {}
    el.removeAttribute(dataPrefix)

    if (scope.$pau) {
        scope = this.scope = scope.$dump()
    }

    scope.$pau = this
    scope.$destroy = this._destroy.bind(this)
    scope.$dump = this._dump.bind(this)
    scope.$index = options.index
    scope.$parent = options.parentPau && options.parentPau.scope

    this.on('set', this._updateBinding.bind(this))

    // revursively process nodes for directives
    this._compileNode(el, true)

    // if has controller, apply it
    const ctrlID = el.getAttribute(ctrlAttr)
    if (ctrlID) {
        el.removeAttribute(ctrlAttr)
        const factory = config.controllers[ctrlID]
        if (factory) {
            factory.call(this, this.scope)
        } else {
            console.warn('controller ' + ctrlID + ' is not defined.')
        }
    }
    parsingDeps = true
    this._computed.forEach(this._parseDeps.bind(this))
    delete this._computed
    parsingDeps = false
}

Pau.prototype._compileNode = function (node, root) {
    const pau = this;
    if (node.nodeType === Node.TEXT_NODE) {
        pau._compileTextNode(node)
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        const eachExp = node.getAttribute(eachAttr),
            ctrlExp = node.getAttribute(ctrlAttr)
        if (eachExp) {
            const directive = DirectiveParser.parse(eachAttr, eachExp)
            if (directive) {
                directive.el = node
                pau._bind(directive)
            }
        } else if (ctrlExp && !root) {
            const child = new Pau(node, {
                child: true,
                parentPau: pau
            })
            if (node.id) {
                pau['$' + node.id] = child
            }
        } else {

            if (node.attributes && node.attributes.length) {
                slice.call(node.attributes).forEach(function (attr) {
                    if (attr.name === ctrlAttr) return
                    let valid = false
                    attr.value.split(',').forEach(function (exp) {
                        const directive = DirectiveParser.parse(attr.name, exp)
                        if (directive) {
                            valid = true
                            directive.el = node
                            pau._bind(directive)
                        }
                    })
                    if (valid) node.removeAttribute(attr.name)
                })
            }

            if (node.childNodes.length) {
                slice.call(node.childNodes).forEach(function (child) {
                    pau._compileNode(child)
                })
            }
        }
    }

}

Pau.prototype._compileTextNode = function (node) {
    return TextNodeParser.parse(node)
}

Pau.prototype._bind = function (directive) {

    directive.pau = this;

    let key = directive.key,
        epr = this.eachPrefixRE,
        isEachKey = epr && epr.test(key),
        scope = this;

    if (isEachKey) {
        key = directive.key = key.replace(epr, '')
    }

    if (epr && !isEachKey) {
        scope = this.parentPau
    }

    const ownerScope = determinScope(directive, scope),
        binding =
            ownerScope._bindings[key] ||
            ownerScope._createBinding(key)

    binding.instances.push(directive)
    directive.binding = binding

    if (directive.bind) {
        directive.bind(binding.value)
    }

    directive.update(binding.value)
}

Pau.prototype._createBinding = function (key) {

    const binding = new Binding(this.scope[key]);
    this._bindings[key] = binding

    const pau = this;
    Object.defineProperty(this.scope, key, {
        get: function () {
            if (parsingDeps) {
                depsObserver.emit('get', binding)
            }
            pau.emit('get', key);
            return binding.isComputed ? binding.value() : binding.value;
        },
        set: function (value) {
            if (value === binding.value) return;
            pau.emit('set', key, value)
        }
    })

    return binding
}

Pau.prototype._updateBinding = function (key, value) {

    const binding = this._bindings[key];
    let type = binding.type = typeOf(value)

    if (type === 'Object') {
        if (value.get) {
            this._computed.push(binding)
            binding.isComputed = true;
            value = value.get
        } else {

        }
    } else if (type === 'Array') {
        watchArray(value)
        value.on('mutate', function () {
            binding.emitChange()
        })
    }

    binding.value = value

    binding.instances.forEach(function (instance) {
        instance.update(value)
    })

    binding.emitChange()
}

Pau.prototype._parseDeps = function (binding) {
    depsObserver.on('get', function (dep) {
        if (!dep.dependents) {
            dep.dependents = []
        }
        dep.dependents.push.apply(dep.dependents, binding.instances)
    })
    binding.value()
    depsObserver.off('get')
}

Pau.prototype._unbind = function () {
    const unbind = function (instance) {
        if (instance.unbind) {
            instance.unbind()
        }
    }
    for (let key in this._bindings) {
        this._bindings[key].instances.forEach(unbind)
    }
}

Pau.prototype._destroy = function () {
    this._unbind()
    delete this.el.pau
    this.el.parentNode.removeChild(this.el)
    if (this.parentPau && this.id) {
        delete this.parentPau['$' + this.id]
    }
}

Pau.prototype._dump = function () {
    const dump = {};
    let binding, val,
        subDump = function (scope) {
            return scope.$dump()
        }
    for (let key in this._bindings) {
        binding = this._bindings[key];
        val = binding.value;
        if (!val) continue
        if (Array.isArray(val)) {
            dump[key] = val.map(subDump)
        } else if (typeof val !== 'function') {
            dump[key] = val
        } else if (binding.isComputed){
            dump[key] = val()
        }
    }
    return dump
}

function Binding (value) {
    this.value = value
    this.instances = []
    this.dependents = []
}

Binding.prototype.emitChange = function () {
    this.dependents.forEach(function (dept) {
        dept.refresh()
    })
}

function determinScope(key, scope) {
    if (key.nesting) {
        let levels = key.nesting
        while (scope.parentPau && levels--) {
            scope = scope.parentPau
        }
    } else if (key.root) {
        while (scope.parentPau) {
            scope = scope.parentPau
        }
    }
    return scope
}

const OtoString = Object.prototype.toString

function typeOf(obj) {
    return OtoString.call(obj).slice(8, -1)
}

var arrayMutators = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

var arrayAugmentations = {
    remove: function (scope) {
        this.splice(scope.$index, 1)
    },
    replace: function (index, data) {
        if (typeof index !== 'number') {
            index = index.$index
        }
        this.splice(index, 1, data)
    }
}

function watchArray(collection) {
    Emitter(collection)
    arrayMutators.forEach(function (method) {
        collection[method] = function () {
            const result = Array.prototype[method].apply(this, arguments)
            collection.emit('mutate', {
                method: method,
                args: Array.prototype.slice.call(arguments),
                result
            })
        }
    })
    for (let method in arrayAugmentations) {
        collection[method] = arrayAugmentations[method]
    }
}

Emitter(Pau.prototype)

export default Pau;
