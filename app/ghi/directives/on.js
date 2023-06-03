var matches = 'atchesSelector',
    prefixes = ['m', 'webkitM', 'mozM', 'msM']

prefixes.some(function (prefix) {
    const match = prefix + matches
    if (document.body[match]) {
        matches = match
        return true
    }
})

function delegateCheck(current, top, selector) {
    if (current.webkitMatchesSelector(selector)) {
        return current
    } else if (current === top) {
        return false
    } else {
        return delegateCheck(current.parentNode, top, selector)
    }
}

export default {

    fn: true,

    bind: function () {
        if (this.ghi.each) {
            this.selector = '[' + this.directiveName + '*="' + this.expression + '"]'
            this.delegator = this.ghi.el.parentNode
        }
    },

    update: function (handler) {
        this.unbind()
        if (!handler) return
        const self = this,
            event = this.arg,
            selector = this.selector,
            delegator = this.delegator
        if (delegator) {

            // for each blocks, delegate for better performance
            if (!delegator[selector]) {
                delegator[selector] = function (e) {
                    const target = delegateCheck(e.target, delegator, selector)
                    if (target) {
                        handler.call(self.ghi.scope, {
                            originalEvent: e,
                            el: target,
                            scope: target.ghi.scope
                        })
                    }
                }
                delegator.addEventListener(event, delegator[selector])
            }

        } else {

            // a normal handler
            this.handler = function (e) {
                handler.call(self.ghi.scope, {
                    originalEvent: e,
                    el: e.currentTarget,
                    scope: self.ghi.scope
                })
            }
            this.el.addEventListener(event, this.handler)

        }
    },

    unbind: function () {
        const event = this.arg,
            selector = this.selector,
            delegator = this.delegator
        if (delegator && delegator[selector]) {
            delegator.removeEventListener(event, delegator[selector])
            delete delegator[selector]
        } else if (this.handler) {
            this.el.removeEventListener(event, this.handler)
        }
    }
}
