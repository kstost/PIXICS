import CenterDot from './editor/CenterDot.js'
import Common from './editor/Common.js'
import { createMosa } from './editor/Mosa.js'
import { addLayerButton } from './editor/AddLayerButton.js'
import { createTouchArea } from './editor/TouchArea.js'
import { saveData, loadData } from './editor/Data.js'
import { createEditor } from './editor/Editor.js'
import { createToolbar } from './editor/Toolbar.js'
const { makeADot, getActiveObj, reAlignLayers, setDotPos, setEvent } = Common;
const global = {
    term: 30,
    addBtnSize: 20,
    layerList: [],
    dotsize: 10,
    group: null,
}
window.addEventListener('keydown', function (e) {
    if (e.key === 'Delete') {
        let group = getActiveObj(global).getGroup();
        let list = group.dots[group.class];
        let idx = list.indexOf(global.lastChooseOne);
        if (idx > -1) {
            let sp = list.splice(idx, 1)[0];
            sp.parent.removeChild(sp);
            (group && group.shape) && group.shape.redrawPoly();
        }
    }
});
window.addEventListener('load', function () {
    document.body.innerHTML = '';
    document.body.style.margin = '0px';
    global.app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        resolution: window.devicePixelRatio,
        autoDensity: true,
    });
    let { width, height } = global.app.screen;
    document.body.appendChild(global.app.view);
    global.app.stage.sortableChildren = true;
    global.addButton = addLayerButton(global);
    createMosa(global, width, height);
    createTouchArea(global, width, height);

    createToolbar(global);
    global.editor = createEditor(global);
    global.centerdot = new CenterDot({ global, width, height });
    global.editor.getEditor('general').value = JSON.stringify({
        scale: global.term
    }, undefined, 3)

    let source;
    try {
        source = JSON.parse(decodeURIComponent(location.hash.substring(1, Infinity)))
        loadData(global, JSON.stringify(source))
    } catch (e) {
        loadData(global, localStorage.getItem('working'))
    }
    global.editor.active(global);
    // console.log(global.centerdot.getPosition());
    // console.log(global.editor.getEditor('general'))
    // console.log(global.centerdot.getGraphic().x);
    // console.log(global.centerdot.getGraphic().y);

});