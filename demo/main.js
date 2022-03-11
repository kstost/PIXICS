window.addEventListener('load', async () => {

    const { app, pixics, world, size, PIXICS, b2 } = await initPixics({
        resolution: { width: 1080, height: 1920 },
        fpsmonitor: !true,
        container: document.querySelector('body'),
        gravity: { x: 0, y: -30 },
        worldscale: 100,
        scriptlist: [
            "https://pixijs.download/v6.2.1/pixi.min.js",
            "../src/pixics.js",
            "https://cdn.jsdelivr.net/gh/flyover/box2d.ts@52eb0773a59592dc573c4bc4d0f1451676a43ef9/dist/box2d.umd.js",
        ]

    });
    const { ratio } = size;
    const { width, height } = size.actualSize;
    const L = pixics.log;
    pixics.moveWorldCenterTo(150 * ratio, -210 * ratio);

    //------------------------------
    let boxsize = (1080 / 2) * ratio;
    let rectangle = new PIXICS.PhysicsGraphics({ world });
    rectangle.drawRect(0, -400 * ratio, boxsize, boxsize, 0x00aa00);
    app.stage.addChild(rectangle.getGraphic());
    rectangle.setAngle(0.2);

    let movingCircle = new PIXICS.PhysicsGraphics({ world });
    movingCircle.drawCircle(100 * ratio, 700 * ratio, boxsize * 0.1, 0x0088ff);
    app.stage.addChild(movingCircle.getGraphic());
    movingCircle.setDynamic();

    function pinPoint(df, color) {
        let physics = new PIXICS.PhysicsGraphics({ world });
        physics.drawCircle(df.x * PIXICS.worldscale, df.y * PIXICS.worldscale, 20 * ratio, 0xffffff);
        physics.setSensor(true);
        app.stage.addChild(physics.getGraphic());

        let pixis = pixics.worldPositionToPIXIStyle(df);
        let pixiGraphic = new PIXI.Graphics();
        pixiGraphic.beginFill(color);
        pixiGraphic.drawCircle(0, 0, width / 100);
        pixiGraphic.endFill();
        pixiGraphic.x = pixis.x;
        pixiGraphic.y = pixis.y;
        app.stage.addChild(pixiGraphic);
    }
    rectangle.addEvent('contact', movingCircle, function (movingCircle, response, contactPosition) {
        L(`${response}: ${JSON.stringify(contactPosition)}`);
        pinPoint(contactPosition, 0x0077ff);
    }, () => '닿음', true); // addEvent의 다섯번째 인자를 true로 하면 contactPosition 로 접촉한 위치의 좌표를 준다

    rectangle.addEvent('untact', movingCircle, function (movingCircle, response, contactPosition) {
        L(`${response}: ${JSON.stringify(contactPosition)}`);
        pinPoint(contactPosition, 0x77aa00);
    }, () => '떨어짐', true); // addEvent의 다섯번째 인자를 true로 하면 contactPosition 로 떨어진 위치의 좌표를 준다 (addEvent로 contact를 지정하고 다섯번째 인자를 true로 한 경우에만 작동한다)
});