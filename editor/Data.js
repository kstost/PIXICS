import Common from './Common.js'
const { makeADot, getActiveObj, reAlignLayers, setDotPos, setEvent } = Common;
import { createLayer } from './CreateLayer.js'
function saveData(global) {
    let rd = global.layerList.map(obj => {
        let group = obj.getGroup();
        let types = Object.keys(group.dots);
        let noo = {};
        types.forEach(type => {
            let dt = group.dots[type].map(dot => {
                return { x: dot.x, y: dot.y }
            });
            noo[type] = dt;
        })
        let dots = noo;
        return ({ dots, ...obj.getJSON() })
    });
    // console.log(JSON.parse(global.editor.getEditor('general').value))
    rd = {
        layers: rd,
        pivotpoint: global.centerdot.getPosition(),
        ...JSON.parse(global.editor.getEditor('general').value)
    };
    // console.log(rd);
    rd = JSON.stringify(rd);
    localStorage.setItem('working', rd);
    history.replaceState(null, null, location.pathname + '#' + encodeURIComponent(rd));
    console.log(rd);
    return rd;
}
function loadData(global, data) {
    const { group } = global;
    data = JSON.parse(data);
    if (!data) return;
    // console.log(data);
    {
        let cp = { ...data };
        delete cp.layers;
        delete cp.pivotpoint;
        global.editor.getEditor('general').value = JSON.stringify(cp, undefined, 3)
        // console.log(cp);
    }
    global.centerdot.setPosition(data.pivotpoint);
    data.layers.forEach(dt => {
        createLayer(global);
        let obj = getActiveObj(global);
        obj.setJSON(dt);
        ['polygon', 'rect', 'circle'].forEach(type => {
            obj.getGroup().class = type;
            dt.dots[type].forEach(dot => makeADot(dot, global));
        })
        global.editor.selectShape(dt.class);

    });
    global.editor.turn('layer');
    saveData(global);

}
export {
    saveData,
    loadData
}