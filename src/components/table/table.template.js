const CODES = {
    A: 65,
    Z: 90
}

// function createCell(row, col) {//вариант 1
//     return `
//     <div class="cell" contenteditable="" data-col="${col}" data-row="${row}"></div>
//     `
// }
function createCell(row) {
    return function(_, col) {
    return `<div class="cell" contenteditable="" data-col="${col}" data-id="${row}:${col}" data-type="cell"></div>`
    }
}

function createCol(col, index) {
    return `
    <div class="column" data-type="resizable" data-col="${index}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(info, content) {
    const resize = info ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
    <div class="row" data-type="resizable">
     <div class="row-info">
        ${info}
        ${resize}
     </div>
     <div class="row-data">${content}</div>
    </div>
    `
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map((_, index) => { // тоже самое что и map((el, index) => {return String.fromCharCode(CODES.A + index)})
            return String.fromCharCode(CODES.A + index)
        })
        .map(createCol) // тоже самое что и map(el => {return createCol(el)})
        .join('')

    rows.push(createRow('', cols))

    for (let i = 0; i < rowsCount; i++) {
        const cell = new Array(colsCount)
            .fill('')
            // .map((_, col)=>createCell(i, col)) //вариант 1
            .map(createCell(i))
            .join('')

        rows.push(createRow(i + 1, cell))
    }
    return rows.join('');
}

