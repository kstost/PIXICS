const PIXICS = (() => {

    let Ease = {};

    // simple linear tweening - no easing, no acceleration
    Ease.linearTween = function (t, b, c, d) {
        return c * t / d + b;
    };


    // quadratic easing in - accelerating from zero velocity
    Ease.easeInQuad = function (t, b, c, d) {
        t /= d;
        return c * t * t + b;
    };


    // quadratic easing out - decelerating to zero velocity
    Ease.easeOutQuad = function (t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
    };


    // quadratic easing in/out - acceleration until halfway, then deceleration
    Ease.easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };


    // cubic easing in - accelerating from zero velocity
    Ease.easeInCubic = function (t, b, c, d) {
        t /= d;
        return c * t * t * t + b;
    };


    // cubic easing out - decelerating to zero velocity
    Ease.easeOutCubic = function (t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    };


    // cubic easing in/out - acceleration until halfway, then deceleration
    Ease.easeInOutCubic = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    };


    // quartic easing in - accelerating from zero velocity
    Ease.easeInQuart = function (t, b, c, d) {
        t /= d;
        return c * t * t * t * t + b;
    };


    // quartic easing out - decelerating to zero velocity
    Ease.easeOutQuart = function (t, b, c, d) {
        t /= d;
        t--;
        return -c * (t * t * t * t - 1) + b;
    };


    // quartic easing in/out - acceleration until halfway, then deceleration
    Ease.easeInOutQuart = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    };


    // quintic easing in - accelerating from zero velocity
    Ease.easeInQuint = function (t, b, c, d) {
        t /= d;
        return c * t * t * t * t * t + b;
    };


    // quintic easing out - decelerating to zero velocity
    Ease.easeOutQuint = function (t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t * t * t + 1) + b;
    };


    // quintic easing in/out - acceleration until halfway, then deceleration
    Ease.easeInOutQuint = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t * t * t + 2) + b;
    };


    // sinusoidal easing in - accelerating from zero velocity
    Ease.easeInSine = function (t, b, c, d) {
        return -c * Ease.cos(t / d * (Ease.PI / 2)) + c + b;
    };



    // sinusoidal easing out - decelerating to zero velocity
    Ease.easeOutSine = function (t, b, c, d) {
        return c * Ease.sin(t / d * (Ease.PI / 2)) + b;
    };


    // sinusoidal easing in/out - accelerating until halfway, then decelerating
    Ease.easeInOutSine = function (t, b, c, d) {
        return -c / 2 * (Ease.cos(Ease.PI * t / d) - 1) + b;
    };


    // exponential easing in - accelerating from zero velocity
    Ease.easeInExpo = function (t, b, c, d) {
        return c * Ease.pow(2, 10 * (t / d - 1)) + b;
    };


    // exponential easing out - decelerating to zero velocity
    Ease.easeOutExpo = function (t, b, c, d) {
        return c * (-Ease.pow(2, -10 * t / d) + 1) + b;
    };


    // exponential easing in/out - accelerating until halfway, then decelerating
    Ease.easeInOutExpo = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * Ease.pow(2, 10 * (t - 1)) + b;
        t--;
        return c / 2 * (-Ease.pow(2, -10 * t) + 2) + b;
    };


    // circular easing in - accelerating from zero velocity
    Ease.easeInCirc = function (t, b, c, d) {
        t /= d;
        return -c * (Ease.sqrt(1 - t * t) - 1) + b;
    };


    // circular easing out - decelerating to zero velocity
    Ease.easeOutCirc = function (t, b, c, d) {
        t /= d;
        t--;
        return c * Ease.sqrt(1 - t * t) + b;
    };


    // circular easing in/out - acceleration until halfway, then deceleration
    Ease.easeInOutCirc = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return -c / 2 * (Ease.sqrt(1 - t * t) - 1) + b;
        t -= 2;
        return c / 2 * (Ease.sqrt(1 - t * t) + 1) + b;
    };


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
        isConnectedWith(thing) {
            let rtn = false;
            let mebody = this.getBody();
            let history = new Map();
            function looking(thing) {
                if (rtn || history.has(thing)) return;
                history.set(thing);
                let list = thing.getContactList();
                for (let i = 0; i < list.length; i++) {
                    let _thing = list[i].getUserData();
                    if (list[i] === mebody) { rtn = true; return; }
                    looking(_thing);
                }
            }
            looking(thing);
            return rtn;
        }
        getContactList() {
            let bbb = this;
            let contactList = new Map();
            for (let b = bbb.planckBody.getContactList(); b; b = b.next) {
                let aa = b.contact.getFixtureA().getBody();
                let bb = b.contact.getFixtureB().getBody();
                if (bbb.planckBody !== aa) { !contactList.has(aa) && contactList.set(aa, true) }
                if (bbb.planckBody !== bb) { !contactList.has(bb) && contactList.set(bb, true) }
            }
            return [...contactList.keys()];
        }
        async moveBy(x, y, s) {
            let startPoint = this.getPosition();
            await this.moveTo(startPoint.x + x, startPoint.y + y, s);
        }
        moveTo(x, y, s) {
            const pixics = point.pixics;
            return new Promise(r => {
                let point = this;
                let startPoint = point.getPosition();
                let endPoint = { x, y };
                var moveLength = ksttool.math.get_distance_between_two_point(startPoint, endPoint); // 충돌벽 길이
                var radian = ksttool.math.get_angle_in_radian_between_two_points(startPoint, endPoint);
                var rtn = ksttool.math.get_coordinate_distance_away_from_center_with_radian(s, startPoint, radian);
                point.getBody().setLinearVelocity(planck.Vec2(rtn.x - startPoint.x, startPoint.y - rtn.y))
                pixics.update(function upf() {
                    let currentPoint = point.getPosition();
                    var currentLength = ksttool.math.get_distance_between_two_point(startPoint, currentPoint); // 충돌벽 길이
                    if (moveLength <= currentLength) {
                        point.getBody().setLinearVelocity(planck.Vec2(0, 0))
                        point.setPosition(x, y);
                        pixics.unupdate(upf);
                        r();
                    }
                });
            })
        }
        async rotateEaseBy(x, duration, f) {
            let startPoint = this.getAngle();
            await this.rotateEaseTo(startPoint + x, duration, f);
        }
        async moveEaseBy(x, y, duration, f) {
            let startPoint = this.getPosition();
            await this.moveEaseTo(startPoint.x + x, startPoint.y + y, duration, f);
        }
        rotateEaseTo(x, duration, f) {
            return this.easingTo(x, null, duration, f);
        }
        moveEaseTo(x, y, duration, f) {
            return this.easingTo(x, y, duration, f);
        }
        easingTo(x, y, duration, f) {
            const pixics = point.pixics;
            const ratio = point.ratio;
            const magicNumber = 60;
            if (!f) f = 'linearTween';
            f = Ease[f];
            this.getBody().setKinematic();
            return new Promise(r => {
                let _point = this;
                let startPoint;// = _point.getPosition();
                let endPoint;// = { x, y };
                if (y !== null) {
                    startPoint = _point.getPosition();
                    endPoint = { x, y };
                } else {
                    startPoint = _point.getAngle();
                    endPoint = x;
                }
                let startTime = 0;//new Date();
                let boj = magicNumber * (1 / (PIXICS.worldscale / ratio));
                let moveLength;
                let radian;
                if (y !== null) {
                    moveLength = ksttool.math.get_distance_between_two_point({
                        x: startPoint.x / ratio * boj,
                        y: startPoint.y / ratio * boj,
                    }, {
                        x: endPoint.x / ratio * boj,
                        y: endPoint.y / ratio * boj,
                    }); // 충돌벽 길이
                    radian = ksttool.math.get_angle_in_radian_between_two_points(startPoint, endPoint);
                } else {
                    moveLength = (endPoint - startPoint) * magicNumber;
                }
                let bf = 0;
                pixics.update(function upf(dt) {
                    // console.log(dt);
                    startTime += dt;
                    let currentTime = (startTime / 60) * 1000;//new Date() - startTime;
                    let rat = currentTime / duration;
                    if (rat >= 1) { rat = 1; }
                    let fv = f(rat, 0, 1, 1);
                    let st = (fv - bf)
                    bf = fv;
                    // let cur = ksttool.math.get_coordinate_between_two_points(startPoint, endPoint, fv);
                    if (false) {
                        // _point.setPosition(cur.x, cur.y)
                    } else {
                        if (y !== null) {
                            var rtn = ksttool.math.get_coordinate_distance_away_from_center_with_radian(st * moveLength, startPoint, radian);
                            _point.getBody().setLinearVelocity(planck.Vec2(rtn.x - startPoint.x, startPoint.y - rtn.y))
                        } else {
                            _point.getBody().setAngularVelocity((st * moveLength))
                        }
                    }
                    if (rat === 1) {
                        if (y !== null) {
                            // var rtn = ksttool.math.get_coordinate_distance_away_from_center_with_radian(st * moveLength, startPoint, radian);
                            _point.getBody().setLinearVelocity(planck.Vec2(0, 0))
                            _point.setPosition(x, y);
                        } else {
                            _point.getBody().setAngularVelocity(0)
                            _point.setAngle(x);
                        }
                        // if (y !== null) {
                        //     _point.setPosition(x, y);
                        // } else {
                        //     _point.setAngle(x);
                        // }
                        pixics.unupdate(upf);
                        r();
                    }
                });
            })
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
                let aa = b.contact.getFixtureA().getBody();
                let bb = b.contact.getFixtureB().getBody();
                contactList.push(aa, bb);
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
        setActive(v) { this.getBody().setActive(v); }
        isActive() { return this.getBody().isActive(); }
        setAwake(v) { this.getBody().setAwake(v); }
        isAwake() { return this.getBody().isAwake(); }
        setStatic() { this.getBody().setStatic(); } // dynamic의 반대
        isStatic() { return this.getBody().isStatic(); }
    }
    //------------------------------
    // 매 프레임마다 물리연산을 해서 나오는 수치를 픽시 그래픽요소의 상태에 반영
    let updateList = new Map();
    let timeoutList = new Map();
    let registUpdate = world => {
        point.tickplay = true;
        let tick_accumulator;
        PIXI.Ticker.shared.add(dt => {
            if (!point.tickplay) return;
/*Deboucing*/{ if (tick_accumulator === undefined) { tick_accumulator = 0; }; tick_accumulator += dt; if (tick_accumulator >= 1) { tick_accumulator = tick_accumulator - 1; } else { return; } };
            world.step(1 / 60);
            world.clearForces();
            for (let body = world.getBodyList(); body; body = body.getNext()) {
                body.getUserData()?.syncState();
            }
            {
                let it = updateList.keys();
                while (true) {
                    let { value, done } = it.next();
                    if (done) break;
                    value(1);
                }
            }
            {
                let it = timeoutList.keys();
                while (true) {
                    let { value, done } = it.next();
                    if (done) break;
                    let to = timeoutList.get(value);
                    to.time -= 1;
                    if (to.time <= 0) {
                        timeoutList.delete(value);
                        value();
                    }
                }
            }
        });
    }

    let point = {
        worldscale: 0, PhysicsGraphics,
        transScale(v) { return v / PIXICS.worldscale; },
        createWorld(scale, ratio, gravity) {
            scale *= ratio;
            point.ratio = ratio;
            point.worldscale = scale;
            let world = new planck.World(gravity);
            registUpdate(world);
            point.pixics = {
                world,
                worldscale: scale,
                setPlay() {
                    point.tickplay = !point.tickplay;
                },
                update: function (cb) {
                    updateList.set(cb);
                },
                unupdate: function (cb) {
                    updateList.delete(cb);
                },
                setTimeout(cb, time) {
                    timeoutList.set(cb, { time: (time / 1000) * 60 });
                },
                sleep(time) {
                    return new Promise(r => {
                        this.setTimeout(r, time);
                    });
                }
            };
            return point.pixics;
        }
    };
    return point;
})();
