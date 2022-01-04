window.addEventListener('load', async () => {

    const { app, pixics, world, size, PIXICS, b2 } = await initPixics({
        resolution: { width: 1080, height: 1920 },
        fpsmonitor: true,
        container: document.querySelector('body'),
        gravity: { x: 0, y: -30 },
        worldscale: 100,
    });

    // let box = new PIXICS.PhysicsGraphics({ world });
    // box.drawRect(0, 0, 100 * size.ratio / 4, size.actualSize.width / 4);
    // app.stage.addChild(box.getGraphic());

});