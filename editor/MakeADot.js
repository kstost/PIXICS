import Common from './Common.js'
import { saveData, loadData } from './Data.js'
const { setFirstInvisible, getActiveObj, reAlignLayers, setDotPos, setEvent } = Common;

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
            saveData(global);
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
    function onDragEnd() { this.dragging = false; this.data = null; saveData(global); }
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
    saveData(global);
}

// let Common = {
//     setEvent,
//     setDotPos,
//     reAlignLayers,
//     getActiveObj,
//     // makeADot,
//     setFirstInvisible,
//     // redrawPoly, setDotPos, setEvent, makeADot, makeAObj
// };
export { makeADot };