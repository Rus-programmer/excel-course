class Dom {
    constructor(selector) {
        // this.$$listeners = {} вариант 1
        // console.log(typeof selector === 'string')
        // console.log(selector)
        this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector
    }

    html(html) {
        if (typeof html === "string") {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    text(text) {
        if (typeof text === 'string') {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.trim().toLowerCase()==='input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
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

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    get data() {
        return this.$el.dataset
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    css(styles = {}) {
        // for (const key in styles) { // первый вариант при помощи forin. Минус тот что он бегает по прототипам объектов и поэтому нужно делать проверку if
        //     if (styles.hasOwnProperty(key)) { // hasOwnProperty устаревший метод
        //         console.log(key, styles[key])
        //     }
        // }
        Object.keys(styles).forEach(key => {
            // console.log(styles[key], 'ffffffffffffffffffff')
            // console.log(this.$el.style[key], 'ddddddddddddddddddd')
            this.$el.style[key] = styles[key]
        })
    }

    id(parse) {
        if (parse){
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    focus() {
        this.$el.focus()
        return this
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