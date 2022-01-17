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
            function drawPolygon(gr, path, color) {
                gr.beginFill(color);
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
            function drawCircle(gr, x, y, radius, color) {
                // width = width * 2;
                // height = height * 2;
                gr.beginFill(color);
                gr.drawCircle(x - (0 * 0.5), -y - (0 * 0.5), radius);
                gr.endFill();
            }
            function internalRectDrawer(gr, x, y, width, height, color) {
                width = width * 2;
                height = height * 2;
                gr.beginFill(color);
                gr.drawRect(x - (width * 0.5), -y - (height * 0.5), width, height); // 픽시꺼.
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
                drawingRectangle(x, y, width, height, color) {
                    internalRectDrawer(gr, x, y, width, height, color);
                },
                drawCircle(x, y, radius, color) {
                    drawCircle(gr, x, y, radius, color);
                },
                drawPolygon(path, color) {
                    drawPolygon(gr, path, color);
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
        class PhysicsGraphics {
            resistanceFn = null;
            stickState = new Map();
            contacts = new Map();
            ignoreContact = new Map();
            interactiveEvents = {};//new Map();
            kinematicMotionMove = new Map();
            kinematicMotionRotate = new Map();
            tag = null;
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
                    const bodyDef = new b2.BodyDef();
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
                        cb && this.preCallbackQueue.push([cb, body]);
                    }
                } else {
                    if (this.contacts.has(body)) {
                        this.contacts.delete(body);
                        let cb = this.getCBFunc(body, 'untact');
                        cb && this.preCallbackQueue.push([cb, body]);
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
                if (!typeChecker.isNumber(x, d)) throw 'adsfuih';
                if (y !== null && !typeChecker.isNumber(y)) throw 'weirouh';
                if (!f) f = 'linearTween';
                f = Ease[f];
                const _point = this;
                const pixics = point.pixics;
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
                        let idx = this.getFixtures().length - 1;
                        if (idx > -1) {
                            this.setFriction(friction, idx);
                            this.setRestitution(restitution, idx);
                            this.setDensity(density, idx);
                        }
                    }
                });
            }
            removeFixture(idx) {
                let fixtures = this.getFixtures();
                let fx = (fixtures.length - 1) - idx;
                if (PLANCKMODE) {
                    this.planckBody.destroyFixture(fixtures[fx]);
                } else {
                    this.planckBody.DestroyFixture(fixtures[fx]);
                }
                this.redrawFixture();
            }
            createFixture(shape, attr) {
                if (PLANCKMODE) {
                    return this.planckBody.createFixture(shape, attr);
                } else {
                    // console.log(shape)
                    return this.planckBody.CreateFixture(shape);
                }
            }
            redrawFixture() {
                this.graphic.body.clear();
                let drawArgs = this.getFixtures().reverse().map(fixture => fixture.drawingProfile);
                drawArgs.forEach(arg => arg.type.bind(this)(...arg.arg));
            }
            fixtureShapeDrawer() {
                this.graphic.body.clear();
                this.getFixtures().reverse().forEach(f => {
                    if (f.drawingProfile.type === this._drawRect) {
                        let [x, y, width, height, color] = f.drawingProfile.arg;
                        if (color === undefined) color = 0xffffff;
                        this.graphic.drawingRectangle(x, y, width, height, color)
                    }
                    if (f.drawingProfile.type === this._drawPolygon) {
                        let [path, color] = f.drawingProfile.arg;
                        if (color === undefined) color = 0xffffff;
                        this.graphic.drawPolygon(path, color)
                    }
                    if (f.drawingProfile.type === this._drawCircle) {
                        let [x, y, radius, color] = f.drawingProfile.arg;
                        if (color === undefined) color = 0xffffff;
                        this.graphic.drawCircle(x, y, radius, color);
                    }
                });
            }
            _drawRect() {
                this.fixtureShapeDrawer();
            }
            drawRect(x, y, width, height, color) {
                width *= 0.5;
                height *= 0.5;
                let argument = [x, y, width, height, color];
                if (color === undefined) color = 0xffffff;
                if (PLANCKMODE) {
                } else {
                    let position = new b2.Vec2(
                        x / PIXICS.worldscale,
                        y / PIXICS.worldscale
                    );
                    const shape = new b2.PolygonShape();
                    shape.SetAsBox(width / PIXICS.worldscale, height / PIXICS.worldscale, position);

                    const fd = new b2.FixtureDef();
                    fd.shape = shape;
                    fd.density = 1;
                    fd.friction = 1;
                    fd.restitution = 0;

                    let fixture = this.createFixture(fd);
                    fixture.drawingProfile = { type: this._drawRect, arg: argument };
                    fixture.drawingProfile.type.bind(this)(...argument);
                    return fixture;
                }
            }
            _drawPolygon() {
                this.fixtureShapeDrawer();
            }
            drawPolygon(path, color) {
                // 볼록한(convex) 도형만 지원한다
                // 오목한(concave) 형태의 도형은 지원하지 않으니 오목하게 하고자 하면 두개의 폴리곤을 덧대어 구현하라
                if (color === undefined) color = 0xffffff;
                if (PLANCKMODE) {
                    let shape = planck.Polygon((JSON.parse(JSON.stringify(path))).map(point => {
                        point.x /= PIXICS.worldscale;
                        point.y /= PIXICS.worldscale;
                        point.y *= -1
                        return point;
                    }));
                    let fixture = this.createFixture(shape, { density: 1, friction: 1, restitution: 0 });
                    fixture.drawingProfile = { type: this._drawPolygon, arg: arguments };
                    fixture.drawingProfile.type.bind(this)(...arguments);
                    // this._drawPolygon(...arguments);
                    return fixture;
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
                    fixture.drawingProfile = { type: this._drawPolygon, arg: arguments };
                    fixture.drawingProfile.type.bind(this)(...arguments);
                    // this._drawPolygon(...arguments);
                    return fixture;
                }
            }
            _drawCircle() {
                this.fixtureShapeDrawer();
            }
            drawCircle(x, y, radius, color) {
                if (color === undefined) color = 0xffffff;
                if (PLANCKMODE) {
                    let position = planck.Vec2(x / PIXICS.worldscale, -y / PIXICS.worldscale);
                    let shape = planck.Circle(position, radius / PIXICS.worldscale);
                    let fixture = this.createFixture(shape, { density: 1, friction: 1, restitution: 0 });
                    fixture.drawingProfile = { type: this._drawCircle, arg: arguments };
                    fixture.drawingProfile.type.bind(this)(...arguments);
                    // this._drawCircle(...arguments);
                    return fixture;
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
                    fixture.drawingProfile = { type: this._drawCircle, arg: arguments };
                    fixture.drawingProfile.type.bind(this)(...arguments);
                    // this._drawCircle(...arguments);
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
            getFixtures() {
                let list = [];
                if (PLANCKMODE) {
                    for (let fixture = this.planckBody.getFixtureList(); fixture; fixture = fixture.getNext()) {
                        list.push(fixture);
                    }
                } else {
                    for (let fixture = this.planckBody.GetFixtureList(); fixture; fixture = fixture.GetNext()) {
                        list.push(fixture);
                    }
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
                    density: PLANCKMODE ? 'getDensity' : 'GetDensity',
                    restitution: PLANCKMODE ? 'getRestitution' : 'GetRestitution',
                    friction: PLANCKMODE ? 'getFriction' : 'GetFriction',
                    sensor: 'IsSensor',
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
                let active = PLANCKMODE ? this.planckBody.isActive() : true; // 이거 대응하는거 알아내야한다
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
                        fixtureList.push(fixture);
                        let shape = _shape ? _shape : fixture.GetShape();
                        let restitution = fixture?.GetRestitution();
                        let friction = fixture?.GetFriction();
                        let density = fixture?.GetDensity();
                        let sensor = fixture?.IsSensor();
                        density = density ? density : 1;
                        fixtures.set(fixture, {
                            shape,
                            restitution,
                            friction,
                            density,
                            sensor
                        });
                    }
                }

                // 접해있는것의 목록을 담기
                let contactList = [this, ...this.getContactList(true)];// = [];

                // 픽스쳐와 바디를 제거한다
                if (PLANCKMODE) {
                    fixtureList.forEach(fixture => this.planckBody.destroyFixture(fixture));
                    this.planckBody.getWorld().destroyBody(this.planckBody);
                } else {
                    fixtureList.forEach(fixture => this.planckBody.DestroyFixture(fixture));
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
                    const drawingProfile = fixture.drawingProfile;
                    if (PLANCKMODE) {
                        fixture = this.planckBody.createFixture(shape);
                        fixture.setRestitution(restitution || 0);
                        fixture.setFriction(friction || 0);
                        fixture.setDensity(density || 0);
                        fixture.drawingProfile = drawingProfile;
                    } else {
                        fixture = this.planckBody.CreateFixture(shape);
                        fixture.SetRestitution(restitution || 0);
                        fixture.SetFriction(friction || 0);
                        fixture.SetDensity(density || 0);
                        fixture.SetSensor(sensor);
                        fixture.drawingProfile = drawingProfile;
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
                if (PLANCKMODE) {
                    kinematic && this.planckBody.setKinematic(); // https://piqnt.com/planck.js/BodyTypes
                    static_ && this.planckBody.setStatic();
                    this.planckBody.setBullet(bullet);
                    this.planckBody.setAwake(awake);
                    this.planckBody.setActive(active);
                    this.planckBody.setFixedRotation(fixedRotation);
                    this.planckBody.setAngularVelocity(angularVelocity);
                    this.planckBody.setLinearDamping(linearDamping);
                    this.planckBody.setLinearVelocity(linearVelocity);
                } else {
                    kinematic && this.planckBody.SetType(b2.BodyType.b2_kinematicBody); // https://piqnt.com/planck.js/BodyTypes
                    static_ && this.planckBody.SetType(b2.BodyType.b2_staticBody);
                    this.planckBody.SetBullet(bullet);
                    this.planckBody.SetAwake(awake);
                    0 && this.planckBody.SetActive(active); // ????????????????
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
            setActive(v) { PLANCKMODE ? this.getBody().setActive(v) : null; } //oo
            isActive() { return PLANCKMODE ? this.getBody().isActive() : true; } //oo
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
            destroy() {
                this.getKinematicMotions().forEach(motion => motion.clearPrm());
                this.remAllUpdate();
                this.remAllpinGravities();
                point.pixics.getJointList().forEach(jj => {
                    let jp = jj.GetUserData();
                    if (jp.joints.map(j => j.body).includes(this)) {
                        jp.destroy();
                    }
                })
                const body = this.getBody();
                const graphic = this.getGraphic();
                body.GetWorld().DestroyBody(body);
                graphic.parent?.removeChild(graphic);
                // return this.planckBody;

            }
            setResistance(fric, cb) {
                let ball1 = this;
                let prev;
                this.resistanceFn && point.pixics.unupdate(this.resistanceFn);
                let resist = function () {
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
                let bdv = body.GetUserData();
                let len = bdv.preCallbackQueue.length;
                for (let i = 0; i < len; i++) {
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

        let lineList = new Map();
        let point = {
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
                        display.container.innerText = '';
                        display.container.appendChild(app.view);
                        if (resizable && isBodyContainer) {
                            resizeCb = () => app.renderer.resize(window.innerWidth, window.innerHeight);
                            resizeCb();
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
                registUpdate(world);
                world.SetContactListener(new ContactListener());
                point.pixics = {
                    setJoint(anchor1, anchor2, jinfo, design) {
                        point.pixics.setDistanceJoint(...arguments);
                    },
                    setDistanceJoint(anchor1, anchor2, jinfo, design) {
                        let coord1 = !(anchor1.x === undefined || anchor1.y === undefined);
                        let coord2 = !(anchor2.x === undefined || anchor2.y === undefined);
                        if (!coord2) {
                            anchor2.x = 0;
                            anchor2.y = 0;
                        }
                        let ball1 = anchor1.body;
                        let ball2 = anchor2.body;
                        if (!ball1 || !ball2) return;
                        let b1p = ball1.getPosition();
                        let b2p = ball2.getPosition();
                        anchor1.x -= b1p.x;
                        anchor1.y += b1p.y;
                        anchor2.x -= b2p.x;
                        anchor2.y += b2p.y;
                        const pixics = point.pixics;
                        design = !design ? { color: 0x00ffff, thickness: 0.5 * ratio } : design;
                        const app = design.app;
                        let body1 = ball1;
                        let ball1Origin = { ...b1p };
                        let ball1Anchor = anchor1;
                        let body2 = ball2;
                        let ball2Origin = { ...b2p };
                        let ball2Anchor = anchor2;
                        let jd;
                        if (coord2) {
                            jd = new b2.DistanceJointDef();
                        } else {
                            jd = new b2.RevoluteJointDef();
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
                        let afa1 = angle({ pos: b1p, x: ball1Anchor.x + b1p.x * 2, y: ball1Anchor.y, angle: ball1.getAngle() });
                        let afa2 = angle({ pos: b2p, x: ball2Anchor.x + b2p.x * 2, y: ball2Anchor.y, angle: ball2.getAngle() });
                        let p1 = new b2.Vec2(afa1.x / pixics.worldscale, afa1.y / pixics.worldscale);
                        let p2 = new b2.Vec2(afa2.x / pixics.worldscale, afa2.y / pixics.worldscale);
                        let argus;
                        if (coord2) {
                            argus = [body2.getBody(), body1.getBody(), p2, p1];
                        } else {
                            argus = [body2.getBody(), body1.getBody(), p1];
                        }
                        jd.Initialize(...argus);
                        Object.keys(jinfo).forEach(propName => {
                            jd[propName] = jinfo[propName];
                        })
                        let joint = world.CreateJoint(jd);
                        joint.SetUserData({
                            joints: [
                                {
                                    body: body2,
                                    origin: ball2Origin,
                                    anchor: ball2Anchor
                                },
                                {
                                    body: body1,
                                    origin: ball1Origin,
                                    anchor: ball1Anchor
                                }
                            ],
                            getJointWire() {
                                return jointWire;
                            },
                            setWireThickness(v) {
                                if (!app || !design.thickness) return;
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
                                if (!app || !design.thickness) return;
                                roundCap.tint = c;
                                roundECap.tint = c;
                                jointWire.tint = c;
                            },
                            destroy() {
                                roundCap && roundCap.parent?.removeChild(roundCap);
                                roundECap && roundECap.parent?.removeChild(roundECap);
                                jointWire && jointWire.parent?.removeChild(jointWire);
                                design.thickness && pixics.unupdate(update);
                                world.DestroyJoint(joint);
                            }
                        });
                        let roundCap;
                        let roundECap;
                        let jointWire;
                        if (app && design.thickness) {
                            roundCap = new PIXI.Graphics();
                            roundECap = new PIXI.Graphics();
                            jointWire = new PIXICS.Line();
                            app.stage.addChild(roundCap);
                            app.stage.addChild(roundECap);
                            app.stage.addChild(jointWire);
                        }
                        joint.GetUserData().setWireThickness(design.thickness);
                        joint.GetUserData().setColor(design.color);
                        function update(dt) {
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
                        }
                        app && design.thickness && pixics.update(update);
                        return joint;
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
