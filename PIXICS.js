const PIXICS = (() => {
    class PhysicsGraphics {
        constructor({ world }) {
            this.world = world;
            this.graphic = new PIXI.Graphics();
            this.planckBody = world.createBody();
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
            dd.x *= PIXICS.worldscale;
            dd.y *= PIXICS.worldscale;
            dd.y *= -1;
            return dd;
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
            this.planckBody = this.world.createBody();
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

            // 접해있던것 깨우기
            contactList.forEach(contact => contact.setAwake(true));
        }
    }
    class Shape extends PIXI.Graphics {
        constructor({ world, x, y }) {
            super();
            this.world = world;
            this.planckBody = world.createBody();
            this.planckBody.setGravityScale(1);
            this.planckBody.setUserData(this);
            this.planckBody.setMassData({ mass: 1, center: planck.Vec2(0, 0), I: 1 });
            this.setPosition(x, y);
        }
        syncState() {
            this.rotation = -this.planckBody.getAngle();
            let bodyPosition = this.planckBody.getPosition();
            this.x = bodyPosition.x * PIXICS.worldscale;
            this.y = -bodyPosition.y * PIXICS.worldscale;
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
            dd.x *= PIXICS.worldscale;
            dd.y *= PIXICS.worldscale;
            dd.y *= -1;
            return dd;
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
        setDensity(value) {
            let fixture = this.planckBody.getFixtureList();
            fixture && fixture.setDensity(value);
            this.resetBodyAndFixtures();
        }
        getDensity() {
            let fixture = this.planckBody.getFixtureList();
            return fixture && fixture.getDensity();
        }
        setFriction(value) {
            let fixture = this.planckBody.getFixtureList();
            fixture && fixture.setFriction(value);
        }
        getFriction() {
            let fixture = this.planckBody.getFixtureList();
            return fixture && fixture.getFriction();
        }
        setRestitution(value) {
            let fixture = this.planckBody.getFixtureList();
            fixture && fixture.setRestitution(value);
        }
        getRestitution() {
            let fixture = this.planckBody.getFixtureList();
            return fixture && fixture.getRestitution();
        }
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
            let angle = this.getAngle();
            let fixture = this.planckBody.getFixtureList();
            let shape = _shape ? _shape : fixture.getShape();
            let restitution = fixture?.getRestitution();
            let friction = fixture?.getFriction();
            let density = fixture?.getDensity();
            density = density ? density : 1;

            // 접해있는것의 목록을 담기
            let contactList = [];
            for (let b = this.planckBody.getContactList(); b; b = b.next) {
                let a = b.contact.getFixtureA().getBody();
                let b = b.contact.getFixtureB().getBody();
                contactList.push(a, b);
            }

            // 픽스쳐와 바디를 제거한다
            fixture && this.planckBody.destroyFixture(fixture);
            this.planckBody.getWorld().destroyBody(this.planckBody);

            // 바디를 재생성 및 값 복원
            this.planckBody = this.world.createBody();
            this.planckBody.setGravityScale(gravityScale);
            this.planckBody.setUserData(this);
            this.planckBody.setMassData({ mass: 1, center: planck.Vec2(0, 0), I: 1 });

            // 픽스쳐 재생성 및 값 복원
            fixture = this.planckBody.createFixture(shape);
            fixture.setRestitution(restitution || 0);
            fixture.setFriction(friction || 0);
            fixture.setDensity(density || 0);

            // 바디 상태값 재조정
            this.setPosition(x, y);
            this.setAngle(angle);

            // 다이나믹상태 복원
            dynamic && this.planckBody.setDynamic();

            // 접해있던것 깨우기
            contactList.forEach(contact => contact.setAwake(true));
        }
    }
    class Rect extends Shape {
        constructor({ world, width, height, x, y }) {
            super({ world, x, y });
            this.setSize(width, height);
        }
        setSize(width, height) {
            if (width === undefined || height === undefined) return;
            this.clear();
            this.beginFill(0xffffff);
            this.drawRect(0, 0, width, height);
            this.endFill();
            this.pivot.set(this.width / 2, this.height / 2)
            if (this.planckBody) {
                let shape = planck.Box(this.width / 2 / PIXICS.worldscale, this.height / 2 / PIXICS.worldscale);
                this.resetBodyAndFixtures(shape);
            }
        }
        addRevoluteJoint(bar, x, y, pivotx, pivoty) {
            //-----------------------
            let fix = this;
            let newone_width = bar.width;
            let newone_height = bar.height;
            let barx = -(fix.width / 2);
            let bary = -(fix.height / 2);
            //----------
            barx += x; // fix상에서의 x
            bary += y; // fix상에서의 y
            let addx = pivotx; // new의 pivot point
            let addy = pivoty; // new의 pivot point
            //-----------------------
            let extx = 0;
            let exty = 0;
            //-----------------------
            bar.setSize(newone_width, newone_height);
            bar.setPosition(barx + addx, bary + addy);
            //-----------------------
            1 && world.createJoint(planck.RevoluteJoint({
                collideConnected: false,
                // motorSpeed: 1 * Math.PI,
                // maxMotorTorque: 0,
                // enableMotor: true,
            }, fix.getBody(), bar.getBody(), planck.Vec2(
                (barx + extx) / PIXICS.worldscale,
                -(bary + exty) / PIXICS.worldscale)
            ));
            //-----------------------

        }
    }
    class Circle extends Shape {
        constructor({ world, radius, x, y }) {
            super({ world, x, y });
            this.setRadius(radius);
        }
        setRadius(radius) {
            // if (width === undefined || height === undefined) return;
            this.clear();
            this.beginFill(0xffffff);
            this.drawCircle(0, 0, radius / 2);
            this.endFill();
            if (this.planckBody) {
                let shape = planck.Circle(radius / 2 / PIXICS.worldscale, radius / 2 / PIXICS.worldscale);
                this.resetBodyAndFixtures(shape);
            }
        }
    }
    class Polygon extends Shape {
        constructor({ world, path, x, y }) {
            super({ world, x, y });
            this.setPath(path);
        }
        setPath(path) {
            if (path === undefined) return;
            this.clear();
            this.beginFill(0xffffff);
            for (let i = 0; i < path.length; i++) {
                if (i === 0) {
                    this.moveTo((path[i].x), (path[i].y));
                } else {
                    this.lineTo((path[i].x), (path[i].y));
                }
            }
            this.closePath();
            this.endFill();
            this.pivot.set(0, 0)
            if (this.planckBody) {
                let shape = planck.Polygon(path.map(point => {
                    point.x /= PIXICS.worldscale;
                    point.y /= PIXICS.worldscale;
                    point.y *= -1
                    return point;
                }));
                this.resetBodyAndFixtures(shape);
            }
        }
    }
    return {
        worldscale: 20, Rect, Circle, Polygon, PhysicsGraphics,
        transScale(v) { return v / PIXICS.worldscale; }
    };
})();
