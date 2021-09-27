let displaySystem = (width, height, fps) => {
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
            return app;
        },
        log(v) {
            // document.createElement();
            return;
            // #log {
            //     position: fixed;
            //     z-index: 100;
            //     top:0px;
            //     left:0px;
            //     color:white;
            //     text-align: left;
            //     /* display: none; */
            // }
            if (!this.log.count) { this.log.count = 0; }
            this.log.count++;
            let el = document.querySelector('#log');
            if (el) {
                el.innerHTML += `${this.log.count} - ${v}<br />`
            }
        },
        getRatio() {
            let ratio = window.innerHeight / original.height;
            if (original.width * ratio > window.innerWidth) {
                ratio = window.innerWidth / original.width;
            }
            return ratio;
        },
    };
    pointer.ratio = pointer.getRatio();
    pointer.width = pointer.ratio * width;
    pointer.height = pointer.ratio * height;
    return pointer;

    return;
    if (fps) {
        (function () { var script = document.createElement('script'); script.onload = function () { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'; document.head.appendChild(script); })();
    }
    let display = {
        width,
        height,
        tr(v) { return v * (display.actualWidth / display.width); },
        rt(v) { return v * (display.width / display.actualWidth); },
        // log(v) {
        //     if (!log.count) { log.count = 0; }
        //     log.count++;
        //     let el = document.querySelector('#log');
        //     if (el) {
        //         el.innerHTML += `${log.count} - ${v}<br />`
        //     }
        // },
        sizeCalc() {
            let _width = window.innerWidth;
            let _height = (display.height / display.width) * window.innerWidth;
            if (window.innerHeight <= _height) {
                _height = window.innerHeight;
                _width = (display.width / display.height) * window.innerHeight;
            }
            if (window.innerHeight > _height) {
                document.body.style.marginTop = `${(window.innerHeight - _height) * 0.5}px`
            }
            return { width: _width, height: _height };
        }
    }
    return display;
}