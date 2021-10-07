class Rectangle extends PIXI.Sprite {
    constructor() {
        //PIXI.Texture.WHITE
        const texture = PIXI.Texture.from('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=');
        super(texture);
    }
}
class Line extends Rectangle {
    spec = {}
    constructor() {
        super();
        this.anchor.y = 0.5;
        this.axis = 0.5;
        this.thickness = 1;
    }
    set thickness(v) { this.height = v; }
    get thickness() { return this.height; }
    set axis(v) { this.anchor.x = v; }
    get axis() { return this.anchor.x; }
    set ax(v) { this.spec.ax = v; this.calcpos(); }
    get ax() { return this.spec.ax ?? 0; }
    set ay(v) { this.spec.ay = v; this.calcpos(); }
    get ay() { return this.spec.ay ?? 0; }
    set bx(v) { this.spec.bx = v; this.calcpos(); }
    get bx() { return this.spec.bx ?? 0; }
    set by(v) { this.spec.by = v; this.calcpos(); }
    get by() { return this.spec.by ?? 0; }
    get length() {
        let a = this.ax - this.bx;
        let b = this.ay - this.by;
        return Math.sqrt(a * a + b * b);
    }
    calcpos() {
        this.width = this.length;
        this.x = this.bx - ((this.bx - this.ax) * (1 - this.anchor.x));
        this.y = this.by - ((this.by - this.ay) * (1 - this.anchor.x));
        this.rotation = Math.atan2(this.by - this.ay, this.bx - this.ax);
    }
}

export {
    Rectangle, Line
}
