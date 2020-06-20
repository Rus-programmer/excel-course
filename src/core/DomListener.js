import {capitalize} from "@core/utils";

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root){
            throw new Error('No $root provided for DomListener')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        // console.log(this.listeners, this.$root)
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]){
                throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component`)
            }
            // вариант 2 сохранения баинда, так как баинд создает новую функцию и она получается всегда разная
            // вариант 1
            this[method] = this[method].bind(this)
            // this.$root.on(listener, this[method].bind(this)) вариант 1
            this.$root.on(listener, this[method])
        })
    }
    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]){
                throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component`)
            }
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}