import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {TableSelection} from "@/components/table/TableSelection";
import {isCell, matrix, nextSelector} from "@/components/table/table.functons";
import {$} from "@core/dom";

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'], //'click', 'mousedown', 'mousemove', 'mouseup'
            ...options
        });
        this.unsubs = []
    }

    toHTML() {
        return createTable(23);
    }

    onClick(event) {
    }

    init() {
        super.init();
        this.selection = new TableSelection()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)

        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })
        this.$on('formula:keydown', () => {
            this.selection.current.focus()
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }

    onMousedown(event) {
        if (event.target.dataset.resize) { //либо проверка shouldResize export from table.functions.js
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
            }
        }
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

        const {key} = event

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const {row, col} = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, {row, col}))
            this.selectCell($next)
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }

    onMousemove(e) {
        // console.log('mousemove', e.pageX)
    }

    onMouseup() {
        // console.log('mouseup')
    }

    destroy() {
        super.destroy();
        this.unsubs.forEach(unsub => unsub())
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
