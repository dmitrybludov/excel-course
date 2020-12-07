import {$} from "@core/dom";

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
    }

    // Возвращает корневую ноду
    getRoot() {
        // с помощью конструктора создаем новый элемент
        const $root = $.create('div', 'excel')

        this.components = this.components.map(Component => {
            // с помощью конструктора создаем новый элемент
            const $el = $.create('div', Component.className)
            // передаем эл. в компонент
            const component = new Component($el)
            // DEBUG
            if (component.name) {
                window['c' + component.name] = component
            }
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        return $root
    }

    render() {
        this.$el.append(this.getRoot())
        // берем массив компонентов и для каждого компонента вызываем метод init
        this.components.forEach(component => component.init())
    }
}