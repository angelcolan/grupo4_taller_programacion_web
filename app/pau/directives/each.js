import config from '../config.js';
import Pau from '../pau.js';

const mutationHandlers = {
    push: function (m) {
        const self = this
        m.args.forEach(function (data, i) {
            const pau = self.buildItem(data, self.collection.length + i)
            self.container.insertBefore(pau.el, self.marker)
        })
    },
    pop: function (m) {
        m.result.$destroy()
    },
    unshift: function (m) {
        const self = this
        m.args.forEach(function (data, i) {
            const pau = self.buildItem(data, i),
                ref = self.collection.length > m.args.length
                    ? self.collection[m.args.length].$pau.el
                    : self.marker
            self.container.insertBefore(pau.el, ref)
        })
        self.updateIndexes()
    },
    shift: function (m) {
        m.result.$destroy()
        const self = this
        self.updateIndexes()
    },
    splice: function (m) {
        var self = this,
            index = m.args[0],
            removed = m.args[1],
            added = m.args.length - 2
        m.result.forEach(function (scope) {
            scope.$destroy()
        })
        if (added > 0) {
            m.args.slice(2).forEach(function (data, i) {
                var pau = self.buildItem(data, index + i),
                    pos = index - removed + added + 1,
                    ref = self.collection[pos]
                        ? self.collection[pos].$pau.el
                        : self.marker
                self.container.insertBefore(pau.el, ref)
            })
        }
        if (removed !== added) {
            self.updateIndexes()
        }
    },
    sort: function () {
        const self = this
        self.collection.forEach(function (scope, i) {
            scope.$index = i
            self.container.insertBefore(scope.$pau.el, self.marker)
        })
    }
}

mutationHandlers.reverse = mutationHandlers.sort

export default {

    bind: function () {
        this.el.removeAttribute(config.prefix + '-each')
        const ctn = this.container = this.el.parentNode
        this.marker = document.createComment('p-each-' + this.arg)
        ctn.insertBefore(this.marker, this.el)
        ctn.removeChild(this.el)
    },

    update: function (collection) {
        this.unbind(true)
        if (!Array.isArray(collection)) return
        this.collection = collection
        const self = this
        collection.on('mutate', function (mutation) {
            mutationHandlers[mutation.method].call(self, mutation)
        })
        collection.forEach(function (data, i) {
            var pau = self.buildItem(data, i)
            self.container.insertBefore(pau.el, self.marker)
        })
    },

    buildItem: function (data, index) {
        const node = this.el.cloneNode(true),
            spore = new Pau(node, {
                each: true,
                eachPrefixRE: new RegExp('^' + this.arg + '.'),
                parentPau: this.pau,
                index,
                data
            })
        this.collection[index] = spore.scope
        return spore
    },

    updateIndexes: function () {
        this.collection.forEach(function (scope, i) {
            scope.$index = i
        })
    },

    unbind: function (rm) {
        if (this.collection && this.collection.length) {
            const fn = rm ? '_destroy' : '_unbind'
            this.collection.forEach(function (scope) {
                scope.$pau[fn]()
            })
            this.collection = null
        }
    }
}
