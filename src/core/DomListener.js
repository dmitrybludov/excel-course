import {capitalize} from "@core/utils";

export class DomListener {
    // в конструктор передаем массив слушателей
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener!`)
        }

        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        //console.log(this.listeners)
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                const name = this.name || ''
                throw new Error(`Method ${method} is not implemented in ${name} Component`)
            }
            this[method] = this[method].bind(this)
            // тоже самое что и addEventListener
            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}