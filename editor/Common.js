
function setEvent(thing, names, fn) {
    thing.interactive = true;
    [names].flat(Infinity).forEach(name => thing.on(name, fn));
}
function setDotPos({ x, y, redraw, group, global }) {
    let term = global.term;
    let view = this;
    let newPosition = { x, y };
    let xx = (newPosition.x % term);
    let yy = (newPosition.y % term);
    let xs = (term * 0.5 < xx);
    let ys = (term * 0.5 < yy);
    let bf = JSON.stringify([view.position.x, view.position.y]);
    view.position.x = newPosition.x - (newPosition.x % term);
    view.position.y = newPosition.y - (newPosition.y % term);
    view.position.x += (xs ? term : 0);
    view.position.y += (ys ? term : 0);
    (redraw && group && group.shape) && group.shape.redrawPoly();
    let af = JSON.stringify([view.position.x, view.position.y]);
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

function makeADot(position, global) {
    let { app, group } = global;
    if (!group) return;
    if (!group.shape) {
        let shape = new PIXI.Graphics();;
        shape.redrawPoly = function () {
            const 지역그룹 = shape.group;
            if (지역그룹 && 지역그룹.shape) {
                지역그룹.shape.clear();
                지역그룹.shape.beginFill(지역그룹.color, 0.5);
                지역그룹.shape.drawPolygon(
                    지역그룹.dots.map(a => ([a.x, a.y])).flat(Infinity)
                );
                지역그룹.shape.endFill();
            }
        }
        group.shape = shape;
        group.shape.group = group;
        group.shape.interactive = true;
        app.stage.addChild(group.shape);
        let startpoint = null;
        let base = null;
        let dotposes = null;
        const onDragStart = function (event) {
            shape.group.layer.emit('mousedown');
            if (!this.group.active) { return; };
            this.data = event.data; this.dragging = true;
            const newPosition = this.data.getLocalPosition(this.parent);
            startpoint = (newPosition);
            base = { x: 0, y: 0 };
            dotposes = group.dots.map(a => ({ x: a.x, y: a.y }));
        }
        const onDragEnd = function () {
            this.dragging = false; this.data = null;
            startpoint = null;
            base = null;
            dotposes = null;
        }
        const onDragMove = function (e) {
            if (this.dragging) {
                const newPosition = this.data.getLocalPosition(this.parent);
                let cha = {
                    x: (newPosition.x - startpoint.x),
                    y: (newPosition.y - startpoint.y),
                };
                base.x += cha.x;
                base.y += cha.y;
                startpoint = (newPosition);
                group.dots.forEach((dot, i) => {
                    dot.onDragMove({
                        x: base.x + dotposes[i].x,
                        y: base.y + dotposes[i].y,
                    })
                })
            }
        }
        setEvent(group.shape, ['mousedown', 'touchstart'], onDragStart);
        setEvent(group.shape, ['mousemove', 'touchmove'], onDragMove);
        setEvent(group.shape, ['mouseup', 'mouseupoutside', 'touchend', 'touchendoutside'], onDragEnd);
    }
    let circlePoint = new PIXI.Graphics();
    circlePoint.interactive = true;
    circlePoint.lineStyle(0);
    circlePoint.beginFill(group.color, 0.5);
    circlePoint.drawCircle(0, 0, global.dotsize);
    circlePoint.endFill();
    circlePoint.group = group;
    app.stage.addChild(circlePoint);
    group.dots.push(circlePoint);
    setDotPos.bind(circlePoint)({ ...position, redraw: true, group, global });
    setEvent(circlePoint, ['mousedown', 'touchstart'], onDragStart);
    setEvent(circlePoint, ['mousemove', 'touchmove'], onDragMove);
    setEvent(circlePoint, ['mouseup', 'mouseupoutside', 'touchend', 'touchendoutside'], onDragEnd);
    function onDragStart(event) {
        circlePoint.group.layer.emit('mousedown');
        if (!this.group.active) { return; }; this.data = event.data; this.dragging = true;
    }
    function onDragEnd() { this.dragging = false; this.data = null; }
    function onDragMove(pos) {
        let ppos = pos && pos.constructor.name !== 'InteractionEvent';
        if (ppos || this.dragging) {
            const newPosition = ppos ? pos : this.data.getLocalPosition(this.parent);
            setDotPos.bind(this)({ ...newPosition, redraw: true, group, global });
        }
    }
    circlePoint.onDragMove = onDragMove;
}
let Common = {
    setEvent,
    setDotPos,
    reAlignLayers,
    getActiveObj,
    makeADot,
    // redrawPoly, setDotPos, setEvent, makeADot, makeAObj
};
export default Common;