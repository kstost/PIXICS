import Common from './Common.js'
const { makeADot, getActiveObj, reAlignLayers, setDotPos, setEvent } = Common;
import { createLayer } from './CreateLayer.js'
function saveData(global) {
    let rd = global.layerList.map(obj => {
        let { dots, color } = obj.getGroup();
        dots = dots.map(dot => {
            return { x: dot.x, y: dot.y }
        });
        return ({ dots, color })
    });
    localStorage.setItem('working', JSON.stringify(rd));
}
function loadData(global, data) {
    const { group } = global;
    data = JSON.parse(data);
    data.forEach(dt => {
        createLayer(global);
        let obj = getActiveObj(global);
        obj.setColor(dt.color);
        dt.dots.forEach(dot => { makeADot(dot, global); });
        getActiveObj(global).emit('mousedown');
    });
}
export {
    saveData,
    loadData
}