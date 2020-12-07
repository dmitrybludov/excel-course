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

    // element
    append(node) {
        if (node instanceof Dom) {node = node.$el}

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
           this.$el.appendChild(node)
        }
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