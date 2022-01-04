async function initPixics(initValue) {
    let scriptlist = [
        "https://pixijs.download/v6.2.1/pixi.min.js",
        "https://cdn.jsdelivr.net/gh/kstost/ksttool/ksttool.js",
        "https://cdn.jsdelivr.net/gh/kstost/PIXICS@dd27677/PIXICS.js",
        "https://cdn.jsdelivr.net/gh/kstost/PIXICS@dd27677/system.js",
        "https://cdn.jsdelivr.net/gh/flyover/box2d.ts@4bea859e7b1bab55429d76e03f72b1de72edc5f8/dist/box2d.umd.js",
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
    let syncList = scriptlist.splice(0, 1);
    for (let i = 0; i < syncList.length; i++) await new Promise(promiseCb.bind({ url: syncList[i], scr: genScript() }));
    await Promise.all(scriptlist.map(url => new Promise(promiseCb.bind({ url, scr: genScript() }))));
    if (false) {
        const { app, pixics, world, ratio, width, height, PIXICS, b2 } = await initPixics({
            resolution: { width: 1080, height: 1920 },
            fpsmonitor: true,
            container: document.querySelector('body'),
            gravity: { x: 0, y: -30 },
            worldscale: 100,
        });
    }
    if (initValue) {

        // 스크린의 준비
        const display = displaySystem(initValue.resolution.width, initValue.resolution.height, !!initValue.fpsmonitor, initValue.container); // 스크린너비, 스크린높이, 성능측정모니터사용여부
        const app = display.createPIXIApp(); // 화면을 생성한다 PIXI Application Stage 를 생성한다
        const { ratio, width, height } = display; // 계산된 실제 화면크기를 얻는다. width/ratio 한 값은 displaySystem 함수 첫번째인자로 넣은 숫자와 같다.

        // 피직스월드의 준비
        const pixics = PIXICS.createWorld(initValue.worldscale, ratio, initValue.gravity, true, display); // 첫번째 인자의 숫자는 커질수록 요소의 움직임이 빨라진다. 빨라지는 이유는 실제 화면상 픽셀수와 피직스월드의 수치와의 스케일을 나타내는 값이기 때문이다.
        const world = pixics.world;
        return {
            size: {
                ratio,
                resolution: initValue.resolution,
                actualSize: { width, height },
            },
            b2,
            PIXICS,
            app,
            pixics,
            world,
            display,
            ...{ ratio, width, height }
        }
    }
}