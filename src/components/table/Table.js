import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";

export class Table extends ExcelComponent {
    // корневой .класс для блока
    // для поддержки такой записи уст. пакет @babel/plugin-proposal-class-properties
    static className = 'excel__table'

    toHTML() {
        return createTable(20)
    }
}