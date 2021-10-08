import { Rectangle, Line } from './PixiExtend.js'
import Common from './Common.js'
import { saveData, loadData } from './Data.js'
const { makeADot, getActiveObj, reAlignLayers, setDotPos, setEvent } = Common;
class CenterDot {
    getGraphic() {
        return this.graphic;
    }
    getPosition() {
        let gr = this.getGraphic();
        return { x: gr.x, y: gr.y }
    }
    setPosition({ x, y }) {
        let gr = this.getGraphic();
        gr.x = x;
        gr.y = y;
        this.setLinePos()
    }
    setLinePos() {
        let line_verti = this.line_verti
        let line_hori = this.line_hori
        // this.line_hori = line_hori;
        let centerDot = this.getGraphic()
        let width = this.width;
        let height = this.height;
        line_hori.ax = centerDot.x;
        line_hori.ay = 0;
        line_hori.bx = centerDot.x;
        line_hori.by = height;
        line_verti.ax = 0;
        line_verti.ay = centerDot.y;
        line_verti.bx = width;
        line_verti.by = centerDot.y;
    }
    constructor({ global, width, height }) {
        let pointer = this;
        let { app, group } = global;
        this.width = width;
        this.height = height;
        let centerDot = new PIXI.Graphics();
        centerDot.zIndex = 1;
        this.graphic = centerDot;
        centerDot.lineStyle(0);
        centerDot.alpha=0.5
        centerDot.beginFill(0xffffff, 1);
        centerDot.drawRect(-10, -10, 20,20);
        centerDot.endFill();
        app.stage.addChild(centerDot)
        setDotPos.bind(centerDot)({ x: width / 2, y: height / 2, group, global });

        let line_hori = new Line();
        line_hori.tint = 0xffffff;
        line_hori.thickness = 1;
        line_hori.ax = 0;
        line_hori.ay = 0;
        line_hori.bx = 0;
        line_hori.by = 0;
        app.stage.addChild(line_hori);
        let line_verti = new Line();
        line_verti.tint = 0xffffff;
        line_verti.thickness = 1;
        line_verti.ax = 0;
        line_verti.ay = 0;
        line_verti.bx = 0;
        line_verti.by = 0;
        app.stage.addChild(line_verti);
        this.line_verti = line_verti;
        this.line_hori = line_hori;
        this.setLinePos();

        let startpoint = null;
        let base = null;
        let dotposes = null;
        const onDragStart = function (event) {
            this.data = event.data; this.dragging = true;
            const newPosition = this.data.getLocalPosition(this.parent);
            startpoint = (newPosition);
            base = { x: 0, y: 0 };
            dotposes = { x: centerDot.x, y: centerDot.y };
        }
        const onDragEnd = function () {
            this.dragging = false; this.data = null;
            startpoint = null;
            base = null;
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
                setDotPos.bind(centerDot)({
                    x: base.x + dotposes.x,
                    y: base.y + dotposes.y,
                    group, global
                });
                pointer.setLinePos();
            }
        }
        setEvent(centerDot, ['mousedown', 'touchstart'], onDragStart);
        setEvent(centerDot, ['mousemove', 'touchmove'], onDragMove);
        setEvent(centerDot, ['mouseup', 'mouseupoutside', 'touchend', 'touchendoutside'], onDragEnd);
    }
}

export default CenterDot;