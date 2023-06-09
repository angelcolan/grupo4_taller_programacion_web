import config from './config.js';
import directives from './directives';
import filters from './filters.js';

var KEY_RE = /^[^\|<]+/,
    ARG_RE = /([^:]+):(.+)$/,
    FILTERS_RE = /\|[^\|<]+/g,
    FILTER_TOKEN_RE = /[^\s']+|'[^']+'/g,
    DEPS_RE = /<[^<\|]+/g,
    INVERSE_RE = /^!/,
    NESTING_RE = /^\^+/

function parseKey(rawKey) {

    const res = {},
        argMatch = rawKey.match(ARG_RE)

    res.key = argMatch
        ? argMatch[2].trim()
        : rawKey.trim()

    res.arg = argMatch
        ? argMatch[1].trim()
        : null

    res.inverse = INVERSE_RE.test(res.key)
    if (res.inverse) {
        res.key = res.key.slice(1)
    }

    const nesting = res.key.match(NESTING_RE)
    res.nesting = nesting
        ? nesting[0].length
        : false

    res.root = res.key.charAt(0) === '$'

    if (res.nesting) {
        res.key = res.key.replace(NESTING_RE, '')
    } else if (res.root) {
        res.key = res.key.slice(1)
    }

    return res
}

function parseFilter(filter) {

    const tokens = filter.slice(1)
        .match(FILTER_TOKEN_RE)
        .map(function (token) {
            return token.replace(/'/g, '').trim()
        })

    return {
        name: tokens[0],
        apply: filters[tokens[0]],
        args: tokens.length > 1
            ? tokens.slice(1)
            : null
    }
}

function Directive(directiveName, expression) {

    let prop, directive = directives[directiveName]
    if (typeof directive === 'function') {
        this._update = directive
    } else {
        for (prop in directive) {
            if (prop === 'update') {
                this['_update'] = directive.update
            } else {
                this[prop] = directive[prop]
            }
        }
    }

    this.directiveName = directiveName
    this.expression = expression

    const rawKey = expression.match(KEY_RE)[0],
        keyInfo = parseKey(rawKey)

    for (prop in keyInfo) {
        this[prop] = keyInfo[prop]
    }

    const filterExps = expression.match(FILTERS_RE)
    this.filters = filterExps
        ? filterExps.map(parseFilter)
        : null
}

Directive.prototype.refresh = function () {
    const getter = this.value
    if (getter && typeof getter === 'function') {
        let value = getter.call(this.pau.scope)
        if (this.inverse) value = !value
        this._update(
            this.filters ? this.applyFilters(value) : value
        )
    }
    this.binding.emitChange()
}

Directive.prototype.update = function (value) {
    if (value && (value === this.value)) return
    this.value = value
    // computed property
    if (typeof value === 'function' && !this.fn) {
        value = value()
    }
    if (this.inverse) value = !value
    this._update(
        this.filters ? this.applyFilters(value) : value
    )
    if (this.binding.isComputed) {
        this.refresh()
    }
}

Directive.prototype.applyFilters = function (value) {
    let filtered = value
    this.filters.forEach(function (filter) {
        if (!filter.apply) throw new Error('Unknown filter: ' + filter.name)
        filtered = filter.apply(filtered, filter.args)
    })
    return filtered
}

export default {

    // make sure the directive and value is valid
    parse: function (dirname, expression) {

        const prefix = config.prefix
        if (dirname.indexOf(prefix) === -1) return null
        dirname = dirname.slice(prefix.length + 1)

        const dir = directives[dirname],
            valid = KEY_RE.test(expression)

        if (!dir) console.warn('unknown directive: ' + dirname)
        if (!valid) console.warn('invalid directive expression: ' + expression)

        return dir && valid
            ? new Directive(dirname, expression)
            : null
    }
}
