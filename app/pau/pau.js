import config from './config.js';
import DirectiveParser from './directive-parser.js';
import TextNodeParser from './textnode-parser.js';

const slice = Array.prototype.slice,
    ctrlAttr = config.prefix + '-controller',
    eachAttr = config.prefix + '-each'

function Pau(el, options) {

    if (typeof el === 'string') {
        el = document.querySelector(el)
    }

    this.el = el
    el.pau = this
    this._bindings = {}

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

    // revursively process nodes for directives
    this._compileNode(el, true)

    // if has controller, apply it
    const ctrlID = el.getAttribute(ctrlAttr)
    if (ctrlID) {
        el.removeAttribute(ctrlAttr)
        const controller = config.controllers[ctrlID]
        if (controller) {
            controller.call(this, this.scope)
        } else {
            console.warn('controller ' + ctrlID + ' is not defined.')
        }
    }
}

Pau.prototype._compileNode = function (node, root) {
    const self = this;
    if (node.nodeType === Node.TEXT_NODE) {
        self._compileTextNode(node)
    } else if (node.nodeType !== Node.COMMENT_NODE) {
        const eachExp = node.getAttribute(eachAttr),
            ctrlExp = node.getAttribute(ctrlAttr)
        if (eachExp) {
            const binding = DirectiveParser.parse(eachAttr, eachExp)
            if (binding) {
                self._bind(node, binding)
            }
        } else if (ctrlExp && !root) {
            const id = node.id,
                pau = new Pau(node, {
                    child: true,
                    parentPau: self
                })
            if (id) {
                self['$' + id] = pau
            }
        } else {

            if (node.attributes && node.attributes.length) {
                slice.call(node.attributes).forEach(function (attr) {
                    if (attr.name === ctrlAttr) return
                    let valid = false
                    attr.value.split(',').forEach(function (exp) {
                        const binding = DirectiveParser.parse(attr.name, exp)
                        if (binding) {
                            valid = true
                            self._bind(node, binding)
                        }
                    })
                    if (valid) node.removeAttribute(attr.name)
                })
            }

            if (node.childNodes.length) {
                slice.call(node.childNodes).forEach(function (child) {
                    self._compileNode(child)
                })
            }
        }
    }

}

Pau.prototype._compileTextNode = function (node) {
    return TextNodeParser.parse(node)
}

Pau.prototype._bind = function (node, directive) {

    directive.el = node;
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

    if (directive.deps) {
        directive.deps.forEach(function (dep) {
            const depScope = determinScope(dep, scope),
                depBinding =
                    depScope._bindings[dep.key] ||
                    depScope._createBinding(dep.key)
            if (!depBinding.dependents) {
                depBinding.dependents = []
                depBinding.refreshDependents = function () {
                    depBinding.dependents.forEach(function (dept) {
                        dept.refresh()
                    })
                }
            }
            depBinding.dependents.push(directive)
        })
    }

}

Pau.prototype._createBinding = function (key) {

    const binding = {
        value: this.scope[key],
        changed: false,
        instances: []
    }

    this._bindings[key] = binding

    // bind accessor triggers to scope
    Object.defineProperty(this.scope, key, {
        get: function () {
            return binding.value
        },
        set: function (value) {
            if (value === binding) return
            binding.changed = true
            binding.value = value
            binding.instances.forEach(function (instance) {
                instance.update(value)
            })
            if (binding.refreshDependents) {
                binding.refreshDependents()
            }
        }
    })

    return binding
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
    let val,
        subDump = function (scope) {
            return scope.$dump()
        }
    for (let key in this.scope) {
        if (key.charAt(0) !== '$') {
            val = this._bindings[key]
            if (!val) continue
            if (Array.isArray(val)) {
                dump[key] = val.map(subDump)
            } else {
                dump[key] = this._bindings[key].value
            }
        }
    }
    return dump
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

export default Pau;
