class Dom {
    constructor(selector) {
        // #app - селектор строка
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
    }

    html(html) {
        // setter если передана строчка
        if (typeof html === "string") {
            this.$el.innerHTML = html
            return this
        }
        // getter
        return this.$el.outerHTML.trim()
    }

    text(text) {
        if (typeof text === 'string') {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLocaleLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }

    // очистка HTML
    clear() {
        this.html('')
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    append(node) {
        if (node instanceof Dom) {node = node.$el}

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
           this.$el.appendChild(node)
        }
        return this
    }

    get data() {
        return this.$el.dataset
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => {
            this.$el.style[key] = styles[key]
        })
    }

    id(parse) {
        if (parse) {
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

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }
}

// по аналогу с jQuery
// event.target
export function $(selector) {
    return new Dom(selector)
}

// статический метод принимает название тэга и классы
$.create = (tagName, classes = '') => {
    // создаем нужный элемент по tagName
    const el = document.createElement(tagName)
    // если есть классы - добавляем их
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}