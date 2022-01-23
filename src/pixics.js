'use strict';
/* ***********************************************************************
PIXICS Copyright (c) 2022 Seungtae Kim
--------------------------------------------------------------------------
* PIXICS has dependencies on below projects Thanks to those awesome projects
*   - Box2D: https://github.com/erincatto/box2d
*   - PixiJS: https://github.com/pixijs/pixijs
*   - box2d.ts (A TypeScript port of Box2D): https://github.com/flyover/box2d.ts
************************************************************************** */
const pixiInst = function () {
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
    const INACTIVE = Symbol.for('INACTIVE' + makeid(64));
    const DRAWINGPROFILE = Symbol.for('DRAWINGPROFILE' + makeid(64));
    class Assert {
        static use = true;
        static validate(v, cb) {
            if (cb() !== true) throw new Error(v);
        }
    }
    const Ease = {
        easeOutElastic: (t, b, c, d) => { var s = 1.70158; var p = 0; var a = c; if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3; if (a < Math.abs(c)) { a = c; var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a); return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b; },
        linearTween: (t, b, c, d) => { return c * t / d + b; },// simple linear tweening - no easing, no acceleration
        easeInQuad: (t, b, c, d) => { t /= d; return c * t * t + b; },// quadratic easing in - accelerating from zero velocity
        easeOutQuad: (t, b, c, d) => { t /= d; return -c * t * (t - 2) + b; },// quadratic easing out - decelerating to zero velocity
        easeInOutQuad: (t, b, c, d) => { t /= d / 2; if (t < 1) return c / 2 * t * t + b; t--; return -c / 2 * (t * (t - 2) - 1) + b; },// quadratic easing in/out - acceleration until halfway, then deceleration
        easeInCubic: (t, b, c, d) => { t /= d; return c * t * t * t + b; },// cubic easing in - accelerating from zero velocity
        easeOutCubic: (t, b, c, d) => { t /= d; t--; return c * (t * t * t + 1) + b; },// cubic easing out - decelerating to zero velocity
        easeInOutCubic: (t, b, c, d) => { t /= d / 2; if (t < 1) return c / 2 * t * t * t + b; t -= 2; return c / 2 * (t * t * t + 2) + b; },// cubic easing in/out - acceleration until halfway, then deceleration
        easeInQuart: (t, b, c, d) => { t /= d; return c * t * t * t * t + b; },// quartic easing in - accelerating from zero velocity
        easeOutQuart: (t, b, c, d) => { t /= d; t--; return -c * (t * t * t * t - 1) + b; },// quartic easing out - decelerating to zero velocity
        easeInOutQuart: (t, b, c, d) => { t /= d / 2; if (t < 1) return c / 2 * t * t * t * t + b; t -= 2; return -c / 2 * (t * t * t * t - 2) + b; },// quartic easing in/out - acceleration until halfway, then deceleration
        easeInQuint: (t, b, c, d) => { t /= d; return c * t * t * t * t * t + b; },// quintic easing in - accelerating from zero velocity
        easeOutQuint: (t, b, c, d) => { t /= d; t--; return c * (t * t * t * t * t + 1) + b; },// quintic easing out - decelerating to zero velocity
        easeInOutQuint: (t, b, c, d) => { t /= d / 2; if (t < 1) return c / 2 * t * t * t * t * t + b; t -= 2; return c / 2 * (t * t * t * t * t + 2) + b; },// quintic easing in/out - acceleration until halfway, then deceleration
        easeInSine: (t, b, c, d) => { return -c * Math.cos(t / d * (Math.PI / 2)) + c + b; },// sinusoidal easing in - accelerating from zero velocity
        easeOutSine: (t, b, c, d) => { return c * Math.sin(t / d * (Math.PI / 2)) + b; },// sinusoidal easing out - decelerating to zero velocity
        easeInOutSine: (t, b, c, d) => { return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b; },// sinusoidal easing in/out - accelerating until halfway, then decelerating
        easeInExpo: (t, b, c, d) => { return c * Math.pow(2, 10 * (t / d - 1)) + b; },// exponential easing in - accelerating from zero velocity
        easeOutExpo: (t, b, c, d) => { return c * (-Math.pow(2, -10 * t / d) + 1) + b; },// exponential easing out - decelerating to zero velocity
        easeInOutExpo: (t, b, c, d) => { t /= d / 2;; if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;; t--;; return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;; },// exponential easing in/out - accelerating until halfway, then decelerating
        easeInCirc: (t, b, c, d) => { ; t /= d;; return -c * (Math.sqrt(1 - t * t) - 1) + b;; },// circular easing in - accelerating from zero velocity
        easeOutCirc: (t, b, c, d) => { ; t /= d;; t--;; return c * Math.sqrt(1 - t * t) + b;; },// circular easing out - decelerating to zero velocity
        easeInOutCirc: (t, b, c, d) => { t /= d / 2; if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b; t -= 2; return c / 2 * (Math.sqrt(1 - t * t) + 1) + b; }// circular easing in/out - acceleration until halfway, then deceleration
    };
    const math = {
        BIGNUMBER: 999999999999999,
        EPSILON: 0.0000001,
        get_angle_in_radian_between_two_points(point1, point2) {
            /*
               점과 점사이의 각도를 radian 으로 리턴해줍니다.
            */
            return Math.atan2(point1.y - point2.y, point1.x - point2.x);
        },
        get_distance_between_two_point(point1, point2) {
            /*
               점과 점사이의 거리를 구합니다.
            */
            var a = point1.x - point2.x;
            var b = point1.y - point2.y;
            return Math.sqrt(a * a + b * b); // Math.hypot() 를 쓰면 a*a 이 아니라 a 라고 해주면 된다. https://msdn.microsoft.com/ko-kr/library/dn858234(v=vs.94).aspx
        },
        get_coordinate_distance_away_from_center_with_radian(distance, center_coordinate, angle) {
            /*
               지정한 좌표로부터 지정한 거리만큼 지정한 각도로 떨어져있는 지점의 좌표를 반환한다
             */
            angle += Math.PI;
            return {
                x: center_coordinate.x + Math.cos(angle) * distance,
                y: center_coordinate.y + Math.sin(angle) * distance
            };
        }
    }
    const typeChecker = {
        isNumber() {
            let cnt = 0;
            for (let i = 0; i < arguments.length; i++) {
                let n = arguments[i];
                if (n.constructor === Number && !Number.isNaN(n)) {
                    cnt++;
                }
            }
            return cnt === arguments.length;
        }
    };
    const PIXICS = (() => {
        function updateManage(cb, resolve, removeUpdate, cnt, queue) {
            cb[Symbol.for('resolver')] = resolve;
            cb[Symbol.for('removeUpdate')] = removeUpdate;
            if (cnt !== undefined) cb[Symbol.for('timecount')] = cnt;
            queue.set(cb);
        }
        function updateRemoveManage(cb, queue, response) {
            if (!queue.has(cb)) return;
            queue.delete(cb);
            cb[Symbol.for('resolver')](response);
        }
        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
        }
        const instanceId = makeid(8);
        let PLANCKMODE;// = !true;
        let actual_display;
        const magicNumber = 60;
        function makeGraphic(center) {
            function drawPolygon(gr, path, color, alpha) {
                gr.beginFill(color, alpha);
                path.forEach((dot, i) => {
                    if (i === 0) {
                        gr.moveTo((dot.x), -(dot.y));
                    } else {
                        gr.lineTo((dot.x), -(dot.y));
                    }
                });
                gr.closePath();
                gr.endFill();
            }
            function drawCircle(gr, x, y, radius, color, alpha) {
                // width = width * 2;
                // height = height * 2;
                gr.beginFill(color, alpha);
                gr.drawCircle(x, -y, radius);
                gr.endFill();
            }
            function internalRectDrawer(gr, x, y, width, height, color, alpha) {
                // width = width * 2;
                // height = height * 2;
                gr.beginFill(color, alpha);
                gr.drawRect(x - width, -y - height, width * 2, height * 2); // 픽시꺼.
                gr.endFill();
            }
            let gr = new PIXI.Graphics();
            // app.stage.addChild(gr);

            let centroid = { x: 0, y: 0 };
            function GetLocalCenter() {
                return centroid;
            }
            function SetLocalCenter(xx, yy) {
                let gr = point;
                centroid.x = xx;
                centroid.y = yy;
                let pp = { ...gr.GetLocalCenter() };
                pp.y = -pp.y;
                let radian = math.get_angle_in_radian_between_two_points(pp, { x: 0, y: 0 });
                let leng = -(math.get_distance_between_two_point({ x: 0, y: 0 }, pp));
                let rr = radian - gr.GetAngle();
                let pont = math.get_coordinate_distance_away_from_center_with_radian(leng, { x: 0, y: 0 }, rr)
                gr.gr.pivot.x = pp.x;
                gr.gr.pivot.y = pp.y;
                gr.gr.x = center.x + pont.x + position.x
                gr.gr.y = center.y + pont.y + -position.y

            }
            function SetAngle(angle) {
                gr.rotation = -angle;//-1.57
            }
            function GetAngle() {
                return -gr.rotation;
            }
            function GetPosition() {
                let gr = point;
                let pp = { ...gr.GetLocalCenter() };
                pp.y = -pp.y;
                let radian = math.get_angle_in_radian_between_two_points(pp, { x: 0, y: 0 });
                let leng = -(math.get_distance_between_two_point({ x: 0, y: 0 }, pp));
                let rr = radian - gr.GetAngle();
                let pont = math.get_coordinate_distance_away_from_center_with_radian(leng, { x: 0, y: 0 }, rr)
                let pos = { x: gr.gr.x, y: gr.gr.y };//gr.GetPosition();
                pos.x -= center.x + pont.x;
                pos.y -= center.y + pont.y;
                pos.y = -pos.y;
                return pos;
            }
            let position = { x: 0, y: 0 };
            function SetPosition(xx, yy) {
                position.x = xx;
                position.y = yy;
                let gr = point;
                let pp = { ...gr.GetLocalCenter() };
                pp.y = -pp.y;
                let radian = math.get_angle_in_radian_between_two_points(pp, { x: 0, y: 0 });
                let leng = -(math.get_distance_between_two_point({ x: 0, y: 0 }, pp));
                let rr = radian - gr.GetAngle();
                let pont = math.get_coordinate_distance_away_from_center_with_radian(leng, { x: 0, y: 0 }, rr)
                gr.gr.x = center.x + pont.x + xx;
                gr.gr.y = center.y + pont.y + -yy;
            }
            let point = {
                gr,
                body: gr,
                SetPosition,
                GetPosition,
                SetLocalCenter,
                GetLocalCenter,
                SetAngle,
                GetAngle,
                drawingRectangle(x, y, width, height, color, alpha) {
                    internalRectDrawer(gr, x, y, width, height, color, alpha);
                },
                drawCircle(x, y, radius, color, alpha) {
                    drawCircle(gr, x, y, radius, color, alpha);
                },
                drawPolygon(path, color, alpha) {
                    drawPolygon(gr, path, color, alpha);
                }
            };
            SetPosition(0, 0);
            return point;
        }

        let center = { x: 0, y: 0 };
        class Rectangle extends PIXI.Sprite {
            constructor() {
                //PIXI.Texture.WHITE
                const texture = PIXI.Texture.from('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=');
                super(texture);
            }
        }
        class Line extends Rectangle {
            spec = {}
            constructor() {
                super();
                this.anchor.y = 0.5;
                this.axis = 0.5;
                this.thickness = 1;
            }
            set thickness(v) { this.height = v; }
            get thickness() { return this.height; }
            set axis(v) { this.anchor.x = v; }
            get axis() { return this.anchor.x; }
            set ax(v) { this.spec.ax = v; this.calcpos(); }
            get ax() { return this.spec.ax ?? 0; }
            set ay(v) { this.spec.ay = v; this.calcpos(); }
            get ay() { return this.spec.ay ?? 0; }
            set bx(v) { this.spec.bx = v; this.calcpos(); }
            get bx() { return this.spec.bx ?? 0; }
            set by(v) { this.spec.by = v; this.calcpos(); }
            get by() { return this.spec.by ?? 0; }
            get length() {
                let a = this.ax - this.bx;
                let b = this.ay - this.by;
                return Math.sqrt(a * a + b * b);
            }
            calcpos() {
                this.width = this.length;
                this.x = this.bx - ((this.bx - this.ax) * (1 - this.anchor.x));
                this.y = this.by - ((this.by - this.ay) * (1 - this.anchor.x));
                this.rotation = Math.atan2(this.by - this.ay, this.bx - this.ax);
            }
        }
        class ObjectPool {
            pool = new Map();
            static resting = Symbol.for('resting');
            constructor(arr) {
                if (arr) this.pool = [];
            }
            addOne(ob) {
                if (this.isDataMap()) {
                    this.pool.set(ob);
                } else {
                    this.pool.push(ob);
                }
            }
            pickOne() {
                if (!this.getSize()) return;
                let val;
                if (this.isDataMap()) {
                    val = this.pool.keys().next().value;
                    if (val) this.pool.delete(val);
                } else {
                    val = this.pool.splice(0, 1)[0];
                }
                return val;
            }
            getSize() {
                return this.isDataMap() ? this.pool.size : this.pool.length;
            }
            isDataMap() {
                return (this.pool).constructor === Map;
            }
            get(construct, init) {
                let ob;
                if (this.getSize()) {
                    ob = this.pickOne();//pool.splice(0, 1)[0];
                    if (!ob[ObjectPool.resting]) throw new Error('에러..');
                }
                if (!ob) {
                    ob = construct();
                    ob[ObjectPool.resting] = true;
                }
                if (!ob[ObjectPool.resting]) throw new Error('에러..');
                ob[ObjectPool.resting] = false;
                if (ob instanceof PIXICS.PhysicsGraphics) {
                    ob.setActive(true);
                }
                init && init(ob);
                return ob;
            }
            put(ob, init) {
                if (ob[ObjectPool.resting]) return false;
                ob[ObjectPool.resting] = true;
                if (ob instanceof PIXICS.PhysicsGraphics) {
                    if (!ob.isActive()) throw new Error('에러..');
                    ob.setActive(false);
                }
                init && init(ob);
                this.addOne(ob);
                return true;
            }
            truncate() {
                while (this.getSize()) {
                    let ob = this.pickOne();//.pool.splice(0, 1)[0];
                    if (ob instanceof PIXICS.PhysicsGraphics) {
                        ob.destroy();
                    }
                }
            }
            static memoryMonitor(width) {
                const { ratio } = point;
                let speedMeter = new PIXI.Text('', { fontFamily: 'Arial', fontSize: 40 * ratio, fill: 0xffffff, align: 'center' });
                let list = [];
                setInterval(() => {
                    list.push(performance.memory.usedJSHeapSize);
                    list.length > 100 && list.splice(0, 1)
                    speedMeter.text = `${Math.round(Math.min(...list) / 1024 / 1024)}`
                    speedMeter.x = (width - speedMeter.width) / 2;
                    speedMeter.y = speedMeter.height;
                }, 10);
                return speedMeter;
            }
        }
        class PhysicsGraphics {
            fixtureMapCache = new Map();
            fixtureCache = Object.freeze([]);
            activeState = {};
            resistanceFn = null;
            stickState = new Map();
            contacts = new Map();
            ignoreContact = new Map();
            interactiveEvents = {};//new Map();
            kinematicMotionMove = new Map();
            kinematicMotionRotate = new Map();
            tag = null;
            preCallbackQueueMode = false;
            preCallbackQueue = [];
            updateQueue = new Map();
            constructor({ world }) {
                this.world = world;
                this.graphic = makeGraphic(center);//new PIXI.Graphics();
                this.setContactable(true);
                if (PLANCKMODE) {
                    this.planckBody = world.createBody({
                        bullet: false,
                    });
                    this.planckBody.setGravityScale(1);
                    this.planckBody.setUserData(this);
                    this.planckBody.setMassData({ mass: 1, center: planck.Vec2(0, 0), I: 1 });
                } else {
                    //파괴

                    const bodyDef = new b2.BodyDef();
                    bodyDef.allowSleeping = true;
                    this.planckBody = world.CreateBody(bodyDef);
                    this.planckBody.SetGravityScale(1);
                    this.planckBody.SetUserData(this);
                    const massData = new b2.MassData();
                    massData.mass = 1.0;
                    massData.center.x = 0;//.5 * shape.m_vertex1.x + shape.m_vertex2.x;
                    massData.center.y = 0;//.5 * shape.m_vertex1.y + shape.m_vertex2.y;
                    massData.I = 1.0;
                    this.planckBody.SetMassData(massData);
                }
            }
            getPinGravities() {
                if (!this.pinGravity) return [];
                return [...this.pinGravity.keys()];
            }
            remPinGravity(pin) {
                if (this.pinGravity) {
                    this.pinGravity.delete(pin);
                }
            }
            setPinGravity(pin) {
                if (!this.pinGravity) {
                    this.pinGravity = new Map();
                    this.setUpdate(() => this.applyForceByPinGravities());
                }

                if (pin.constructor !== Array) pin = [pin];
                pin.forEach(pin => {
                    this.pinGravity.set(pin);
                    // if (!this.pinUpdateGravity) {
                    //     this.pinUpdateGravity = () => this.applyForceByPinGravities();
                    // }
                })
            }
            applyForceByPinGravities() {
                this.getPinGravities().forEach(pin => {
                    // console.log('1')
                    this.applyForceByPinGravity(pin);
                });
            }
            applyForceByPinGravity(pin) {
                let { force, pos } = pin;
                let body = this.getBody();
                let position = body.GetPosition();
                // let force = 1;
                if (pos.constructor === PIXICS.PhysicsGraphics) {
                    pos = pos.getPosition()
                } else if (pos.constructor === Function) {
                    pos = pos()
                }
                //getCenter
                let npin = new b2.Vec2(pos.x / PIXICS.worldscale, pos.y / PIXICS.worldscale);
                let d = b2.Vec2.SubVV(npin, position, new b2.Vec2());
                if (d.LengthSquared() < b2.epsilon_sq) return;
                d.Normalize();
                body.ApplyForce(b2.Vec2.MulSV(force, d, new b2.Vec2()), position);
            }
            setContactable(mode) {
                /*
                    contactable 값은 다음 함수의 작동에 영향을 준다
                    이 값이 거짓이면 다음 함수들의 작동 상 거짓인 자료는 없는 셈 치게된다
                        - getContactCount
                        - getContactList
                        - getRelations
                        - isRelatedTo
                */
                this.contactable = mode;
            }
            getContactable() {
                return this.contactable;
            }
            isUpdating(f) {
                return this.updateQueue.has(f);
            }
            async setUpdate(cb, cnt) {
                if (this.updateQueue.has(cb)) return;
                return await new Promise(resolve => {
                    updateManage(cb, resolve, r => this.remUpdate(cb, r), cnt, this.updateQueue);
                });
            }
            remUpdate(cb, response) {
                updateRemoveManage(cb, this.updateQueue, response);
            }
            remAllUpdate() {
                let keys = this.updateQueue.keys();
                while (true) {
                    let val = keys.next();
                    if (val.done) break;
                    this.remUpdate(val.value);
                }
            }
            setTag(v) {
                this.tag = v;
            }
            getTag() {
                return this.tag;
            }
            isRelatedTo(checkBody) {
                return this.getRelations(checkBody);
            }
            getRelations(checkBody) {
                let body = this;
                if (checkBody && checkBody === body) return true;
                let done = new Map();
                let task = new Map();
                // let list = new Map();
                task.set(body);
                while (true) {
                    let first = task.keys().next();
                    let body = first.value;
                    if (!body || first.done) break;
                    // !list.has(body) && list.set(body);
                    let contacts = body.getContactList();
                    for (let i = 0; i < contacts.length; i++) {
                        let _body = contacts[i];//.GetUserData();
                        if (checkBody && checkBody === _body) return true;
                        if (!task.has(_body) && !done.has(_body)) task.set(_body)
                    }
                    task.delete(body);
                    done.set(body);
                }
                if (checkBody) {
                    return false;
                } else {
                    done.delete(body);
                    return [...done.keys()];
                }
            }
            getContactCount() {
                //oK
                return this.getContactList().length;
            }
            addIgnoreContact(body) {
                this.ignoreContact.set(body, true);
            }
            removeIgnoreContact(body) {
                this.ignoreContact.delete(body);
            }
            getIgnoreContacts() {
                return this.ignoreContact;
            }
            setContactState(body, mode) {
                // if (!force) {
                //     if (!this.getContactable() || !body.getContactable()) return;
                // }
                if (this.ignoreContact.has(body)) return;
                if (mode) {
                    if (!this.contacts.has(body)) {
                        this.contacts.set(body, mode);
                        let cb = this.getCBFunc(body, 'contact');
                        if (this.preCallbackQueueMode) {
                            cb && cb(body)
                        } else {
                            cb && this.preCallbackQueue.push([cb, body]);
                        }
                    }
                } else {
                    if (this.contacts.has(body)) {
                        this.contacts.delete(body);
                        let cb = this.getCBFunc(body, 'untact');
                        if (this.preCallbackQueueMode) {
                            cb && cb(body)
                        } else {
                            cb && this.preCallbackQueue.push([cb, body]);
                        }
                    }
                }
            }
            getCBFunc(boundary, mode) {
                let dt = this.stickState.get(boundary);
                return dt?.cbs[mode]?.cbf
            }
            removeEvent(mode, boundary, otherside) {
                if (!boundary) {
                    if (mode.constructor === String) mode = [mode];
                    mode.forEach(mode => {
                        let cb = this.interactiveEvents[mode];
                        if (!cb) return;
                        this.getGraphic().off(mode, cb)
                        delete this.interactiveEvents[mode];
                    });
                    if (Object.keys(this.interactiveEvents).length === 0) {
                        this.getGraphic().interactive = false;
                    }
                }
                else if (boundary instanceof PhysicsGraphics) {
                    !otherside && boundary.removeEvent(mode, this, true);
                    let dt = this.stickState.get(boundary);
                    if (!dt) return;
                    delete dt.cbs[mode];
                    if (Object.keys(dt.cbs).length === 0) {
                        this.stickState.delete(boundary)
                    }
                }
            }
            emitEvent(mode) {
                if (mode.constructor === String) mode = [mode];
                const historyMap = new Map();
                mode.forEach(mode => {
                    let cb = this.interactiveEvents[mode];
                    if (!cb || historyMap.has(cb)) return;
                    historyMap.set(cb);
                    this.getGraphic().emit(mode);
                });
            }
            touch() {

            }
            removeAllEvent() {
                this.removeAllContactEvent();
                this.removeAllInteractionEvent();
            }
            removeAllInteractionEvent() {
                Object.keys(this.interactiveEvents).forEach(mode => {
                    this.removeEvent(mode);
                });
            }
            removeAllContactEvent() {
                let task = [];
                [...this.stickState.keys()].forEach(boundary => {
                    Object.keys(this.stickState.get(boundary).cbs).forEach(mode => {
                        task.push([mode, boundary]);
                    });
                });
                while (task.length) {
                    let [mode, boundary] = task.splice(0, 1)[0];
                    this.removeEvent(mode, boundary);
                }
            }
            isContactEventTo(mode, boundary) {
                try { if (this.stickState.get(boundary).cbs[mode]) return true; } catch (e) { }
                try { if (boundary.stickState.get(this).cbs[mode]) return true; } catch (e) { }
                return false;
            }
            addEvent(mode, boundary, cbf) {
                if (boundary instanceof Function) {
                    if (mode.constructor === String) mode = [mode];
                    mode.forEach(mode => {
                        this.removeEvent(mode);
                        this.getGraphic().interactive = true;
                        this.interactiveEvents[mode] = boundary;
                        this.getGraphic().on(mode, boundary)
                    });
                }
                else if (boundary instanceof PhysicsGraphics) {
                    boundary.removeEvent(mode, this);
                    let dt = this.stickState.get(boundary);
                    if (dt) { } else {
                        dt = { body: boundary, prevstate: false, cbs: {} };
                        this.stickState.set(boundary, dt);
                    };
                    dt.cbs[mode] = { cbf }
                }
            }
            getContactList(mode) {
                /*
                oK
                이 함수는 this.getBody().GetContactList 의 문제를 보완해서 만든 함수이다
                this.getBody().GetContactList 이 함수는 좀 오작동을 하는것으로 보이니 쓰지 말도록하자
                mode 를 true로 하면 contactable 하지 않은것도 포함시켜준다
                */
                //getContactable
                let lss = [...this.contacts.keys()];
                if (!mode) lss = lss.filter(a => a.getContactable());
                // if (mode) lss = lss.map(a => a.getBody());
                return lss;
            }
            easingTo(x, y, d, f) {
                Assert.use && Assert.validate('easingTo::다이나믹 멈춰!', () => this.isDynamic() === false);
                Assert.use && Assert.validate('easingTo::숫자..', () => typeChecker.isNumber(x, d));
                Assert.use && Assert.validate('easingTo::타입...', () => !(y !== null && !typeChecker.isNumber(y)));
                // if (!typeChecker.isNumber(x, d)) throw 'adsfuih';
                // if (y !== null && !typeChecker.isNumber(y)) throw 'weirouh';
                if (!f) f = 'linearTween';
                f = Ease[f];
                const _point = this;
                // const pixics = point.pixics;
                let max = y !== null ? getMovableMaxDistancePerFrame() : Math.PI / 2;
                let ticktime = (1 / magicNumber) * 1000;
                let startPoint;// = this.getPosition();
                let endPoint;// = { x, y };
                let radian;
                let moveLength;
                if (y !== null) {
                    startPoint = this.getPosition();
                    startPoint.y *= -1;
                    endPoint = { x, y };
                    radian = math.get_angle_in_radian_between_two_points(startPoint, endPoint); // 엘라스틱에서 신경쓰자.
                    moveLength = math.get_distance_between_two_point(startPoint, endPoint);
                } else {
                    startPoint = this.getAngle();
                    endPoint = x;
                    moveLength = (endPoint - startPoint);// * magicNumber;
                }

                let rotateMode = y === null;
                if (rotateMode && this.kinematicMotionRotate.size) return;
                if (!rotateMode && this.kinematicMotionMove.size) return;

                let acc = 0;
                let dist = 0;
                let whole = 0;
                let tasks = [];
                while (true) {
                    acc += ticktime;
                    if (acc > d) break;
                    evt(ticktime);
                }
                let nam = ticktime - (acc - d);
                if (nam > Number.EPSILON * 100000000) {
                    acc += nam;
                    acc -= ticktime;
                    evt(nam);
                }
                function evt(tick, ignoref) {
                    let ratio = acc / d;
                    let curf = !ignoref ? f(ratio, 0, 1, 1) : ratio;
                    let cha = curf - dist;
                    dist = curf;
                    whole += cha;
                    tasks.push(cha * moveLength);
                }
                if (tasks.filter(n => n > max).length) {
                    acc = 0;
                    dist = 0;
                    tasks = [];
                    while (true) {
                        acc += max;
                        if (acc > moveLength) break;
                        tasks.push(acc - dist);
                        dist = acc
                    }
                    let nam = max - (acc - moveLength);
                    if (nam > Number.EPSILON * 100000000) {
                        acc += nam;
                        acc -= max;
                        tasks.push(acc - dist);
                        dist = acc
                    }
                }
                let staticMode = this.isStatic();
                class SeqPromise extends Promise {
                    running = true;
                    drop = false;
                    constructor(cb, dd) {
                        super(cb.bind(dd));
                    }
                    pause() { this.running = false; }
                    play() { this.running = !false; }
                    abort() {
                        this.drop = true;
                        return this;
                    }
                    stopMotion(setDestination, resolver, firstValue, startT) {
                        if (!rotateMode) {
                            _point.getBody().SetLinearVelocity(new b2.Vec2(0, 0))
                        } else {
                            _point.getBody().SetAngularVelocity(0)
                        }
                        if (!resolver) return;
                        if (!rotateMode && setDestination) _point.setPosition(x, -y);
                        if (rotateMode && setDestination) _point.setAngle(x);
                        let currentValue = rotateMode ? _point.getAngle() : _point.getPosition();
                        let difference = rotateMode ? currentValue - firstValue : math.get_distance_between_two_point(firstValue, currentValue);
                        this.abort();
                        // if (rotateMode) _point.easingStateRotate = !true;
                        // if (!rotateMode) _point.easingStateMove = !true;
                        getKinematicMotionMap().delete(motionInst);
                        resolver({
                            difference,
                            values: [firstValue, currentValue],
                            duration: new Date() - startT
                        });
                    }
                }
                function clearPrm() {
                    prm.abort();
                    let naturalEnd = tasks[cnt] === undefined;
                    let abortingEnd = prm.drop;
                    if (abortingEnd || naturalEnd) {
                        return prm.stopMotion(naturalEnd, callback[Symbol.for('resolver')], firstValue, startT);
                    }
                }
                function getKinematicMotionMap() {
                    return rotateMode ? _point.kinematicMotionRotate : _point.kinematicMotionMove;
                }
                function callback(deltatime, resolver, accumulator) {
                    if (!prm.running) return prm.stopMotion();
                    let naturalEnd = tasks[cnt] === undefined;
                    let abortingEnd = prm.drop;
                    if (abortingEnd || naturalEnd) return prm.stopMotion(naturalEnd, resolver, firstValue, startT);
                    let distanceToMoveOnThisTick = tasks[cnt];
                    let currentRatio = tasks[cnt] / moveLength;
                    if (!rotateMode) {
                        let _startPoint = _point.getPosition();
                        _startPoint.y_ = _startPoint.y;
                        _startPoint.y *= -1;
                        if (!staticMode) {
                            let s = getVelocityPerFrame(distanceToMoveOnThisTick);
                            let rtn = math.get_coordinate_distance_away_from_center_with_radian(s, _startPoint, radian);
                            _point.getBody().SetLinearVelocity(new b2.Vec2(rtn.x - _startPoint.x, _startPoint.y - rtn.y))
                        } else {
                            let chx = -(firstValue.x - endPoint.x) * currentRatio;
                            let chy = (firstValue.y * -1 - endPoint.y) * currentRatio;
                            _point.setPosition(_startPoint.x + chx, _startPoint.y_ + chy)
                        }
                    } else {
                        staticMode && _point.setAngle(_point.getAngle() + tasks[cnt])
                        !staticMode && _point.getBody().SetAngularVelocity(distanceToMoveOnThisTick * magicNumber)
                    }
                    cnt++;
                };
                let cnt = 0;
                let startT = new Date();
                let firstValue = rotateMode ? _point.getAngle() : _point.getPosition();
                const prm = new SeqPromise(async function (resolver, stop) {
                    resolver(await this);
                }, _point.setUpdate(callback));
                let motionInst = { clearPrm };
                getKinematicMotionMap().set(motionInst);
                return prm;
            }
            rotateEaseBy(x, duration, f) {
                let startPoint = this.getAngle();
                return this.rotateEaseTo(startPoint + x, duration, f);
            }
            moveEaseBy(x, y, duration, f) {
                let startPoint = this.getPosition();
                startPoint.y *= -1;
                return this.moveEaseTo(startPoint.x + x, startPoint.y + y, duration, f);
            }
            moveBy(x, y, duration, f) {
                let startPoint = this.getPosition();
                startPoint.y *= -1;
                return this.moveEaseTo(startPoint.x + x, startPoint.y + y, duration, f);
            }
            rotateEaseTo(x, duration, f) {
                return this.easingTo(x, null, duration, f);
            }
            moveEaseTo(x, y, duration, f) {
                return this.easingTo(x, y, duration, f);
            }
            moveTo(x, y, duration, f) {
                return this.easingTo(x, y, duration, f);
            }
            getGraphic() {
                return this.graphic.body;
            }
            drawJSON({ scale, json }) {
                let data = json;
                let ratio = point.ratio;
                let butter = this;
                data.layers.forEach(layer => {
                    let class_ = layer.class;
                    let { restitution, density, friction } = layer;
                    let color = Number('0x' + layer.color);
                    let fixture;
                    if (class_ === 'polygon') {
                        let data_ = layer.dots[class_].map(dot => {
                            return {
                                x: ((dot.x - data.pivotpoint.x) / data.scale) * scale * ratio,
                                y: -((dot.y - data.pivotpoint.y) / data.scale) * scale * ratio,
                            }
                        });
                        fixture = data_.length && butter.drawPolygon(data_, color);
                    }
                    else if (class_ === 'rect' && layer.dots[class_].length === 2) {
                        let center = layer.dots[class_][0];
                        let another = layer.dots[class_][1];
                        let width = another.x - center.x;
                        let height = another.y - center.y;
                        width *= 0.5;
                        height *= 0.5;
                        fixture = butter.drawRect( // PhysicsGraphics
                            (((center.x - data.pivotpoint.x) + width) / data.scale) * scale * ratio,
                            -(((center.y - data.pivotpoint.y) + height) / data.scale) * scale * ratio,
                            2 * (width / data.scale) * scale * ratio,
                            2 * (height / data.scale) * scale * ratio,
                            color
                        );
                    }
                    else if (class_ === 'circle' && layer.dots[class_].length === 2) {
                        let center = layer.dots[class_][0];
                        let another = layer.dots[class_][1];
                        let r = math.get_distance_between_two_point(center, another);
                        fixture = butter.drawCircle(
                            ((center.x - data.pivotpoint.x) / data.scale) * scale * ratio,
                            -((center.y - data.pivotpoint.y) / data.scale) * scale * ratio,
                            (r / data.scale) * scale * ratio,
                            color
                        );
                    }
                    if (fixture) {
                        let idx = this.fixtureCache.length - 1;
                        if (idx > -1) {
                            this.setFriction(friction, idx);
                            this.setRestitution(restitution, idx);
                            this.setDensity(density, idx);
                        }
                    }
                });
            }
            removeDraw(idx) {
                if (idx !== undefined) {
                    Assert.use && Assert.validate('removeDraw::숫자가 아니네', () => idx.constructor === Number);
                    this.destroyFixture(this.numberToFixture(idx));
                } else {
                    this.fixtureCache.forEach(fixture => this.destroyFixture(fixture));
                }
                this.fixtureShapeDrawer();
            }
            getDrawType(idx) {
                Assert.use && Assert.validate('getDrawType::숫자가 아니네', () => idx.constructor === Number);
                Assert.use && Assert.validate('getDrawType::drawingProfile에 짝이 안맞음', () => Object.keys(this.numberToFixture(idx)[DRAWINGPROFILE]).length === 3);
                Assert.use && Assert.validate('getDrawType::픽스쳐가 아니네', () => this.numberToFixture(idx).constructor === b2.Fixture);
                return this.numberToFixture(idx)[DRAWINGPROFILE].tcode;
            }
            setDrawAppearance(idx, cidx, value) {
                Assert.use && Assert.validate('setDrawAppearance::idx 숫자가 아니네', () => idx.constructor === Number);
                Assert.use && Assert.validate('setDrawAppearance::cidx 숫자가 아니네', () => cidx.constructor === Number);
                Assert.use && Assert.validate('setDrawAppearance::value undefined네..', () => value !== undefined);
                let task = this.fixtureCache.map(fix => ({
                    values: this.getFixtureValues(fix),
                    rawArg: fix[DRAWINGPROFILE].rawArg,
                    tcode: fix[DRAWINGPROFILE].tcode
                }));
                task[idx].rawArg[cidx] = value;
                this.removeDraw();
                task.forEach((task, i) => {
                    if (task.tcode === DrawType.RECTANGLE) this.drawRect(...task.rawArg);
                    else if (task.tcode === DrawType.CIRCLE) this.drawCircle(...task.rawArg);
                    else if (task.tcode === DrawType.POLYGON) this.drawPolygon(...task.rawArg);
                    Object.keys(task.values).forEach(propName => {
                        this.setFixtureProp(task.values[propName], propName, i);
                    });
                });
            }
            setDrawColor(idx, color, alpha) {
                let type = this.getDrawType(idx);
                let idxs;
                if (type === DrawType.RECTANGLE) idxs = [4, 5];
                if (type === DrawType.POLYGON) idxs = [1, 2];
                if (type === DrawType.CIRCLE) idxs = [3, 4];
                Assert.use && Assert.validate('setDrawColor::idxs undefined네..', () => idxs !== undefined);
                Assert.use && Assert.validate('setDrawColor::없는픽스쳐..', () => this.numberToFixture(idx) !== undefined);
                let value = [color, alpha];
                idxs.forEach((val, i) => {
                    if (value[i] === undefined || value[i] === null) return;
                    this.numberToFixture(idx)[DRAWINGPROFILE].rawArg[val] = value[i];
                })
                this.fixtureShapeDrawer();
            }
            createFixture(shape) {
                let fixture = this.planckBody.CreateFixture(shape);
                this.fixtureCache = this.getFixtures().reverse();
                Object.freeze(this.fixtureCache);
                this.fixtureMapCache = new Map();
                this.fixtureCache.forEach(fix => this.fixtureMapCache.set(fix));
                return fixture;
            }
            destroyFixture(fixture) {
                Assert.use && Assert.validate('destroyFixture::idx 소유하지 않은2 픽스쳐', () => fixture[DRAWINGPROFILE].drawInstance.pg === this);
                Assert.use && Assert.validate('destroyFixture::idx 소유하지 않은1 픽스쳐', () => this.isFixtureBelongsToMe(fixture));
                this.planckBody.DestroyFixture(fixture);
                this.fixtureCache = this.getFixtures().reverse();
                Object.freeze(this.fixtureCache);
                this.fixtureMapCache = new Map();
                this.fixtureCache.forEach(fix => this.fixtureMapCache.set(fix));
            }
            isFixtureBelongsToMe(fixture) {
                Assert.use && Assert.validate('isFixtureBelongsToMe::픽스쳐가 아니네', () => fixture.constructor === b2.Fixture);
                return this.fixtureMapCache.has(fixture);
            }
            fixtureShapeDrawer() {
                // console.log(1);
                this.graphic.body.clear();
                this.fixtureCache.forEach(f => {
                    if (f[DRAWINGPROFILE].tcode === DrawType.RECTANGLE) {
                        let [x, y, width, height, color, alpha] = f[DRAWINGPROFILE].rawArg; //ANINI
                        width *= 0.5;
                        height *= 0.5;
                        if (color === undefined) color = 0xffffff;
                        if (alpha === undefined) alpha = 1;
                        this.graphic.drawingRectangle(x, y, width, height, color, alpha)
                    }
                    if (f[DRAWINGPROFILE].tcode === DrawType.POLYGON) {
                        let [path, color, alpha] = f[DRAWINGPROFILE].rawArg; //ANINI
                        if (color === undefined) color = 0xffffff;
                        if (alpha === undefined) alpha = 1;
                        this.graphic.drawPolygon(path, color, alpha)
                    }
                    if (f[DRAWINGPROFILE].tcode === DrawType.CIRCLE) {
                        let [x, y, radius, color, alpha] = f[DRAWINGPROFILE].rawArg; //ANINI
                        if (color === undefined) color = 0xffffff;
                        if (alpha === undefined) alpha = 1;
                        this.graphic.drawCircle(x, y, radius, color, alpha);
                    }
                });
            }
            drawRect(x, y, width, height, color, alpha) {
                let drawInstance = new DrawRect({ pg: this });
                const rawArg = [...arguments];
                if (PLANCKMODE) {
                } else {
                    let position = new b2.Vec2(
                        x / PIXICS.worldscale,
                        y / PIXICS.worldscale
                    );
                    const shape = new b2.PolygonShape();
                    shape.SetAsBox(width * 0.5 / PIXICS.worldscale, height * 0.5 / PIXICS.worldscale, position);

                    const fd = new b2.FixtureDef();
                    fd.shape = shape;
                    fd.density = 1;
                    fd.friction = 1;
                    fd.restitution = 0;

                    let fixture = this.createFixture(fd);
                    fixture[DRAWINGPROFILE] = { drawInstance, rawArg, tcode: DrawType.RECTANGLE };
                    this.fixtureShapeDrawer();
                    // fixture[DRAWINGPROFILE].type.bind(this)();
                    return fixture;
                }
            }

            drawPolygon(path, color, alpha) {
                // 볼록한(convex) 도형만 지원한다
                // 오목한(concave) 형태의 도형은 지원하지 않으니 오목하게 하고자 하면 두개의 폴리곤을 덧대어 구현하라
                let drawInstance = new DrawPolygon({ pg: this });
                const rawArg = [...arguments];
                if (PLANCKMODE) {
                } else {
                    let vertices = ((JSON.parse(JSON.stringify(path))).map(point => {
                        point.x /= PIXICS.worldscale;
                        point.y /= PIXICS.worldscale;
                        return new b2.Vec2(point.x, point.y);
                    }));

                    //PolygonShape
                    // const vertices = new Array();
                    // vertices[0] = new b2.Vec2(-0.5, 0.0);
                    // vertices[1] = new b2.Vec2(0.5, 0.0);
                    // vertices[2] = new b2.Vec2(0.0, 1.5);
                    const shape = new b2.PolygonShape();
                    shape.Set(vertices);

                    // const shape = new b2.PolygonShape();
                    // shape.SetAsBox(width / 2 / PIXICS.worldscale, height / 2 / PIXICS.worldscale, position);

                    const fd = new b2.FixtureDef();
                    fd.shape = shape;
                    fd.density = 1;
                    fd.friction = 1;
                    fd.restitution = 0;

                    let fixture = this.createFixture(fd);
                    fixture[DRAWINGPROFILE] = { drawInstance, rawArg, tcode: DrawType.POLYGON };
                    this.fixtureShapeDrawer();
                    // fixture[DRAWINGPROFILE].type.bind(this)();
                    return fixture;
                }
            }
            drawCircle(x, y, radius, color, alpha) {
                let drawInstance = new DrawCircle({ pg: this });
                const rawArg = [...arguments];
                if (PLANCKMODE) {
                } else {
                    const shape = new b2.CircleShape();
                    shape.m_radius = radius / PIXICS.worldscale;
                    shape.m_p.Set(x / PIXICS.worldscale, y / PIXICS.worldscale);

                    const fd = new b2.FixtureDef();
                    fd.shape = shape;
                    fd.density = 1;
                    fd.friction = 1;
                    fd.restitution = 0;

                    let fixture = this.createFixture(fd);
                    fixture[DRAWINGPROFILE] = { drawInstance, rawArg, tcode: DrawType.CIRCLE };
                    this.fixtureShapeDrawer();
                    // fixture[DRAWINGPROFILE].type.bind(this)();
                    // this.planckBody.SetPosition(new b2.Vec2(x / PIXICS.worldscale, y / PIXICS.worldscale));
                    return fixture;
                }
            }
            syncState() {
                if (PLANCKMODE) {
                    this.graphic.rotation = -this.planckBody.getAngle();
                    let bodyPosition = this.planckBody.getPosition();
                    this.graphic.x = bodyPosition.x * PIXICS.worldscale;
                    this.graphic.y = -bodyPosition.y * PIXICS.worldscale;
                } else {
                    let { x, y } = this.planckBody.GetPosition();
                    this.graphic.SetAngle(this.planckBody.GetAngle());
                    this.graphic.SetPosition(x * PIXICS.worldscale, y * PIXICS.worldscale);
                    // this.graphic.rotation = -this.planckBody.GetAngle();
                    // this.graphic.x = orb2(x, 1) + this.bojx;/// PIXICS.worldscale
                    // this.graphic.y = orb2(y, 0) + this.bojy;//
                }
            }
            GetAngle() { return this.getAngle(...arguments); }
            SetAngle() { return this.setAngle(...arguments); }
            GetPosition() { return this.getPosition(...arguments); }
            SetPosition() {
                if (arguments[0].constructor === b2.Vec2) {
                    return this.setPosition(arguments[0].x, arguments[0].y);
                } else {
                    return this.setPosition(...arguments);
                }
            }
            setAngle(radian) {
                if (PLANCKMODE) {
                    this.planckBody.setAngle(radian);
                } else {
                    this.planckBody.SetAngle(radian);
                }
                this.syncState();
                this.touchContacts();
            }
            getAngle() {
                if (PLANCKMODE) {
                    return this.planckBody.getAngle();
                } else {
                    return this.planckBody.GetAngle();
                }
            }
            setPosition(x, y) {
                if (x === undefined || y === undefined) return;
                if (PLANCKMODE) {
                    this.planckBody.setPosition(planck.Vec2(x / PIXICS.worldscale, -y / PIXICS.worldscale));
                } else {
                    this.planckBody.SetPosition(new b2.Vec2(x / PIXICS.worldscale, y / PIXICS.worldscale));
                }
                this.syncState();
                this.touchContacts();
            }
            getPosition() {
                let dd = PLANCKMODE ? this.planckBody.getPosition() : this.planckBody.GetPosition();
                return {
                    x: dd.x * PIXICS.worldscale,
                    y: (dd.y * PIXICS.worldscale),// * -1,
                }
            }
            touchContacts() {
                let list = this.getContactList(true);
                this.getBody().SetAwake(true);
                for (let i = 0; i < list.length; i++)list[i].getBody().SetAwake(true);
            }
            getBody() {
                return this.planckBody;
            }
            getDraw(idx) {
                return this.numberToFixture(idx)[DRAWINGPROFILE].drawInstance;
            }
            getFixtureValues(idx) {
                Assert.use && Assert.validate('getFixtureValues::idx 상태가 이상하네', () => idx !== undefined);
                Assert.use && Assert.validate('getFixtureValues::idx 허용되지 못하는 값', () => idx.constructor === b2.Fixture || idx.constructor === Number);
                let fixture = this.numberToFixture(idx);
                let restitution = fixture?.GetRestitution();
                let friction = fixture?.GetFriction();
                let density = fixture?.GetDensity();
                let sensor = fixture?.IsSensor();
                density = density ? density : 1;
                let data = {
                    restitution,
                    friction,
                    density,
                    sensor
                };
                return data;
            }
            getFixtures() {
                let list = [];
                for (let fixture = this.planckBody.GetFixtureList(); fixture; fixture = fixture.GetNext()) {
                    list.push(fixture);
                }
                return list;
            }
            setFixtureProp(value, propname, idx) {
                let fnname = ({
                    density: PLANCKMODE ? 'setDensity' : 'SetDensity',
                    restitution: PLANCKMODE ? 'setRestitution' : 'SetRestitution',
                    friction: PLANCKMODE ? 'setFriction' : 'SetFriction',
                    sensor: 'SetSensor',
                })[propname];
                if (idx === undefined) {
                    this.fixtureCache.forEach(fixture => fixture[fnname](value))
                } else {
                    this.numberToFixture(idx)[fnname](value);
                }
            }
            getFixtureProp(propname, idx) {
                let fnname = ({
                    density: PLANCKMODE ? 'getDensity' : 'GetDensity',
                    restitution: PLANCKMODE ? 'getRestitution' : 'GetRestitution',
                    friction: PLANCKMODE ? 'getFriction' : 'GetFriction',
                    sensor: 'IsSensor',
                })[propname];
                return this.numberToFixture(idx)[fnname]();
            }
            numberToFixture(idx) {
                Assert.use && Assert.validate('numberToFixture::idx 상태가 이상하네', () => !(idx === undefined || idx === null));
                Assert.use && Assert.validate('numberToFixture::idx 허용되지 못하는 값', () => idx.constructor === b2.Fixture || idx.constructor === Number);
                if (idx.constructor === Number) idx = this.fixtureCache[idx];
                Assert.use && Assert.validate('numberToFixture::idx 소유하지 않은2 픽스쳐', () => idx[DRAWINGPROFILE].drawInstance.pg === this);
                Assert.use && Assert.validate('numberToFixture::idx 소유하지 않은1 픽스쳐', () => this.isFixtureBelongsToMe(idx));
                return idx;
            }
            setSensor(value, idx) {
                this.setFixtureProp(value, 'sensor', idx);
                this.resetBodyAndFixtures();
                this.setAwake(true);
            }
            isSensor(idx) { if (idx === undefined) { idx = 0; } return this.getFixtureProp('sensor', idx); }
            setDensity(value, idx) {
                this.setFixtureProp(value, 'density', idx);
                this.resetBodyAndFixtures();
                this.setAwake(true);
            }
            getDensity(idx) { if (idx === undefined) { idx = 0; } return this.getFixtureProp('density', idx); }
            setRestitution(value, idx) {
                this.setFixtureProp(value, 'restitution', idx);
                this.resetBodyAndFixtures();
                this.setAwake(true);
            }
            getRestitution(idx) { if (idx === undefined) { idx = 0; } return this.getFixtureProp('restitution', idx); }
            setFriction(value, idx) {
                this.setFixtureProp(value, 'friction', idx);
                this.resetBodyAndFixtures();
                this.setAwake(true);
            }
            getFriction(idx) { if (idx === undefined) { idx = 0; } return this.getFixtureProp('friction', idx); }
            setDynamic() {
                if (PLANCKMODE) {
                    this.planckBody.setDynamic();
                } else {
                    this.planckBody.SetType(b2.BodyType.b2_dynamicBody);
                }
                this.setAwake(true);
            }
            isDynamic() {
                if (PLANCKMODE) {
                    return this.planckBody.isDynamic();
                } else {
                    return this.planckBody.GetType() === b2.BodyType.b2_dynamicBody;
                }
            }
            setGravityScale(v) { this.getBody().SetGravityScale(v); }
            getGravityScale() { return this.getBody().GetGravityScale(); }
            setKinematic() { this.planckBody.SetType(b2.BodyType.b2_kinematicBody); }
            isKinematic() { return this.planckBody.GetType() === b2.BodyType.b2_kinematicBody; }
            resetBodyAndFixtures(_shape) {
                /*
                    setDynamic() 을 하고난 뒤에 Fixture의 Shape을 바꾸거나 density를 바꾸고자 할때에는 아예 body를 제거하고 새롭게 재정의 해야한다
                    본 함수는 fixture가 하나일때에 대해서만 대응한다
                */
                let { x, y } = this.getPosition();
                let gravityScale = PLANCKMODE ? this.planckBody.getGravityScale() : this.planckBody.GetGravityScale();
                let dynamic = PLANCKMODE ? this.planckBody.isDynamic() : (this.planckBody.GetType() === b2.BodyType.b2_dynamicBody); // b2.BodyType.b2_dynamicBody
                let static_ = PLANCKMODE ? this.planckBody.isStatic() : (this.planckBody.GetType() === b2.BodyType.b2_staticBody); // b2.BodyType.b2_staticBody
                let awake = PLANCKMODE ? this.planckBody.isAwake() : this.planckBody.IsAwake(); // IsAwake
                let angularVelocity = PLANCKMODE ? this.planckBody.getAngularVelocity() : this.planckBody.GetAngularVelocity();
                let linearDamping = PLANCKMODE ? this.planckBody.getLinearDamping() : this.planckBody.GetLinearDamping();
                let linearVelocity = PLANCKMODE ? this.planckBody.getLinearVelocity() : this.planckBody.GetLinearVelocity();
                let bullet = PLANCKMODE ? this.planckBody.isBullet() : this.planckBody.IsBullet();
                let kinematic = PLANCKMODE ? this.planckBody.isKinematic() : (this.planckBody.GetType() === b2.BodyType.b2_kinematicBody); // b2.BodyType.b2_kinematicBody
                let fixedRotation = PLANCKMODE ? this.planckBody.isFixedRotation() : this.planckBody.IsFixedRotation();
                let angle = this.getAngle();
                let fixtures = new Map();
                let fixtureList = [];//[...fixtures.keys()];
                if (PLANCKMODE) {
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
                } else {
                    for (let fixture = this.planckBody.GetFixtureList(); fixture; fixture = fixture.GetNext()) {
                        Assert.use && Assert.validate('resetBodyAndFixtures::fixture 상태가 이상하네', () => !!fixture);
                        Assert.use && Assert.validate('resetBodyAndFixtures::픽스쳐가 아니네', () => fixture.constructor === b2.Fixture);
                        fixtureList.push(fixture);
                        let shape = _shape ? _shape : fixture.GetShape();
                        fixtures.set(fixture, {
                            shape,
                            ...this.getFixtureValues(fixture)
                        });
                    }
                }

                // 접해있는것의 목록을 담기
                let contactList = [this, ...this.getContactList(true)];// = [];

                // 픽스쳐와 바디를 제거한다
                if (PLANCKMODE) {
                } else {
                    fixtureList.forEach(fixture => this.destroyFixture(fixture));
                    this.planckBody.GetWorld().DestroyBody(this.planckBody);
                }

                // 바디를 재생성 및 값 복원
                if (PLANCKMODE) {
                    this.planckBody = this.world.createBody({
                        bullet: false,
                    });
                    this.planckBody.setGravityScale(gravityScale);
                    this.planckBody.setUserData(this);
                    this.planckBody.setMassData({ mass: 1, center: planck.Vec2(0, 0), I: 1 });
                } else {
                    const bodyDef = new b2.BodyDef();
                    bodyDef.allowSleeping = true;
                    this.planckBody = this.world.CreateBody(bodyDef);
                    this.planckBody.SetGravityScale(gravityScale);
                    this.planckBody.SetUserData(this);
                    // this.planckBody.SetMassData({ mass: 1, center: planck.Vec2(0, 0), I: 1 });
                    const massData = new b2.MassData();
                    massData.mass = 1.0;
                    massData.center.x = 0;//.5 * shape.m_vertex1.x + shape.m_vertex2.x;
                    massData.center.y = 0;//.5 * shape.m_vertex1.y + shape.m_vertex2.y;
                    massData.I = 1.0;
                    this.planckBody.SetMassData(massData);
                }

                // 픽스쳐 재생성 및 값 복원
                fixtureList.reverse().forEach(fixture => {
                    const {
                        shape,
                        restitution,
                        friction,
                        density,
                        sensor
                    } = fixtures.get(fixture);
                    const drawingProfile = fixture[DRAWINGPROFILE];
                    if (PLANCKMODE) {
                    } else {
                        fixture = this.createFixture(shape);
                        fixture.SetRestitution(restitution || 0);
                        fixture.SetFriction(friction || 0);
                        fixture.SetDensity(density || 0);
                        fixture.SetSensor(sensor);
                        fixture[DRAWINGPROFILE] = drawingProfile;
                    }
                });

                // 바디 상태값 재조정
                this.setPosition(x, y);
                this.setAngle(angle);

                // 다이나믹상태 복원
                if (PLANCKMODE) {
                    dynamic && this.planckBody.setDynamic();
                } else {
                    dynamic && this.planckBody.SetType(b2.BodyType.b2_dynamicBody);//setDynamic();
                }

                // 그외 바디의 상태값 복원
                if (PLANCKMODE) { } else {
                    kinematic && this.planckBody.SetType(b2.BodyType.b2_kinematicBody); // https://piqnt.com/planck.js/BodyTypes
                    static_ && this.planckBody.SetType(b2.BodyType.b2_staticBody);
                    this.planckBody.SetBullet(bullet);
                    this.planckBody.SetAwake(awake);
                    // 0 && this.planckBody.SetActive(active); // ????????????????
                    this.planckBody.SetFixedRotation(fixedRotation);
                    this.planckBody.SetAngularVelocity(angularVelocity);
                    this.planckBody.SetLinearDamping(linearDamping);
                    this.planckBody.SetLinearVelocity(linearVelocity);
                }
                // 접해있던것 깨우기
                if (PLANCKMODE) {
                } else {
                    contactList.forEach(contact => contact.getBody().SetAwake(true));
                }
            }
            setActive(v) {
                /*
                    false 로 설정하면 해당 요소를 쉬도록 한다
                    화면으로부터도 제거하고 걸어줬던 모든 이벤트와 업데이트를 해제한다
                    키네마틱움직임도 모두 중단된다
                */
                const graphic = this.getGraphic();
                const parent = graphic.parent;
                if (!v && parent && !this.activeState.parent) {
                    this.setStatic();
                    this.setPosition(math.BIGNUMBER, math.BIGNUMBER);
                    this.planckBody.SetAngularVelocity(0);
                    this.planckBody.SetLinearVelocity({ x: 0, y: 0 });
                    this.destroy(true);
                    this.activeState.parent = parent;
                    parent.removeChild(graphic);
                    this.getBody()[INACTIVE] = !v;
                } else if (v && !parent && this.activeState.parent) {
                    this.activeState.parent.addChild(graphic);
                    Object.keys(this.activeState).forEach(key => delete this.activeState[key]);
                    this.getBody()[INACTIVE] = !v;
                }
            } //oo
            isActive() { return !this.getBody()[INACTIVE]; } //oo
            setAwake(v) { PLANCKMODE ? this.getBody().setAwake(v) : this.getBody().SetAwake(v); }
            isAwake() { return PLANCKMODE ? this.getBody().isAwake() : this.getBody().IsAwake(); }
            setStatic() { PLANCKMODE ? this.getBody().setStatic() : this.getBody().SetType(b2.BodyType.b2_staticBody); } // dynamic의 반대
            isStatic() { return PLANCKMODE ? this.getBody().isStatic() : this.getBody().GetType() === b2.BodyType.b2_staticBody; }
            isDestroy() {
                const graphic = this.getGraphic();
                return !graphic.parent;
            }
            remAllpinGravities() {
                this.getPinGravities().forEach(pin => this.remPinGravity(pin));
            }
            getKinematicMotions() {
                return [
                    ...this.kinematicMotionMove.keys(),
                    ...this.kinematicMotionRotate.keys(),
                ];
            }
            destroy(justclean) {
                //파괴
                this.preCallbackQueue.splice(0, this.preCallbackQueue.length);// = [];//
                this.getKinematicMotions().forEach(motion => motion.clearPrm());
                this.remAllUpdate();
                this.removeAllEvent();
                this.remAllpinGravities();
                point.pixics.getJointList().forEach(jj => {
                    let jp = jj.GetUserData();
                    if (jp.joints.map(j => j.body).includes(this)) {
                        jp.destroy();
                    }
                })
                const body = this.getBody();
                const graphic = this.getGraphic();
                if (justclean) return;
                this.removeDraw();
                body.GetWorld().DestroyBody(body);
                graphic.parent?.removeChild(graphic);
                // return this.planckBody;

            }
            setResistance(fric, cb) {
                let ball1 = this;
                let prev;
                this.resistanceFn && point.pixics.unupdate(this.resistanceFn);
                let resist = function (a, b, c) {
                    let cur = ball1.getBody().GetLinearVelocity();
                    let zero = { x: 0, y: 0 };
                    let radian = math.get_angle_in_radian_between_two_points(zero, cur);
                    let resistance = (1 - fric);
                    if (resistance < 0) resistance = 0;
                    let vv = math.get_distance_between_two_point(zero, cur);
                    let dist = Math.abs(vv) * resistance;
                    let rtn = math.get_coordinate_distance_away_from_center_with_radian(dist, zero, radian);
                    ball1.getBody().SetLinearVelocity(rtn);
                    if (prev) {
                        let dist2 = (math.get_distance_between_two_point(ball1.getGraphic().position, prev));
                        if (dist2 < 0.01) {
                            ball1.getBody().SetLinearVelocity(new b2.Vec2(0, 0));
                            point.pixics.unupdate(resist);
                            ball1.resistanceFn = null;
                            cb && cb();
                            b();
                        }
                    }
                    prev = { x: ball1.getGraphic().x, y: ball1.getGraphic().y };
                };
                this.resistanceFn = resist;
                point.pixics.update(resist);
            }
        }
        //------------------------------
        // 매 프레임마다 물리연산을 해서 나오는 수치를 픽시 그래픽요소의 상태에 반영
        let updateList = new Map();
        let timeoutList = new Map();
        const runUpdateCb = value => {
            const tc = Symbol.for('timecount');
            if (value[tc] === undefined) value[tc] = 0
            value(1, value[Symbol.for('removeUpdate')], ++value[tc]);
        };
        let syncStateAll = world => {
            for (let body = world.GetBodyList(); body; body = body.GetNext()) {
                if (body[INACTIVE]) continue;
                let bdv = body.GetUserData();
                let len = bdv.preCallbackQueue.length;
                for (let i = 0; i < len; i++) {
                    if (!bdv.preCallbackQueue[i]) continue;
                    let [cb, _body] = bdv.preCallbackQueue[i];
                    cb(_body);
                }
                bdv.preCallbackQueue.splice(0, len);
                // console.log()
                let keys = bdv.updateQueue.keys();
                while (true) {
                    let val = keys.next();
                    if (val.done) break;
                    runUpdateCb(val.value);
                }
                bdv?.syncState();
            }
        };
        let registUpdate = world => {
            point.tickplay = true;
            let tick_accumulator;
            PIXI.Ticker.shared.add(dt => {
                if (!point.goOneStep && !point.tickplay) return;
                point.goOneStep = false;
/*Deboucing*/{ if (tick_accumulator === undefined) { tick_accumulator = 0; }; tick_accumulator += dt; if (tick_accumulator >= 1) { tick_accumulator = tick_accumulator - 1; } else { return; } };
                if (PLANCKMODE) {
                    world.step(1 / magicNumber);
                    world.clearForces();
                    for (let body = world.getBodyList(); body; body = body.getNext()) {
                        body.getUserData()?.syncState();
                    }
                } else {
                    world.Step(1 / magicNumber, 8, 3);
                    world.ClearForces();
                    // for (let body = world.GetBodyList(); body; body = body.GetNext()) {
                    //     body.GetUserData()?.syncState();
                    // }
                    syncStateAll(world);
                }
                {
                    let it = updateList.keys();
                    while (true) {
                        let { value, done } = it.next();
                        if (done) break;
                        runUpdateCb(value);
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
        const getMovableMaxDistancePerFrame = () => {
            // 통과됨
            // 한 프레임당 이동할 수 있는 최대 거리를 리턴해준다
            return PIXICS.worldscale * 2;
        }
        // const getMoveDistancePerFrame = (벨로시티) => {
        //     // 통과됨
        //     // 벨로시티는 setLinearVelocity 에 주어지는 방향좌표값 x y 의 빗변의 길이를 뜻함
        //     // setLinearVelocity 에 주어지는 벨로시티값에 의해 한 프레임당 이동할 실제 거리를 계산해서 리턴한다
        //     return (PIXICS.worldscale * point.ratio * 벨로시티) / magicNumber;
        // }
        const getVelocityPerFrame = (거리) => {
            // 통과됨
            // 한프레임당 주어진 거리만큼을 이동하기 위해 얼마만큼의 벨로시티가 필요한지를 계산해서 리턴
            let aa = (PIXICS.worldscale);
            return (거리 * magicNumber) / aa;
        }
        // const getMoveDistanceFor = (전체거리, 시간초) => {
        //     // 통과됨
        //     // 주어진 거리를 주어진 시간동안 이동한다면 한프레임당 얼마만큼의 거리를 이동해야하는가 계산
        //     // 시간초는 밀리세컨드로주자
        //     return 전체거리 / (magicNumber * (시간초 / 1000));
        // }
        // const getVelocityFor = (전체거리, 시간초) => {
        //     // 통과됨
        //     // 주어진 거리를 주어진 시간동안 이동하기 위해 필요한 벨로시티를 계산해준다
        //     // 시간초는 밀리세컨드로주자
        //     let dist = getMoveDistanceFor(전체거리, 시간초);
        //     return dist * (1 / getMoveDistancePerFrame(1));
        // }
        class KeyEvent {
            static DOWN = ['mousedown', 'touchstart']
            static MOVE = ['mousemove', 'touchmove']
            static UP = [...['touchend', 'mouseup'], ...['touchendoutside', 'mouseupoutside']]
        }
        class DrawType {
            static CIRCLE = 0
            static RECTANGLE = 1
            static POLYGON = 2
        }
        class Draw {
            constructor(arg) {
                this.pg = arg.pg;
            }
            set color(v) {
                this.pg.setDrawColor(this.fixtureOrder, v, null);
            }
            get color() {
                if (this.tcode === DrawType.CIRCLE) { return this.rawArg[3]; }
                else if (this.tcode === DrawType.POLYGON) { return this.rawArg[1]; }
                else if (this.tcode === DrawType.RECTANGLE) { return this.rawArg[4]; }
            }
            set alpha(v) {
                this.pg.setDrawColor(this.fixtureOrder, null, v);
            }
            get alpha() {
                if (this.tcode === DrawType.CIRCLE) { return this.rawArg[3 + 1]; }
                else if (this.tcode === DrawType.POLYGON) { return this.rawArg[1 + 1]; }
                else if (this.tcode === DrawType.RECTANGLE) { return this.rawArg[4 + 1]; }
            }
            set x(v) {
                let idx = this.fixtureOrder;
                this.pg.setDrawAppearance(idx, 0, v);
            }
            get x() {
                return this.rawArg[0];
            }
            set y(v) {
                this._y = v;
                let idx = this.fixtureOrder;
                this.pg.setDrawAppearance(idx, 1, v);
            }
            get y() {
                return this.rawArg[1];
            }
            get tcode() { return this.fixture[DRAWINGPROFILE].tcode; }
            get rawArg() { return this.fixture[DRAWINGPROFILE].rawArg; }
            get fixture() {
                return this.pg.numberToFixture(this.fixtureOrder);//[DRAWINGPROFILE].rawArg[0];
            }
            get fixtureOrder() {
                let fixtures = this.pg.fixtureCache;
                for (let i = 0; i < fixtures.length; i++) {
                    if (fixtures[i][DRAWINGPROFILE].drawInstance === this) {
                        return i;
                    }
                }
            }
        }
        class DrawCircle extends Draw {
            constructor(arg) {
                super(arg)
            }
            set radius(v) {
                let idx = this.fixtureOrder;
                this.pg.setDrawAppearance(idx, 2, v);
            }
            get radius() {
                return this.rawArg[2];
            }
        }
        class DrawRect extends Draw {
            constructor(arg) {
                super(arg)
            }
            set width(v) {
                let idx = this.fixtureOrder;
                this.pg.setDrawAppearance(idx, 2, v);
            }
            get width() {
                return this.rawArg[2];
            }
            set height(v) {
                let idx = this.fixtureOrder;
                this.pg.setDrawAppearance(idx, 3, v);
            }
            get height() {
                return this.rawArg[3];
            }
        }
        class DrawPolygon extends Draw {
            constructor(arg) {
                super(arg)
            }
            set path(v) {
                let idx = this.fixtureOrder;
                this.pg.setDrawAppearance(idx, 0, v);
            }
            get path() {
                return this.rawArg[0];
            }
        }


        let lineList = new Map();
        let point = {
            DrawType,
            KeyEvent,
            framerate: magicNumber,
            math: math,
            displaySystem: (scs, fps, container) => {
                let [width, height] = scs;
                let isBodyContainer = container.constructor === HTMLBodyElement;
                let resizeCb;
                let resizable = false;
                if (scs.length < 2) {
                    resizable = true;
                    width = math.EPSILON;
                    height = math.EPSILON;
                    if (resizable && isBodyContainer) {
                        window.addEventListener('resize', e => resizable && resizeCb && resizeCb());
                    }
                }
                if (fps) {
                    (function () { var script = document.createElement('script'); script.onload = function () { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'; document.head.appendChild(script); })();
                }
                let original = {
                    width, height
                };
                let pointer = {
                    createPIXIApp(initValue) {
                        // console.log(!!initValue.rotation);
                        let display = this;
                        // let ratio = display.getRatio();
                        const app = new PIXI.Application({
                            width: display.width,// * ratio,
                            height: display.height,// * ratio,
                            antialias: true,
                            resolution: window.devicePixelRatio,
                            autoDensity: true,
                        });
                        if (!!initValue.rotation) {
                            display.width = app.screen.height;
                            display.height = app.screen.width;
                        } else {
                            display.width = app.screen.width;
                            display.height = app.screen.height;
                        }
                        app.stage.sortableChildren = true;
                        display.container.innerText = '';
                        display.container.appendChild(app.view);
                        if (resizable && isBodyContainer) {
                            resizeCb = () => app.renderer.resize(window.innerWidth, window.innerHeight);
                            resizeCb();
                        }
                        if (!!initValue.rotation) {
                            app.stage.x = display.height;
                            app.stage.rotation = Math.PI / 2
                        }
                        return app;
                    },
                    log(v) {
                    },
                    getRatio() {
                        // let width, height;
                        let { width, height } = resizable ? original : container.getBoundingClientRect();
                        if (isBodyContainer) {
                            if (!resizable) {
                                width = window.innerWidth;
                                height = window.innerHeight;
                            }
                            else {
                                container.style.margin = '0px';
                                container.style.backgroundColor = '#000';
                                container.style.overflow = 'hidden';
                            }
                        } else {
                            if (!resizable) {
                                if (!width || !height) throw new Error(`부모의 크기가 작거나 돔트리에 붙어있지 않은 상태로 보입니다`);
                            } else {
                            }
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
            },
            worldscale: 0, PhysicsGraphics,
            ObjectPool,
            Line,
            editorUrl(json, redirect) {
                let data = encodeURIComponent(JSON.stringify(json));
                let a = document.createElement('a');
                a.innerHTML = '편집기 열고싶다면 엔터를 쳐 주세요';
                a.setAttribute('href', `https://kstost.github.io/PIXICS/editor.html#${data}`);
                redirect && a.click();
                if (redirect) return;
                !redirect && a.setAttribute('target', `_blank`);
                document.body.innerHTML = '';
                document.body.append(a);
                document.body.style.background = 'black';
                a.style.color = 'white';
                a.style.padding = '50px';
                a.style.display = 'inline-block';
                a.focus();
            },
            transScale(v) { return v / PIXICS.worldscale; },
            createWorld(scale, ratio, gravity, useflyover, display) {
                class ContactListener extends b2.ContactListener {
                    constructor() {
                        super();
                    }
                    askFire(contact, contactmode) {
                        let wba = contact.GetFixtureA().GetBody().GetUserData();
                        let wbb = contact.GetFixtureB().GetBody().GetUserData();
                        // if (!wba.isActive() || !wbb.isActive()) return;
                        wbb.setContactState(wba, contactmode);
                        wba.setContactState(wbb, contactmode);
                    }
                    BeginContact(contact) {
                        this.askFire(contact, true);
                    }
                    EndContact(contact) {
                        this.askFire(contact, false);
                    }
                    PreSolve(contact, oldManifold) {
                        this.askFire(contact, true);
                    }
                    PostSolve(contact, impulse) {
                        this.askFire(contact, true);
                    }
                }
                actual_display = display;
                PLANCKMODE = !useflyover ? true : false;
                point.ratio = ratio;
                point.worldscale = scale * ratio;
                let world = PLANCKMODE ? new planck.World(gravity) : new b2.World(gravity);
                world.SetAllowSleeping(true);
                false && world.SetWarmStarting(true);
                false && world.SetContinuousPhysics(true);
                registUpdate(world);
                world.SetContactListener(new ContactListener());
                point.pixics = {
                    setJoint(anchor1, anchor2, jinfo, design) {
                        return point.pixics.setDistanceJoint(...arguments);
                    },
                    setDistanceJoint(anchor1, anchor2, jinfo, design) {
                        function makeWires() {
                            let parent = parentContainer();
                            if (parent && design.thickness) {
                                let roundCap = new PIXI.Graphics();
                                let roundECap = new PIXI.Graphics();
                                let jointWire = new PIXICS.Line();
                                parent.addChild(roundCap);
                                parent.addChild(roundECap);
                                parent.addChild(jointWire);
                                return { roundCap, roundECap, jointWire }
                            }
                            return {};
                        }
                        function parentContainer() {
                            if (!design.app) return;
                            return parent;
                        }
                        function angle(v) {
                            var radians = (Math.PI * 2) - v.angle;
                            var cos = Math.cos(radians);
                            var sin = Math.sin(radians);
                            let point2 = v;
                            let point1 = v.pos;
                            let vv = {
                                x: (cos * (point2.x - point1.x)) + (sin * (point2.y - point1.y)) + point1.x,
                                y: (cos * (point2.y - point1.y)) - (sin * (point2.x - point1.x)) + point1.y
                            }
                            return vv;
                        }
                        let destoryed;
                        const pixics = point.pixics;
                        if (anchor1.constructor === Array) anchor1 = { body: anchor1[0], x: anchor1[1], y: anchor1[2] };
                        if (anchor2.constructor === Array) anchor2 = { body: anchor2[0], x: anchor2[1], y: anchor2[2] };
                        if (!jinfo) jinfo = { collideConnected: true };
                        let coord1 = !(anchor1.x === undefined || anchor1.y === undefined);
                        let coord2 = !(anchor2.x === undefined || anchor2.y === undefined);
                        if (!coord2) { anchor2.x = 0; anchor2.y = 0; }
                        let ball1 = anchor1.body;
                        let ball2 = anchor2.body;
                        Assert.use && Assert.validate('setDistanceJoint::문제있음1', () => (ball1 instanceof PhysicsGraphics));
                        Assert.use && Assert.validate('setDistanceJoint::문제있음2', () => (ball2 instanceof PhysicsGraphics));
                        Assert.use && Assert.validate('setDistanceJoint::문제있음3', () => (ball1.getGraphic().parent === ball2.getGraphic().parent));
                        if (!ball1 || !ball2) return;
                        let b1p = ball1.getPosition();
                        let b2p = ball2.getPosition();
                        anchor1.x -= b1p.x;
                        anchor1.y += b1p.y;
                        anchor2.x -= b2p.x;
                        anchor2.y += b2p.y;
                        design = !design ? { color: 0x00ffff, thickness: 0.5 * ratio } : design;
                        const parent = ball1.getGraphic().parent;
                        let joints = [{ body: ball2, origin: { ...b2p }, anchor: anchor2 }, { body: ball1, origin: { ...b1p }, anchor: anchor1 }];
                        let jd = coord2 ? new b2.DistanceJointDef() : new b2.RevoluteJointDef();
                        let afa1 = angle({ pos: b1p, x: anchor1.x + b1p.x * 2, y: anchor1.y, angle: ball1.getAngle() });
                        let afa2 = angle({ pos: b2p, x: anchor2.x + b2p.x * 2, y: anchor2.y, angle: ball2.getAngle() });
                        let p1 = new b2.Vec2(afa1.x / pixics.worldscale, afa1.y / pixics.worldscale);
                        let p2 = new b2.Vec2(afa2.x / pixics.worldscale, afa2.y / pixics.worldscale);
                        jd.Initialize(...[ball2.getBody(), ball1.getBody(), ...(coord2 ? [p2, p1] : [p1])]);
                        Object.keys(jinfo).forEach(propName => jd[propName] = jinfo[propName])
                        let joint = world.CreateJoint(jd);
                        let controlInst = {
                            joints,
                            getJointWire() {
                                return jointWire;
                            },
                            setWireThickness(v) {
                                if (!parentContainer() || !design.thickness) return;
                                jointWire.thickness = v;
                                roundCap.clear();
                                roundCap.beginFill(0xffffff);
                                roundCap.drawCircle(0, 0, v * 0.5);
                                roundCap.endFill();
                                roundECap.clear();
                                roundECap.beginFill(0xffffff);
                                roundECap.drawCircle(0, 0, v * 0.5);
                                roundECap.endFill();
                            },
                            setColor(c) {
                                if (!parentContainer() || !design.thickness) return;
                                roundCap.tint = c;
                                roundECap.tint = c;
                                jointWire.tint = c;
                            },
                            destroy() {
                                Assert.use && Assert.validate('setDistanceJoint::문제있음4', () => (destoryed === undefined));
                                roundCap && roundCap.parent?.removeChild(roundCap);
                                roundECap && roundECap.parent?.removeChild(roundECap);
                                jointWire && jointWire.parent?.removeChild(jointWire);
                                world.DestroyJoint(joint);
                                destoryed = true;
                            },
                        };
                        joint.SetUserData(controlInst);
                        let { roundCap, roundECap, jointWire } = makeWires();
                        joint.GetUserData().setWireThickness(design.thickness);
                        joint.GetUserData().setColor(design.color);
                        parentContainer() && design.thickness && pixics.update((a, b, c) => {
                            if (destoryed) return b();
                            joint.GetUserData().joints.forEach((jinfo, i) => {
                                let { body, origin, anchor } = jinfo;
                                anchor = { ...anchor };
                                anchor.x = -anchor.x;
                                let radian = math.get_angle_in_radian_between_two_points(anchor, origin);
                                let leng = math.get_distance_between_two_point(origin, anchor);
                                let center = pixics.getWorldCenter();
                                let point = math.get_coordinate_distance_away_from_center_with_radian(leng, body.getPosition(), (-radian) + body.getAngle())
                                if (i === 0) {
                                    jointWire.ax = point.x + center.x;
                                    jointWire.ay = -point.y + center.y;
                                    roundCap.x = jointWire.ax;
                                    roundCap.y = jointWire.ay;
                                } else {
                                    jointWire.bx = point.x + center.x;
                                    jointWire.by = -point.y + center.y;
                                    roundECap.x = jointWire.bx;
                                    roundECap.y = jointWire.by;
                                }
                            });
                        });
                        return joint;
                        //==================================================================================================================================================================
                    },
                    world,
                    get worldscale() {
                        return point.worldscale;
                    },
                    getWorldCenter() {
                        return center;
                    },
                    moveWorldCenterTo(x, y) {
                        center.x = actual_display.width / 2;
                        center.y = actual_display.height / 2;
                        center.x += x;
                        center.y += -y;
                        syncStateAll(world);
                    },
                    moveWorldCenterBy(x, y) {
                        center.x += x;
                        center.y += -y;
                        syncStateAll(world);
                    },
                    log(str, duration) {
                        let line = document.createElement('div');
                        line.style.position = 'fixed';
                        line.style.left = '0px';
                        line.style.paddingLeft = '15px';
                        line.style.paddingTop = '0px';
                        line.style.paddingBottom = '5px';
                        line.style.fontSize = '15px';
                        line.style.color = 'white';
                        line.innerText = str
                        document.body.appendChild(line);
                        line.measuredSize = line.getBoundingClientRect();
                        line.measuredSize.botpos = 15;
                        line.style.bottom = line.measuredSize.botpos + 'px';
                        [...lineList.keys()].forEach(bline => {
                            bline.measuredSize.botpos += line.measuredSize.height;
                            bline.style.bottom = bline.measuredSize.botpos + 'px';
                            bline.style.opacity = '0.5';
                        });
                        line.addEventListener('transitionend', e => {
                            if (e.propertyName === 'filter') {
                                line.remove();
                                lineList.delete(line);
                            }
                        })
                        setTimeout(() => {
                            line.style.transition = '0.2s';
                            line.style.filter = 'blur(0.2rem)';
                            line.style.opacity = '0';
                        }, duration ? duration : 2000);
                        lineList.set(line, true);
                    },
                    setPlay() {
                        point.tickplay = !point.tickplay;
                    },
                    goOneStep() {
                        point.tickplay = false;
                        point.goOneStep = true;
                    },
                    update: async function (cb, cnt) {
                        if (updateList.has(cb)) return;
                        return await new Promise(resolve => {
                            updateManage(cb, resolve, r => this.unupdate(cb, r), cnt, updateList);
                        });
                    },
                    unupdate(cb, response) {
                        updateRemoveManage(cb, updateList, response);
                    },
                    setTimeout(cb, time) {
                        timeoutList.set(cb, { time: (time / 1000) * magicNumber });
                    },
                    sleep(time) {
                        return new Promise(r => {
                            this.setTimeout(r, time);
                        });
                    },
                    getJointList() {
                        let list = [];
                        for (let joint = world.GetJointList(); joint; joint = joint.GetNext()) {
                            list.push(joint);
                        }
                        return list.reverse();
                    }

                    // getMoveDistancePerFrame,
                    // getVelocityPerFrame,
                    // 한프레임당이동하기를원하는벨로시티,
                    // getMovableMaxDistancePerFrame,
                    // getMoveDistanceFor,
                    // getVelocityFor,

                };
                point.pixics.moveWorldCenterTo(0, 0);
                point.pixics.moveWorldCenterBy(0, 0);
                return point.pixics;
            }
        };
        return point;
    })();
    return PIXICS;
}
