import {$} from "@core/dom";

export function resizeHandler($root, event) {
    const $resizer = $(event.target)
    // const $parent = $resizer.$el.parentNode // плохой способ привязки к родителю
    // const $parent = $resizer.$el.closest('.column') // лучше но тоже плохой
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const sideProp = $resizer.data.resize === 'col' ? 'bottom' : 'right'
    let value

    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
    $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px'
    })


    document.onmousemove = ev => {
        if ($resizer.data.resize === 'col') { //$resizer.$el.dataset.resize
            // const delta = ev.pageX - coords.right
            // $parent.css({width: (coords.width + delta) + 'px'})
            // cells.forEach(el => el.style.width = (coords.width + delta) + 'px')
            const delta = ev.pageX - coords.right
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