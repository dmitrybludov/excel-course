import {ExcelComponent} from "@core/ExcelComponent";

export class Toolbar extends ExcelComponent {
    // корневой .класс для блока
    // для поддержки такой записи уст. пакет @babel/plugin-proposal-class-properties
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: [],
            ...options
        });
    }

    toHTML() {
        return `
            <div class="button">
                        <span class="material-icons">
                            format_align_left
                        </span>
            </div>

            <div class="button">
                        <span class="material-icons">
                            format_align_center
                        </span>
            </div>

            <div class="button">
                        <span class="material-icons">
                            format_align_right
                        </span>
            </div>

            <div class="button">
                        <span class="material-icons">
                            format_bold
                        </span>
            </div>

            <div class="button">
                        <span class="material-icons">
                            format_italic
                        </span>
            </div>

            <div class="button">
                        <span class="material-icons">
                            format_underlined
                        </span>
            </div>
        `
    }
}