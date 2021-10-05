import Common from './Common.js'
import { createLayer } from './CreateLayer.js'
const { reAlignLayers, setEvent } = Common;

function addLayerButton(global) {
    let { app } = global;
    let iconSize = global.addBtnSize;
    let button = new PIXI.Graphics();
    button.zIndex = 1;
    button.interactive = true;
    button.lineStyle(0);
    button.alpha = 0.5;
    button.beginFill(0x00FFFF, 1);
    button.drawCircle(0, 0, iconSize);
    button.endFill();
    button.x = iconSize;
    button.y = iconSize;
    app.stage.addChild(button);
    setEvent(button, ['mousedown', 'touchstart'], function () {
        createLayer(global);
    });
    return button;
}
export {
    addLayerButton
}