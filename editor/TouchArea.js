import { Rectangle, Line } from './PixiExtend.js'
import Common from './Common.js'
import { makeADot } from './MakeADot.js'
const { getActiveObj, reAlignLayers, setDotPos, setEvent } = Common;
function createTouchArea(global, width, height) {
    let rect = new Rectangle();
    rect.width = width;
    rect.height = height;
    rect.alpha = 0;
    global.app.stage.addChild(rect);
    rect.interactive = true;
    setEvent(rect, ['mousedown', 'touchstart'], function (e) {
        const { group } = global;
        if (!group) { global.addButton.emit('mousedown') }
        // console.log(group);
        if (group) {
            if (group.class === 'circle' && group.dots[group.class].length >= 2) return;
            if (group.class === 'rect' && group.dots[group.class].length >= 2) return;
        }
        // console.log(123);
        makeADot(e.data.getLocalPosition(this.parent), global);
    });
}
export {
    createTouchArea
}
