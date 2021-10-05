class CenterDot {
    constructor({ app }) {
        {
            let centerDot = new PIXI.Graphics();;
            centerDot.lineStyle(0);
            centerDot.beginFill(0xffffff, 1);
            centerDot.drawCircle(0, 0, 10);
            centerDot.endFill();
            app.stage.addChild(centerDot)
            setDotPos.bind(centerDot)({ x: width / 2, y: height / 2 });

            let line_hori = new Line();
            line_hori.tint = 0xffffff;
            line_hori.thickness = 2;
            line_hori.ax = 0;
            line_hori.ay = 0;
            line_hori.bx = 0;
            line_hori.by = 0;
            app.stage.addChild(line_hori);
            let line_verti = new Line();
            line_verti.tint = 0xffffff;
            line_verti.thickness = 2;
            line_verti.ax = 0;
            line_verti.ay = 0;
            line_verti.bx = 0;
            line_verti.by = 0;
            app.stage.addChild(line_verti);

            function setLinePos() {
                line_hori.ax = centerDot.x;
                line_hori.ay = 0;
                line_hori.bx = centerDot.x;
                line_hori.by = height;
                line_verti.ax = 0;
                line_verti.ay = centerDot.y;
                line_verti.bx = width;
                line_verti.by = centerDot.y;
            }
            setLinePos();

            let startpoint = null;
            let base = null;
            let dotposes = null;
            const onDragStart = function (event) {
                // shape.group.objBtn.emit('mousedown');
                // if (!this.group.active) { return; };
                // console.log(1);
                this.data = event.data; this.dragging = true;
                const newPosition = this.data.getLocalPosition(this.parent);
                startpoint = (newPosition);
                base = { x: 0, y: 0 };
                dotposes = { x: centerDot.x, y: centerDot.y };
                // dotposes = group.dots.map(a => ({ x: a.x, y: a.y }));
            }
            const onDragEnd = function () {
                this.dragging = false; this.data = null;
                startpoint = null;
                base = null;
                // dotposes = null;
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
                    });
                    setLinePos();
                }
            }
            setEvent(centerDot, ['mousedown', 'touchstart'], onDragStart);
            setEvent(centerDot, ['mousemove', 'touchmove'], onDragMove);
            setEvent(centerDot, ['mouseup', 'mouseupoutside', 'touchend', 'touchendoutside'], onDragEnd);

        }

    }
}

export default CenterDot;