async function initPixics(initValue) {
    let scriptlist = [
        "https://pixijs.download/v6.2.1/pixi.min.js",
        // "https://cdn.jsdelivr.net/gh/kstost/ksttool/ksttool.js",
        "https://cdn.jsdelivr.net/gh/kstost/PIXICS@26e2e7e/src/pixics.js",
        "https://cdn.jsdelivr.net/gh/flyover/box2d.ts@52eb0773a59592dc573c4bc4d0f1451676a43ef9/dist/box2d.umd.js",
        // "https://rawcdn.githack.com/flyover/box2d.ts/master/dist/box2d.umd.js",
    ];
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
        let syncList = scriptlist.splice(0, 1);
        for (let i = 0; i < syncList.length; i++) await new Promise(promiseCb.bind({ url: syncList[i], scr: genScript() }));
        await Promise.all(scriptlist.map(url => new Promise(promiseCb.bind({ url, scr: genScript() }))));
        initPixics.status = 2;
    } else {
        while (initPixics.status !== 2) await new Promise(r => setTimeout(r))
    }
    const PIXICS = pixiInst();
    if (initValue) {

        // 스크린의 준비
        const display = PIXICS.displaySystem(
            initValue.resolution ? [initValue.resolution.width, initValue.resolution.height] : [],
            !!initValue.fpsmonitor, initValue.container); // 스크린너비, 스크린높이, 성능측정모니터사용여부
        const app = display.createPIXIApp(); // 화면을 생성한다 PIXI Application Stage 를 생성한다
        const { ratio, width, height } = display; // 계산된 실제 화면크기를 얻는다. width/ratio 한 값은 displaySystem 함수 첫번째인자로 넣은 숫자와 같다.

        // 피직스월드의 준비
        const pixics = PIXICS.createWorld(initValue.worldscale, ratio, initValue.gravity, true, display); // 첫번째 인자의 숫자는 커질수록 요소의 움직임이 빨라진다. 빨라지는 이유는 실제 화면상 픽셀수와 피직스월드의 수치와의 스케일을 나타내는 값이기 때문이다.
        const world = pixics.world;
        let size = initValue.resolution ? {
            ratio,
            resolution: initValue.resolution,
            actualSize: { width, height },
        } : { ratio };
        return {
            math: PIXICS.math,
            size,
            b2,
            PIXICS,
            app,
            pixics,
            world,
            display,
            ratio, width, height
        }
    }
}
