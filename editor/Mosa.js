import { Rectangle, Line } from './PixiExtend.js'
function createMosa(global, width, height) {
    let { app } = global;
    let nu = 0;
    let tick = 0.7;
    while (true) {
        nu += global.term;
        let ln = new Line();
        ln.tint = 0x00f000;
        ln.thickness = tick;
        ln.ax = 0;
        ln.ay = nu;
        ln.bx = width;
        ln.by = nu;
        app.stage.addChild(ln);
        if (nu > height) break;
    }
    nu = 0;
    while (true) {
        nu += global.term;
        let ln = new Line();
        ln.tint = 0x00f000;
        ln.thickness = tick;
        ln.ax = nu;
        ln.ay = 0;
        ln.bx = nu;
        ln.by = height;
        app.stage.addChild(ln);
        if (nu > width) break;
    }
}
export {
    createMosa
};