class Dom {
    constructor(selector) {
        // this.$$listeners = {} вариант 1
        this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector
    }

    html(html) {
        if (typeof html === "string") {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    clear() {
        this.toHTML('')
        return this
    }
    //node = Element
    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }

    on(eventType, callback) {
        // this.$$listeners[eventType]=callback вариант 1
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        // this.$el.removeEventListener(eventType, this.$$listeners[eventType]) вариант 1
        this.$el.removeEventListener(eventType, callback)
    }
}

export function $(selector) {
return new Dom(selector);
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}