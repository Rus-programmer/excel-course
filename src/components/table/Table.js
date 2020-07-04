import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['mousedown'] //'click', 'mousedown', 'mousemove', 'mouseup'
        });
    }

    toHTML() {
        return createTable(23);
    }

    onClick(event) {
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            resizeHandler(this.$root, event)
        }
    }

    onMousemove(e) {
        // console.log('mousemove', e.pageX)
    }

    onMouseup() {
        // console.log('mouseup')
    }
}

//
// 5720 ms
// 141 msScripting
// 1726 msRendering
// 303 msPainting
// 286 msSystem
// 3265 msIdle
// 5720 msTotal

// 221 msScripting
// 1920 msRendering
// 356 msPainting
// 371 msSystem
// 7972 msIdle

// 179 msScripting
// 514 msRendering
// 364 msPainting
// 526 msSystem
// 6470 msIdle
// 8054 msTotal
