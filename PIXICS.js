const PIXICS = (() => {
    class PhysicsGraphics {
        constructor({ world }) {
            this.world = world;
            this.graphic = new PIXI.Graphics();
            this.planckBody = world.createBody({
                bullet: false,
            });
            this.planckBody.setGravityScale(1);
            this.planckBody.setUserData(this);
            this.planckBody.setMassData({ mass: 1, center: planck.Vec2(0, 0), I: 1 });
        }
        getGraphic() {
            return this.graphic;
        }
        createFixture(shape, attr) {
            return this.planckBody.createFixture(shape, attr);
        }
        drawRect(x, y, width, height) {
            this.graphic.beginFill(0xffffff);
            this.graphic.drawRect(x, y, width, height);
            this.graphic.endFill();
            let position = planck.Vec2((x + (width / 2)) / PIXICS.worldscale, -(y + (height / 2)) / PIXICS.worldscale);
            let shape = planck.Box(width / 2 / PIXICS.worldscale, height / 2 / PIXICS.worldscale, position);
            let fixture = this.createFixture(shape, { density: 1, friction: 1, restitution: 0 });
            fixture.drawingProfile = arguments;
            return fixture;
        }
        drawPolygon(path) {
            this.graphic.beginFill(0xffffff);
            for (let i = 0; i < path.length; i++) {
                if (i === 0) {
                    this.graphic.moveTo((path[i].x), (path[i].y));
                } else {
                    this.graphic.lineTo((path[i].x), (path[i].y));
                }
            }
            this.graphic.closePath();
            this.graphic.endFill();
            let shape = planck.Polygon(path.map(point => {
                point.x /= PIXICS.worldscale;
                point.y /= PIXICS.worldscale;
                point.y *= -1
                return point;
            }));
            let fixture = this.createFixture(shape, { density: 1, friction: 1, restitution: 0 });
            fixture.drawingProfile = arguments;
            return fixture;
        }
        drawCircle(x, y, radius) {
            this.graphic.beginFill(0xffffff);
            this.graphic.drawCircle(x, y, radius);
            this.graphic.endFill();
            let position = planck.Vec2(x / PIXICS.worldscale, -y / PIXICS.worldscale);
            let shape = planck.Circle(position, radius / PIXICS.worldscale);
            let fixture = this.createFixture(shape, { density: 1, friction: 1, restitution: 0 });
            fixture.drawingProfile = arguments;
            return fixture;
        }
        syncState() {
            this.graphic.rotation = -this.planckBody.getAngle();
            let bodyPosition = this.planckBody.getPosition();
            this.graphic.x = bodyPosition.x * PIXICS.worldscale;
            this.graphic.y = -bodyPosition.y * PIXICS.worldscale;
        }
        setAngle(radian) {
            this.planckBody.setAngle(radian);
            this.syncState();
            this.touchContacts();
        }
        getAngle() {
            return this.planckBody.getAngle();
        }
        setPosition(x, y) {
            if (x === undefined || y === undefined) return;
            this.planckBody.setPosition(planck.Vec2(x / PIXICS.worldscale, -y / PIXICS.worldscale));
            this.syncState();
            this.touchContacts();
        }
        getPosition() {
            let dd = this.planckBody.getPosition();
            return {
                x: dd.x * PIXICS.worldscale,
                y: (dd.y * PIXICS.worldscale) * -1,
            }
        }
        touchContacts() {
            for (let b = this.planckBody.getContactList(); b; b = b.next) {
                b.contact.getFixtureA().getBody().setAwake(true);
                b.contact.getFixtureB().getBody().setAwake(true);
            }
        }
        getBody() {
            return this.planckBody;
        }
        getFixtures() {
            let list = [];
            for (let fixture = this.planckBody.getFixtureList(); fixture; fixture = fixture.getNext()) {
                list.push(fixture);
            }
            return list;
        }
        setFixtureProp(value, propname, idx) {
            let fnname = ({
                density: 'setDensity',
                restitution: 'setRestitution',
                friction: 'setFriction',
            })[propname];
            let fixtures = this.getFixtures();
            if (idx === undefined) {
                fixtures.forEach(fixture => {
                    fixture[fnname](value);
                })
            } else {
                let fx;
                if (idx.constructor === Number) {
                    fx = fixtures[(fixtures.length - 1) - idx];
                } else {
                    fx = fixtures.filter(f => f === idx)[0];
                }
                fx[fnname](value);
            }
        }
        getFixtureProp(propname, idx) {
            let fnname = ({
                density: 'getDensity',
                restitution: 'getRestitution',
                friction: 'getFriction',
            })[propname];
            let fixtures = this.getFixtures();
            let fx;
            if (idx.constructor === Number) {
                fx = fixtures[(fixtures.length - 1) - idx];
            } else {
                fx = fixtures.filter(f => f === idx)[0];
            }
            return fx[fnname]();
        }
        setDensity(value, idx) {
            this.setFixtureProp(value, 'density', idx);
            this.resetBodyAndFixtures();
        }
        getDensity(idx) { return this.getFixtureProp('density', idx); }
        setRestitution(value, idx) {
            this.setFixtureProp(value, 'restitution', idx);
            this.resetBodyAndFixtures();
        }
        getRestitution(idx) { return this.getFixtureProp('restitution', idx); }
        setFriction(value, idx) {
            this.setFixtureProp(value, 'friction', idx);
            this.resetBodyAndFixtures();
        }
        getFriction(idx) { return this.getFixtureProp('friction', idx); }
        setDynamic() {
            this.planckBody.setDynamic();
        }
        isDynamic() {
            return this.planckBody.isDynamic();
        }
        resetBodyAndFixtures(_shape) {
            /*
                setDynamic() 을 하고난 뒤에 Fixture의 Shape을 바꾸거나 density를 바꾸고자 할때에는 아예 body를 제거하고 새롭게 재정의 해야한다
                본 함수는 fixture가 하나일때에 대해서만 대응한다
            */
            let { x, y } = this.getPosition();
            let gravityScale = this.planckBody.getGravityScale();
            let dynamic = this.planckBody.isDynamic();
            let static_ = this.planckBody.isStatic();
            let active = this.planckBody.isActive();
            let awake = this.planckBody.isAwake();
            let angularVelocity = this.planckBody.getAngularVelocity();
            let linearDamping = this.planckBody.getLinearDamping();
            let linearVelocity = this.planckBody.getLinearVelocity();
            let bullet = this.planckBody.isBullet();
            let kinematic = this.planckBody.isKinematic();
            let fixedRotation = this.planckBody.isFixedRotation();
            let angle = this.getAngle();
            let fixtures = new Map();
            let fixtureList = [];//[...fixtures.keys()];
            for (let fixture = this.planckBody.getFixtureList(); fixture; fixture = fixture.getNext()) {
                fixtureList.push(fixture);
                let shape = _shape ? _shape : fixture.getShape();
                let restitution = fixture?.getRestitution();
                let friction = fixture?.getFriction();
                let density = fixture?.getDensity();
                density = density ? density : 1;
                fixtures.set(fixture, {
                    shape,
                    restitution,
                    friction,
                    density
                });
            }

            // 접해있는것의 목록을 담기
            let contactList = [];
            for (let b = this.planckBody.getContactList(); b; b = b.next) {
                let a = b.contact.getFixtureA().getBody();
                let b = b.contact.getFixtureB().getBody();
                contactList.push(a, b);
            }

            // 픽스쳐와 바디를 제거한다
            fixtureList.forEach(fixture => this.planckBody.destroyFixture(fixture));
            this.planckBody.getWorld().destroyBody(this.planckBody);

            // 바디를 재생성 및 값 복원
            this.planckBody = this.world.createBody({
                bullet: false,
            });
            this.planckBody.setGravityScale(gravityScale);
            this.planckBody.setUserData(this);
            this.planckBody.setMassData({ mass: 1, center: planck.Vec2(0, 0), I: 1 });

            // 픽스쳐 재생성 및 값 복원
            fixtureList.reverse().forEach(fixture => {
                const {
                    shape,
                    restitution,
                    friction,
                    density
                } = fixtures.get(fixture);
                const drawingProfile = fixture.drawingProfile;
                fixture = this.planckBody.createFixture(shape);
                fixture.setRestitution(restitution || 0);
                fixture.setFriction(friction || 0);
                fixture.setDensity(density || 0);
                fixture.drawingProfile = drawingProfile;
            });

            // 바디 상태값 재조정
            this.setPosition(x, y);
            this.setAngle(angle);

            // 다이나믹상태 복원
            dynamic && this.planckBody.setDynamic();

            // 그외 바디의 상태값 복원
            kinematic && this.planckBody.setKinematic(); // https://piqnt.com/planck.js/BodyTypes
            static_ && this.planckBody.setStatic();
            this.planckBody.setBullet(bullet);
            this.planckBody.setAwake(awake);
            this.planckBody.setActive(active);
            this.planckBody.setFixedRotation(fixedRotation);
            this.planckBody.setAngularVelocity(angularVelocity);
            this.planckBody.setLinearDamping(linearDamping);
            this.planckBody.setLinearVelocity(linearVelocity);

            // 접해있던것 깨우기
            contactList.forEach(contact => contact.setAwake(true));
        }
    }
    //------------------------------
    // 매 프레임마다 물리연산을 해서 나오는 수치를 픽시 그래픽요소의 상태에 반영
    let updateList = new Map();
    let registUpdate = world => {
        PIXI.Ticker.shared.add(dt => {
            world.step(((1 * dt) / 60));
            world.clearForces();
            for (let body = world.getBodyList(); body; body = body.getNext()) {
                body.getUserData()?.syncState();
            }
            let it = updateList.keys();
            while (true) {
                let { value, done } = it.next();
                if (done) break;
                value();
            }
        });
    }

    let point = {
        worldscale: 0, PhysicsGraphics,
        transScale(v) { return v / PIXICS.worldscale; },
        createWorld(scale, gravity) {
            point.worldscale = scale;
            let world = new planck.World(gravity);
            registUpdate(world);
            return {
                world,
                worldscale: scale,
                update: function (cb) {
                    updateList.set(cb);
                },
                unupdate: function (cb) {
                    updateList.delete(cb);
                }
            };
        }
    };
    return point;
})();
