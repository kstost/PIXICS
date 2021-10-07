
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
function makeADot(position, global) {
    let { app, group } = global;
    if (!group) return;
    if (!group.shape) {
        let shape = new PIXI.Graphics();;
        shape.redrawPoly = function () {
            const 지역그룹 = shape.group;
            if (지역그룹 && 지역그룹.shape) {
                지역그룹.shape.clear();
                지역그룹.shape.lineStyle(4, Number('0x' + 지역그룹.color));
                지역그룹.shape.beginFill(Number('0x' + 지역그룹.color), 0.5);
                // console.log();
                if (지역그룹.class === 'polygon') {
                    지역그룹.shape.drawPolygon(
                        지역그룹.dots[지역그룹.class].map(a => ([a.x, a.y])).flat(Infinity)
                    );
                }
                if (지역그룹.class === 'circle') {
                    let dotv = 지역그룹.dots[지역그룹.class].map(dot => ({ x: dot.x, y: dot.y }));
                    if (dotv.length === 2) {
                        let radius = ksttool.math.get_distance_between_two_point(dotv[0], dotv[1]);
                        지역그룹.shape.drawCircle(dotv[0].x, dotv[0].y, radius);
                    }
                }
                if (지역그룹.class === 'rect') {
                    let dotv = 지역그룹.dots[지역그룹.class].map(dot => ({ x: dot.x, y: dot.y }));
                    if (dotv.length === 2) {
                        // let radius = ksttool.math.get_distance_between_two_point(dotv[0], dotv[1]);

                        지역그룹.shape.drawRect(dotv[0].x, dotv[0].y, dotv[1].x - dotv[0].x, dotv[1].y - dotv[0].y);
                    }
                }
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
            dotposes = group.dots[group.class].map(a => ({ x: a.x, y: a.y }));
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
                group.dots[group.class].forEach((dot, i) => {
                    dot.onDragMove({
                        x: base.x + dotposes[i].x,
                        y: base.y + dotposes[i].y,
                    }, true)
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
    circlePoint.beginFill(Number('0x' + group.color), 1);
    circlePoint.drawCircle(0, 0, global.dotsize);
    circlePoint.endFill();
    circlePoint.group = group;
    app.stage.addChild(circlePoint);
    group.dots[group.class].push(circlePoint);
    // setFirstInvisible(global, group);
    setDotPos.bind(circlePoint)({ ...position, redraw: true, group, global });
    setEvent(circlePoint, ['mousedown', 'touchstart'], onDragStart);
    setEvent(circlePoint, ['mousemove', 'touchmove'], onDragMove);
    setEvent(circlePoint, ['mouseup', 'mouseupoutside', 'touchend', 'touchendoutside'], onDragEnd);
    function onDragStart(event) {
        circlePoint.group.layer.emit('mousedown');
        if (!this.group.active) { return; }; this.data = event.data; this.dragging = true;
        // setFirstInvisible(global, group)
    }
    function onDragEnd() { this.dragging = false; this.data = null; }
    function onDragMove(pos, force) {
        let ppos = pos && pos.constructor.name !== 'InteractionEvent';
        if (ppos || this.dragging) {
            let idx = group.dots[group.class].indexOf(this);
            if (!force && idx === 0 && (group.class === 'rect' || group.class === 'circle') && group.dots[group.class].length === 2) return;
            const newPosition = ppos ? pos : this.data.getLocalPosition(this.parent);
            0 && console.log(newPosition);
            setDotPos.bind(this)({ ...newPosition, redraw: true, group, global });
            // setFirstInvisible(global, group)
        }
        // setFirstInvisible(global, group)
    }
    circlePoint.onDragMove = onDragMove;
    setFirstInvisible(global, group)
}
let Common = {
    setEvent,
    setDotPos,
    reAlignLayers,
    getActiveObj,
    makeADot,
    setFirstInvisible,
    // redrawPoly, setDotPos, setEvent, makeADot, makeAObj
};
export default Common;