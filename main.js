// 12f.d
0 && planck.testbed('CharacterCollision', function (testbed) {
    var pl = planck, Vec2 = pl.Vec2;
    var world = new pl.World(Vec2(0, -10));

    // Ground body
    var ground = world.createBody();
    ground.createFixture(pl.Edge(Vec2(-20.0, 0.0), Vec2(20.0, 0.0)), 0.0);

    // Square tiles. This shows that adjacency shapes may
    // have non-smooth collision. There is no solution
    // to this problem.

    var fd = {};
    fd.density = 10;
    fd.friction = 0.1;

    var tiles = world.createBody();
    tiles.createFixture(pl.Box(10, 10, Vec2(0, 0)), fd);
    tiles.createFixture(pl.Box(5, 5, Vec2(15, 5)), fd);
    tiles.createFixture(pl.Circle(Vec2(15, 5), 5), fd);
    // tiles.createFixture(pl.Box(0.1, 1.0, Vec2(8.0, 3.0)), fd);
    // tiles.setDynamic()


    return world;
});
// var tiles = world.createBody();
// tiles.createFixture(pl.Box(1.0, 1.0, Vec2(4.0, 3.0), 0.0), 0.0);
// tiles.createFixture(pl.Box(1.0, 1.0, Vec2(6.0, 3.0), 0.0), 0.0);
// tiles.createFixture(pl.Box(1.0, 1.0, Vec2(8.0, 3.0), 0.0), 0.0);

(function () { var script = document.createElement('script'); script.onload = function () { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'; document.head.appendChild(script); })();

window.addEventListener('load', function () {

    //------------------------------
    let app = new PIXI.Application({
        width: this.window.innerWidth,
        height: this.window.innerHeight,
        antialias: true,
        resolution: window.devicePixelRatio,
        autoDensity: true,
    });
    let { width, height } = app.screen;
    let logElement = document.querySelector('#log');
    document.querySelector('#container_winter').appendChild(app.view);
    app.stage.sortableChildren = true;
    //------------------------------
    //======================================================
    function log(str) {
        let div = document.createElement('div');
        div.innerText = str;
        logElement.insertBefore(div, logElement.firstChild);
        // logElement.appendChild(div);
    }
    //==============
    let gravity = planck.Vec2(0, -10);
    let world = new planck.World(gravity);
    PIXI.Ticker.shared.add(dt => {
        world.step(((1 * dt) / 60));
        world.clearForces();
        for (let body = world.getBodyList(); body; body = body.getNext()) {
            body.getUserData()?.syncState();
        }
    });

    let 바운더리 = new PhysicsGraphics({ world });
    바운더리.drawRect(0, 0, width, 5);
    바운더리.drawRect(0, height - 5, width, 5);
    바운더리.drawRect(0, 0, 5, height);
    바운더리.drawRect(width - 5, 0, 5, height);
    바운더리.getGraphic().tint = 0x666600;
    app.stage.addChild(바운더리.getGraphic());

    // {
    //     let rect = new PIXICS.Rect({ world: world, width: width * 10, height: 10, x: width / 2, y: height });
    //     rect.tint = 0x00aa00;
    //     app.stage.addChild(rect);
    // }
    // {
    //     let rect = new PIXICS.Rect({ world: world, width: width * 10, height: 10, x: width / 2, y: 0 });
    //     rect.tint = 0x00aa00;
    //     app.stage.addChild(rect);
    // }
    // {
    //     let rect = new PIXICS.Rect({ world: world, width: 10, height: height * 10, x: width, y: height / 2 });
    //     rect.tint = 0x00aa00;
    //     app.stage.addChild(rect);
    // }
    // {
    //     let rect = new PIXICS.Rect({ world: world, width: 10, height: height * 10, x: 0, y: height / 2 });
    //     rect.tint = 0x00aa00;
    //     app.stage.addChild(rect);
    // }


    for (let i = 0; i < 100; i++) {
        let pg = new PhysicsGraphics({ world });
        pg.drawCircle(width * Math.random(), height * Math.random(), 20 + (Math.random() * 20))
        pg.setDynamic();
        app.stage.addChild(pg.getGraphic());

        function onDragStart(event) {
            this.data = event.data;
            this.prevstep = this.data.getLocalPosition(this.parent);
            this.dragging = true;
        }
        function onDragEnd() {
            this.dragging = false;
            this.data = null;
        }
        function onDragMove() {
            if (this.dragging) {
                var newPosition = this.data.getLocalPosition(this.parent);
                let x = this.prevstep.x - newPosition.x;
                let y = this.prevstep.y - newPosition.y;
                this.prevstep = newPosition;
                let xx = PIXICS.transScale(width);
                pg.planckBody.setLinearVelocity(planck.Vec2(-x * xx, y * xx));
            }
        }
        pg.getGraphic().interactive = true;
        pg.getGraphic().on('mousedown', onDragStart)
            .on('touchstart', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('touchend', onDragEnd)
            .on('touchendoutside', onDragEnd)
            .on('mousemove', onDragMove)
            .on('touchmove', onDragMove);

    }

    return;

    function onDragStart(event) {
        this.data = event.data;
        this.prevstep = this.data.getLocalPosition(this.parent);
        this.dragging = true;
    }
    function onDragEnd() {
        this.dragging = false;
        this.data = null;
    }
    function onDragMove() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            let x = this.prevstep.x - newPosition.x;
            let y = this.prevstep.y - newPosition.y;
            this.prevstep = newPosition;
            let xx = PIXICS.transScale(200);
            rect1.planckBody.setLinearVelocity(planck.Vec2(-x * xx, y * xx));
        }
    }
    let rect1 = new PhysicsGraphics({ world });
    window.rect1 = rect1;
    rect1.setDynamic();
    app.stage.addChild(rect1.getGraphic());

    rect1.graphic.interactive = true;
    0 && rect1.drawRect(0, 0, 100, 100);
    0 && rect1.drawRect(100, 50, 50, 50);
    // rect1.resetBodyAndFixtures();
    // rect1.drawPolygon([
    //     planck.Vec2(0, 0),
    //     planck.Vec2(0, 50),
    //     planck.Vec2(50, 50),
    //     planck.Vec2(50, 0),
    // ]);
    // rect1.drawPolygon([
    //     planck.Vec2(50 + 0, 50 + 0),
    //     planck.Vec2(50 + 0, 50 + 50),
    //     planck.Vec2(50 + 50, 50 + 50),
    //     planck.Vec2(50 + 50, 50 + 0),
    // ]);
    // rect1.drawPolygon([
    //     planck.Vec2(100 + 0, 100 + 0),
    //     planck.Vec2(100 + 0, 100 + 50),
    //     planck.Vec2(100 + 50, 100 + 50),
    //     planck.Vec2(100 + 50, 100 + 0),
    // ]);
    let aa1 = rect1.drawCircle(100 + 25, 25, 10);
    let aa2 = rect1.drawCircle(150 + 25, 25, 25);
    let aa3 = rect1.drawCircle(200 + 25, 25, 25);

    rect1.setDensity(1000, 0);
    rect1.setDensity(0.1, 1);
    rect1.setDensity(0.1, 2);
    // rect1.setDynamic();
    // rect1.drawRect(150, 50, 50, 50);
    // console.log(rect1.graphic.on);
    rect1
        .graphic.on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);


    for (let i = 0; i < 30; i++) {
        let ball = new PIXICS.Circle({ world: world });
        app.stage.addChild(ball);
        ball.setPosition(Math.random() * width, Math.random() * (height / 2));
        ball.setRadius(20);
        ball.tint = 0xff00aa;
        ball.setDynamic();
        ball.setRestitution(0)
        ball.setDensity(100)
        ball.syncState();
        ball.interactive = true;
        let touch = () => {
            ball.getBody().setLinearVelocity(planck.Vec2(0, 70))
        };
        ball.on('mousedown', touch);
        ball.on('touchstart', touch);
    }






    if (false) {
        let rect0 = new PIXICS.Rect({ world: world, width: 20, height: 20, x: 10, y: height / 2 });
        rect0.tint = 0x00aa00;
        rect0.setDensity(10)
        rect0.setDynamic();
        app.stage.addChild(rect0);
        rect0.interactive = true;
        let ddsdf = () => rect0.getBody().setLinearVelocity(planck.Vec2(2, 0));
        rect0.on('mousedown', ddsdf);
        rect0.on('touchstart', ddsdf);

        let rect1 = new PIXICS.Rect({ world: world, width: 50, height: 50, x: width / 2, y: height / 2 });
        rect1.tint = 0x00aa00;
        rect1.setDensity(10)
        rect1.setDynamic();
        app.stage.addChild(rect1);
        rect1.interactive = true;
        // let touch = () => rect1.getBody().setLinearVelocity(planck.Vec2(0, 20));
        // rect1.on('mousedown', touch);
        // rect1.on('touchstart', touch);

        let rect2 = new PIXICS.Rect({ world: world, width: 20, height: 20, x: 250, y: 50 });
        rect2.tint = 0x00aaff;
        rect2.setDynamic();
        app.stage.addChild(rect2);
        rect2.interactive = true;
        let touch2 = () => rect2.getBody().setLinearVelocity(planck.Vec2(0, 20));
        rect2.on('mousedown', touch2);
        rect2.on('touchstart', touch2);

        world.createJoint(planck.WeldJoint({
            // frequencyHz: 1,
            // dampingRatio: 0,
            // frequency: 0,
            // dampingRatio: 0,
        }, rect1.getBody(), rect2.getBody(), planck.Vec2(0, 0)));

        // app.stage.interactive = true;// This can't be forgotten 
        // app.stage.on("mousedown", (event) => {
        //     console.log("stage")
        // })


        rect1
            .on('mousedown', onDragStart)
            .on('touchstart', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('touchend', onDragEnd)
            .on('touchendoutside', onDragEnd)
            .on('mousemove', onDragMove)
            .on('touchmove', onDragMove);

        function onDragStart(event) {
            // store a reference to the data
            // the reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = event.data;
            this.prevstep = this.data.getLocalPosition(this.parent);

            // this.alpha = 0.5;
            this.dragging = true;
            // rect1.getBody().setGravityScale(0);
        }

        function onDragEnd() {
            // this.alpha = 1;

            this.dragging = false;

            // set the interaction data to null
            this.data = null;
        }

        function onDragMove() {
            if (this.dragging) {
                var newPosition = this.data.getLocalPosition(this.parent);
                let x = this.prevstep.x - newPosition.x;
                let y = this.prevstep.y - newPosition.y;
                this.prevstep = newPosition;
                let xx = PIXICS.transScale(200);
                rect1.getBody().setLinearVelocity(planck.Vec2(-x * xx, y * xx));
                // log(x)
                // this.position.x = newPosition.x;
                // this.position.y = newPosition.y;
            }
        }

    }

    if (false) {
        var ground = world.createBody();

        let x = 150;
        var y = 50;
        var prevBody = ground;
        let size = 20;
        for (var i = 0; i < 15; i += 1) {
            let rect = new PIXICS.Rect({ world: world, width: size + (size * 0.1), height: size * 0.3 });
            rect.interactive = true;
            let touch = () => {
                rect.getBody().setLinearVelocity(planck.Vec2(1000, 0))
            };
            rect.on('mousedown', touch);
            rect.on('touchstart', touch);
            rect.tint = 0x00aa00;
            app.stage.addChild(rect);
            rect.setPosition(((size / 2) + (x + (i * size))), y);
            rect.setDynamic();
            rect.setDensity(0.001);
            world.createJoint(planck.RevoluteJoint({
                collideConnected: false,
            }, prevBody, rect.getBody(), planck.Vec2((x + (i * size)) / PIXICS.worldscale, -y / PIXICS.worldscale)));
            prevBody = rect.getBody();;
        }



        for (let i = 0; i < 0; i++) {
            if (true) {
                let ball = new PIXICS.Polygon({ world: world });
                ball.tint = 0xffaa00;
                app.stage.addChild(ball);
                ball.setDynamic();
                ball.setPosition(width / 2, (height / 2));
                ball.setPath([
                    planck.Vec2(-50 * 0.3, -50 * 0.3),
                    planck.Vec2(50 * 0.3, -50 * 0.3),
                    planck.Vec2(50 * 0.3, 50 * 0.3),
                ]);
                ball.setDensity(10000);
                ball.setRestitution(0);
                ball.setFriction(1);
                ball.syncState();
                ball.interactive = true;
                let touch = () => {
                    ball.getBody().setLinearVelocity(planck.Vec2(0, 70))
                };
                ball.on('mousedown', touch);
                ball.on('touchstart', touch);
            }
        }

        for (let i = 0; i < 0; i++) {
            let ball = new PIXICS.Circle({ world: world });
            app.stage.addChild(ball);
            ball.setPosition(Math.random() * width, Math.random() * (height / 2));
            ball.setRadius(20, 1000);
            if (i < 50) {
                ball.tint = 0xff00aa;
            } else {
                ball.tint = 0x00ffaa;
            }
            ball.setDynamic();
            ball.syncState();
            ball.interactive = true;
            let touch = () => {
                ball.getBody().setLinearVelocity(planck.Vec2(0, 70))
            };
            ball.on('mousedown', touch);
            ball.on('touchstart', touch);
        }
    }
});

