let displaySystem = (width, height, fps) => {
    if (fps) {
        (function () { var script = document.createElement('script'); script.onload = function () { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'; document.head.appendChild(script); })();
    }
    let display = {
        width,
        height,
        tr(v) { return v * (display.actualWidth / display.width); },
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