import {ExcelComponent} from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
    // корневой .класс для блока
    // для поддержки такой записи уст. пакет @babel/plugin-proposal-class-properties
    static className = 'excel__formula'

    constructor($root) {
        super($root, {
            name: 'Formula',
            // массив слушателей событий
            listeners: ['input', 'click']
        });
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }
    // реализация события с префиксом on
    onInput(event) {
        console.log(this.$root)
        console.log('Formula onInput', event.target.textContent.trim())
    }

    onClick() {
        console.log()
    }
}