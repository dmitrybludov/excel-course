import {$} from "@core/dom";
import {Emitter} from "@core/Emitter";

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
        this.emitter = new Emitter()
    }

    // Возвращает корневую ноду
    getRoot() {
        // с помощью конструктора создаем новый элемент
        const $root = $.create('div', 'excel')

        const componentOptions = {
            emitter: this.emitter
        }

        this.components = this.components.map(Component => {
            // с помощью конструктора создаем новый элемент
            const $el = $.create('div', Component.className)
            // передаем эл. в компонент
            const component = new Component($el, componentOptions)
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

    destroy() {
        this.components.forEach(component => component.destroy())
    }
}