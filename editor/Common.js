function setEvent(thing, names, fn) {
    thing.interactive = true;
    [names].flat(Infinity).forEach(name => thing.on(name, fn));
}
function setDotPos({ x, y, redraw, group, global }) {
    let idx = group && group.dots[group.class].indexOf(this);
    let term = global.term;
    let view = this;
    let newPosition = { x, y };
    let xx = (newPosition.x % term);
    let yy = (newPosition.y % term);
    let xs = (term * 0.5 < xx);
    let ys = (term * 0.5 < yy);
    let bf = JSON.stringify([view.position.x, view.position.y]);

    let candi_x = (newPosition.x - (newPosition.x % term)) + (xs ? term : 0);
    let candi_y = (newPosition.y - (newPosition.y % term)) + (ys ? term : 0);
    // console.log(idx);
    let change = true;
    if (idx !== null && group.class === 'rect') {

        let dotposes = group.dots[group.class].map(a => ({ x: a.x, y: a.y }));
        if (idx === 1 && !((dotposes[0].x - candi_x < 0 && dotposes[0].y - candi_y < 0))) {
            change = false;
        }
        // if (idx === 0 && group.dots[group.class].length===2 && !((dotposes[0].x - candi_x > 0 && dotposes[0].y - candi_y > 0))) {
        //     change = false;
        // }
        // group.dots[group.class][0]
    }
    if (change) {
        view.position.x = candi_x;
        view.position.y = candi_y;
    }
    // view.position.x += (xs ? term : 0);
    // view.position.y += (ys ? term : 0);
    // console.log('red');
    (redraw && group && group.shape) && group.shape.redrawPoly();
    let af = JSON.stringify([view.position.x, view.position.y]);
    // setFirstInvisible(global, group)
    return bf === af;
}
function reAlignLayers(layerList, global) {
    layerList.forEach((objBtn, i) => {
        objBtn.x = (global.addBtnSize * 3) + (i * (20 * 2));
    })
}
function getActiveObj(global) {
    return global.layerList.filter(obj => obj.getGroup().active)[0];
}
function setFirstInvisible(global, group) {
    if (!group) return;
    if (group.class === 'circle' || group.class === 'rect') {
        if (group.dots[group.class].length === 2) {
            group.dots[group.class][0].interactive = false;
            group.dots[group.class][0].alpha = 0;
            // console.log(group.dots[group.class][0]);
        }
    }
}

let Common = {
    setEvent,
    setDotPos,
    reAlignLayers,
    getActiveObj,
    setFirstInvisible,
};
export default Common;