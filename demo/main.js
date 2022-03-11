window.addEventListener('load', async () => {

    const { app, pixics, world, size, PIXICS, b2 } = await initPixics({
        resolution: { width: 1080, height: 1920 },
        fpsmonitor: true,
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
    pixics.update(function (dt) { /*매프레임(1/60sec)마다 수행시킬코드*/ });

    //------------------------------
    L('0x0 좌표에 박스를 만든다');
    L(`크기값의 관계: ${ratio * 1080} === ${width}`);
    let boxsize = (1080 / 2) * ratio;
    let rectangle = new PIXICS.PhysicsGraphics({ world });
    rectangle.drawRect(0, -400 * ratio, boxsize, boxsize, 0x00aa00);
    app.stage.addChild(rectangle.getGraphic());
    rectangle.setAngle(0.2);

    let aaaa = new PIXICS.PhysicsGraphics({ world });
    aaaa.drawCircle(100 * ratio, 700 * ratio, boxsize * 0.1, 0x0088ff);
    app.stage.addChild(aaaa.getGraphic());
    aaaa.setDynamic();

    console.log(ratio);
    console.log(PIXICS.worldscale);
    console.log(width);
    function pinPoint(df) {
        let asdfaf = new PIXICS.PhysicsGraphics({ world });
        asdfaf.drawCircle(df.x * PIXICS.worldscale, df.y * PIXICS.worldscale, 10 * ratio, 0xffffff);
        asdfaf.setSensor(true);
        app.stage.addChild(asdfaf.getGraphic());
    }

    rectangle.addEvent('contact', aaaa, function (aaaa, d, contact) {
        const worldManifold = new b2.WorldManifold();
        contact.GetWorldManifold(worldManifold);
        pinPoint(worldManifold.points[0])
    });
    rectangle.addEvent('untact', aaaa, function (aaaa, d, contact) {
        // const worldManifold = new b2.WorldManifold();
        // contact.GetWorldManifold(worldManifold);
        // console.log(worldManifold);
        // pinPoint(worldManifold.points[0])
    });


});











if (false) {
    let oldManifold = param;
    let b2__namespace = b2;
    const manifold = contact.GetManifold();
    // if (manifold.pointCount === 0) {
    //     return;
    // }
    const fixtureA = contact.GetFixtureA();
    const fixtureB = contact.GetFixtureB();
    const state1 = [];//Test.PreSolve_s_state1;
    const state2 = [];//Test.PreSolve_s_state2;
    b2__namespace.GetPointStates(state1, state2, oldManifold, manifold);
    const worldManifold = Test.PreSolve_s_worldManifold;
    contact.GetWorldManifold(worldManifold);
    console.log(worldManifold.points[0]);
    if (false) {
        for (let i = 0; i < manifold.pointCount && this.m_pointCount < Test.k_maxContactPoints; ++i) {
            const cp = this.m_points[this.m_pointCount];
            cp.fixtureA = fixtureA;
            cp.fixtureB = fixtureB;
            cp.position.Copy(worldManifold.points[i]);
            cp.normal.Copy(worldManifold.normal);
            cp.state = state2[i];
            cp.normalImpulse = manifold.points[i].normalImpulse;
            cp.tangentImpulse = manifold.points[i].tangentImpulse;
            cp.separation = worldManifold.separations[i];
            ++this.m_pointCount;
        }
    }
}
if (false && contact.GetManifold().pointCount >= 1) {
    const worldManifold = new b2.WorldManifold();
    contact.GetWorldManifold(worldManifold);
    // console.log(worldManifold.points[0].x * PIXICS.worldscale);
    let df = new b2.Vec2();
    df.Copy(worldManifold.points[0]);
    // console.log(df);
    // sendThru = {
    //     x: (worldManifold.points[0].x * PIXICS.worldscale) * 0.5 * ratio,
    //     y: (-(worldManifold.points[0].y * PIXICS.worldscale)) * 0.5 * ratio,
    // }
    // worldManifold.points.forEach(vec => {
    //     console.log(vec);
    // });
}