let displaySystem = (width, height, fps, container) => {
    if (fps) {
        (function () { var script = document.createElement('script'); script.onload = function () { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'; document.head.appendChild(script); })();
    }
    let original = {
        width, height
    };
    let pointer = {
        createPIXIApp() {
            let display = this;
            // let ratio = display.getRatio();
            const app = new PIXI.Application({
                width: display.width,// * ratio,
                height: display.height,// * ratio,
                antialias: true,
                resolution: window.devicePixelRatio,
                autoDensity: true,
            });
            display.width = app.screen.width;
            display.height = app.screen.height;
            app.stage.sortableChildren = true;
            display.container.innerText = '';
            display.container.appendChild(app.view);
            return app;
        },
        log(v) {
        },
        getRatio() {
            let { width, height } = container.getBoundingClientRect();
            if (container.constructor === HTMLBodyElement) {
                width = window.innerWidth;
                height = window.innerHeight;
            } else {
                if (!width || !height) throw new Error(`부모의 크기가 작거나 돔트리에 붙어있지 않은 상태로 보입니다`);
            }
            let ratio = height / original.height;
            if (original.width * ratio > width) {
                ratio = width / original.width;
            }
            return ratio;
        },
    };
    pointer.ratio = pointer.getRatio();
    pointer.width = pointer.ratio * width;
    pointer.height = pointer.ratio * height;
    pointer.container = container;
    return pointer;
}