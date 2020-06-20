const CODES = {
    A: 65,
    Z: 90
}

function createCell(){
    return `
    <div class="cell" contenteditable=""></div>
    `
}
function createCol(col){
    return `
    <div class="column">${col}</div>
    `
}

function createRow(info, content) {
    return `
    <div class="row">
     <div class="row-info">${info}</div>
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

    const cell = new Array(colsCount)
        .fill('')
        .map(createCell) // тоже самое что и map(el => {return createCell(el)})
        .join('')

    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(i+1, cell))
    }
    return rows.join('');
}

