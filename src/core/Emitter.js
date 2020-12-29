export class Emitter {
    constructor() {
        this.listeners = {}
    }
    // dispatch, fire, trigger
    // уведомляем слушателей если они есть
    // table.emit('table:select', {a: 1})
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }

    // on, listen
    // Подписываемся на уведомления
    // Добавляем нового слушателя
    // formula.subscribe('table:select', () => {})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)

        return () => {
            this,this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}
// Example
/*
const emitter = new Emitter()

const unsub = emitter.subscribe('hello', data => console.log('Sub', data))
emitter.emit('hello', 42)

setTimeout(() => {
    emitter.emit('hello', 'After 2 seconds')
}, 2000)

setTimeout(() => {
    unsub()
}, 3000)

setTimeout(() => {
    emitter.emit('hello', 'After 4 seconds')
}, 4000)*/
