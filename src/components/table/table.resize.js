import {$} from "@core/dom";

export function resizeHandler($root, event) {
    const $resizer = $(event.target)
    // console.log($(event.target));
    // console.log(event.target);
    // const $parent = $resizer.$el.parentNode // плохой способ привязки к родителю
    // const $parent = $resizer.$el.closest('.column') // лучше но тоже плохой
    const $parent = $resizer.closest('[data-type="resizable"]') // находим родителя с [data-type="resizable"] квадратные скобки используются для перебора всевозможных вариантов
    const coords = $parent.getCoords() //получаем координаты
    const sideProp = $resizer.data.resize === 'col' ? 'bottom' : 'right' //получаем либо колонку либо строку
    let value

    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`) //находим все ячейки с [data-col="5"] к примеру
    $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px'
    })


    document.onmousemove = ev => {
        if ($resizer.data.resize === 'col') { //$resizer.$el.dataset.resize
            // const delta = ev.pageX - coords.right
            // $parent.css({width: (coords.width + delta) + 'px'})
            // cells.forEach(el => el.style.width = (coords.width + delta) + 'px')
            // console.log(ev.pageX); координаты ползунка
            // console.log(coords.right); координаты ресайзера которого мы хотим растянуть/сузить
            const delta = ev.pageX - coords.right
            // console.log(delta);
            value = coords.width + delta
            $resizer.css({right: -delta + 'px'})
        } else {
            const delta = ev.pageY - coords.bottom
            value = coords.height + delta
            $resizer.css({bottom: -delta + 'px'})
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        if ($resizer.data.resize === 'col'){
            $parent.css({width: value + 'px'})
            cells.forEach(el => el.style.width = value + 'px')
        } else {
            $parent.css({height: value + 'px'})
        }

        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        })
    }
}