import {$} from "@core/dom";

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
    }

    getRoot(){
        const $root = $.create('div', 'excel')
        this.components = this.components.map(Component => {
            const $ele = $.create('div', Component.className)
            const component = new Component($ele)
            if (component.name) {
                window['c' + component.name] = component
            }
            $ele.html(component.toHTML());
            $root.append($ele);
            return component;
        })
        return $root;
    }

    render() {
        // вариант 1
        // this.$el.insertAdjacentHTML('beforebegin', `<h1>Start progress. I like this course</h1>`)
        // console.log(this.$el)

        // вариант 2
        // const node = document.createElement('h1')
        // node.textContent = 'ohhh '
        this.$el.append(this.getRoot())

        this.components.forEach(component => component.init())
    }
}