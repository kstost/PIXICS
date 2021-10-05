import { Rectangle, Line } from './PixiExtend.js'
import Common from './Common.js'
const { makeADot, getActiveObj, reAlignLayers, setDotPos, setEvent } = Common;
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
        makeADot(e.data.getLocalPosition(this.parent), global);
    });
}
export {
    createTouchArea
}