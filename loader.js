/* ***********************************************************************
PIXICS Copyright (c) 2022 Seungtae Kim
--------------------------------------------------------------------------
* PIXICS has dependencies on below projects Thanks to those awesome projects
*   - Box2D: https://github.com/erincatto/box2d
*   - PixiJS: https://github.com/pixijs/pixijs
*   - box2d.ts (A TypeScript port of Box2D): https://github.com/flyover/box2d.ts
************************************************************************** */
async function initPixics(initValue) {
    if (!initValue) throw new Error('');
    function scriptList() {
        return [...(initValue.scriptlist ? initValue.scriptlist : [
            "https://pixijs.download/v6.2.1/pixi.min.js",
            initValue.libPath ? initValue.libPath : "https://cdn.jsdelivr.net/gh/kstost/PIXICS@59e3d1a/dist/pixics.js",
            "https://cdn.jsdelivr.net/gh/flyover/box2d.ts@52eb0773a59592dc573c4bc4d0f1451676a43ef9/dist/box2d.umd.js",
        ])];
    }
    function genScript() {
        let scr = document.createElement('script');
        document.querySelector('head').appendChild(scr);
        return scr;
    }
    function promiseCb(resolve, reject) {
        const scr = this.scr;
        scr.addEventListener('load', resolve);
        scr.addEventListener('error', reject);
        scr.src = this.url;
    }
    if (initPixics.status === undefined) {
        initPixics.status = 1;
        let scriptlist = scriptList();
        let syncList = scriptlist.splice(0, 1);
        for (let i = 0; i < syncList.length; i++) await new Promise(promiseCb.bind({ url: syncList[i], scr: genScript() }));
        await Promise.all(scriptlist.map(url => new Promise(promiseCb.bind({ url, scr: genScript() }))));
        initPixics.status = 2;
    } else { while (initPixics.status !== 2) await new Promise(r => setTimeout(r)) }
    const PIXICS = pixiInst();
    function getAngle() {
        let val;
        try {
            val = screen.orientation.angle
        } catch (e) {
            val = window.innerWidth > window.innerHeight ? 90 : 0
        }
        return val;
    }
    let currentRotation = initValue.rotationEmulation !== undefined ? initValue.rotationEmulation : getAngle();
    if (initValue.rotation) initValue.rotation = currentRotation === 0;
    if (initValue.rotation !== undefined && !initValue.rotation) {
        let tmp = initValue.resolution.width;
        initValue.resolution.width = initValue.resolution.height;
        initValue.resolution.height = tmp;
    }
    // Creating Pixi Screen
    const display = PIXICS.displaySystem(initValue.resolution ? [initValue.resolution.width, initValue.resolution.height] : [], !!initValue.fpsmonitor, initValue.container);
    const app = display.createPIXIApp(initValue);
    const { ratio, width, height } = display;

    // Creating Physics-World
    // Moving goes fast as the number of the first parameter of createWorld method higher
    // The reason why it works so is for this value represents the scale of the physics world
    const pixics = PIXICS.createWorld(initValue.worldscale, ratio, initValue.gravity, true, display);
    let size = initValue.resolution ? { ratio, resolution: initValue.resolution, actualSize: { width, height }, } : { ratio };
    return { math: PIXICS.math, size, b2, PIXICS, app, pixics, world: pixics.world, display, ratio, width, height }
}
