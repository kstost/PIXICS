import { saveData } from './Data.js'
import Common from './Common.js'
const { reAlignLayers, setEvent, setFirstInvisible } = Common;
function createLayer(global) {
    let { app } = global;
    let 새롭게만든그룹 = {
        dots: {
            polygon: [],
            circle: [],
            rect: []
        },
        shape: null,
        color: 'ffffff',
        friction: 0,
        density: 0,
        restitution: 0,
        class: 'polygon'
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
        Object.keys(지역그룹.dots).forEach(type => {
            지역그룹.dots[type].forEach(dot => dot.parent.removeChild(dot));
            지역그룹.dots[type].splice(0, Infinity);
        });
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
        global.editor.active(global);
        global.layerList[0]?.setFocus();
    }
    레이어.setColor = function (color) {
        새롭게만든그룹.color = color;
        color = Number('0x' + color);
        레이어.clear();
        레이어.beginFill(color, 1);
        레이어.drawCircle(0, 0, global.addBtnSize);
        레이어.endFill();
        새롭게만든그룹.dots[새롭게만든그룹.class].forEach(dot => {
            dot.clear();
            dot.beginFill(color, 1);
            dot.drawCircle(0, 0, global.dotsize);
            dot.endFill();
        });
        const { group } = global;
        (group && group.shape) && group.shape.redrawPoly(); // 중ㅇ
    }
    레이어.setJSON = function (data) {
        Object.keys(data).forEach(key => {
            if (!['dots', 'shape', 'layer'].includes(key)) {
                새롭게만든그룹[key] = data[key];
            }
        });
        let json = JSON.stringify(레이어.getJSON(), undefined, 3);
        global.editor.getEditor('layer').value = json;

        Object.keys(새롭게만든그룹.dots).forEach(type => {
            새롭게만든그룹.dots[type].forEach(dot => {
                dot.interactive = false;
                dot.alpha = 0;
            });
        });
        새롭게만든그룹.dots[새롭게만든그룹.class].forEach(dot => {
            dot.interactive = true;
            dot.alpha = 1;
        });
        레이어.setColor(data.color);
        setFirstInvisible(global, global.group);

    };
    레이어.getGroup = function () { return 새롭게만든그룹; }
    레이어.loseFocus = function () {
        레이어.alpha = 0.5;
    };
    레이어.setFocus = function () {
        global.layerList.forEach(obj => {
            obj.loseFocus();
            let 지역그룹 = obj.getGroup();
            지역그룹.active = false;
            지역그룹.shape && (지역그룹.shape.alpha = 0.5);
            지역그룹.dots[지역그룹.class].forEach(dot => dot.alpha = 0);
        });
        레이어.alpha = 1;
        global.group = 새롭게만든그룹; // 중ㅇ
        새롭게만든그룹.active = true;
        새롭게만든그룹.shape && (새롭게만든그룹.shape.alpha = 1);
        새롭게만든그룹.dots[새롭게만든그룹.class].forEach(dot => dot.alpha = 1);
        레이어.setJSON(레이어.getJSON())
        global.editor.turn('layer');
        // console.log(레이어.getJSON().class);
        global.editor.selectShape(레이어.getJSON().class);
        // setFirstInvisible(global, global.group);

    };
    레이어.getJSON = function () {
        let nd = { ...새롭게만든그룹 };
        let ignores = ['dots', 'shape', 'layer', 'active'];
        ignores.forEach(key => delete nd[key]);
        return nd;
    }
    setEvent(레이어, ['mousedown', 'touchstart'], function (e) {
        레이어.setFocus();
    });
    레이어.emit('mousedown');
    reAlignLayers(global.layerList, global);
    레이어.setJSON(새롭게만든그룹);
    global.editor.active(global);
    saveData(global);

}
export {
    createLayer
};