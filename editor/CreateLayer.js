import Common from './Common.js'
const { reAlignLayers, setEvent } = Common;

function createLayer(global) {
    let { app, editor } = global;
    let 새롭게만든그룹 = {
        dots: [],
        shape: null,
        color: 0xFFFFFF,
    }
    let 레이어 = new PIXI.Graphics();
    새롭게만든그룹.layer = 레이어;
    레이어.interactive = true;
    레이어.lineStyle(0);
    레이어.alpha = 0.5;
    레이어.x = 0;
    레이어.y = global.addBtnSize;
    app.stage.addChild(레이어);
    global.layerList.push(레이어);
    레이어.interactive = true;
    레이어.cleaner = function () {
        let 지역그룹 = 레이어.getGroup();
        지역그룹.dots.forEach(dot => dot.parent.removeChild(dot));
        지역그룹.dots.splice(0, Infinity);
        if (지역그룹.shape) {
            지역그룹.shape.parent.removeChild(지역그룹.shape);
            지역그룹.shape = null;
        }
    }
    레이어.getIdxNumber = function (getEle) {
        for (let i = 0; i < global.layerList.length; i++) {
            if (global.layerList[i] === 레이어) {
                return getEle ? 레이어 : i;
            }
        }
    }
    레이어.remove = function () {
        global.layerList.splice(레이어.getIdxNumber(), 1);
        레이어.parent.removeChild(레이어);
        if (!global.layerList.length) {
            global.group = null; // 중ㅇ
        }
        reAlignLayers(global.layerList, global);
        global.layerList[0]?.setFocus();
    }
    레이어.setColor = function (color) {
        새롭게만든그룹.color = color;
        레이어.clear();
        레이어.beginFill(color, 1);
        레이어.drawCircle(0, 0, global.addBtnSize);
        레이어.endFill();
        새롭게만든그룹.dots.forEach(dot => {
            dot.clear();
            dot.beginFill(color, 0.5);
            dot.drawCircle(0, 0, global.dotsize);
            dot.endFill();
        });
        const { group } = global;
        (group && group.shape) && group.shape.redrawPoly(); // 중ㅇ
    }
    레이어.setColor(새롭게만든그룹.color);
    레이어.getGroup = function () { return 새롭게만든그룹; }
    레이어.loseFocus = function () {
        레이어.alpha = 0.5;
    };
    레이어.setFocus = function () {
        global.layerList.forEach(obj => {
            obj.loseFocus();
            let 지역그룹 = obj.getGroup();
            지역그룹.active = false;
            지역그룹.shape && (지역그룹.shape.alpha = 0.3);
            지역그룹.dots.forEach(dot => dot.alpha = 0.3);
        });
        레이어.alpha = 1;
        global.group = 새롭게만든그룹; // 중ㅇ
        새롭게만든그룹.active = true;
        새롭게만든그룹.shape && (새롭게만든그룹.shape.alpha = 1);
        새롭게만든그룹.dots.forEach(dot => dot.alpha = 1);
        editor.value = JSON.stringify({
            color: `0x${새롭게만든그룹.color.toString(16)}`
        }, undefined, 3);
    };
    setEvent(레이어, ['mousedown', 'touchstart'], function (e) {
        레이어.setFocus();
    });
    레이어.emit('mousedown');
    reAlignLayers(global.layerList, global);
}
export {
    createLayer
};