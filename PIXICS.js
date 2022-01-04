const PIXICS = (() => {
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
        function drawRect(gr, x, y, width, height, color) {
            width = width * 2;
            height = height * 2;
            gr.beginFill(color);
            gr.drawRect(x - (width * 0.5), -y - (height * 0.5), width, height);
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
            let radian = ksttool.math.get_angle_in_radian_between_two_points(pp, { x: 0, y: 0 });
            let leng = -(ksttool.math.get_distance_between_two_point({ x: 0, y: 0 }, pp));
            let rr = radian - gr.GetAngle();
            let pont = ksttool.math.get_coordinate_distance_away_from_center_with_radian(leng, { x: 0, y: 0 }, rr)
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
            let radian = ksttool.math.get_angle_in_radian_between_two_points(pp, { x: 0, y: 0 });
            let leng = -(ksttool.math.get_distance_between_two_point({ x: 0, y: 0 }, pp));
            let rr = radian - gr.GetAngle();
            let pont = ksttool.math.get_coordinate_distance_away_from_center_with_radian(leng, { x: 0, y: 0 }, rr)
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
            let radian = ksttool.math.get_angle_in_radian_between_two_points(pp, { x: 0, y: 0 });
            let leng = -(ksttool.math.get_distance_between_two_point({ x: 0, y: 0 }, pp));
            let rr = radian - gr.GetAngle();
            let pont = ksttool.math.get_coordinate_distance_away_from_center_with_radian(leng, { x: 0, y: 0 }, rr)
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
            drawRect(x, y, width, height, color) {
                drawRect(gr, x, y, width, height, color);
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



    let Ease = {};

    Ease.easeOutElastic = function (t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) *
            (2 * Math.PI) / p) + c + b;
    };

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
        tag = null;
        constructor({ world }) {
            this.world = world;
            this.graphic = makeGraphic(center);//new PIXI.Graphics();
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
        setTag(v) {
            this.tag = v;
        }
        getTag() {
            return this.tag;
        }
        getContactCount() {
            return this.contacts.size;
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
            if (this.ignoreContact.has(body)) return;
            if (mode) {
                if (!this.contacts.has(body)) {
                    this.contacts.set(body, mode);
                    let cb = this.getCBFunc(body, 'contact');
                    cb && cb(body);
                }
            } else {
                if (this.contacts.has(body)) {
                    this.contacts.delete(body);
                    let cb = this.getCBFunc(body, 'untact');
                    cb && cb(body);
                }
            }
        }
        getCBFunc(boundary, mode) {
            let dt = this.stickState.get(boundary);
            return dt?.cbs[mode]?.cbf
        }
        removeEvent(mode, boundary) {
            let dt = this.stickState.get(boundary);
            dt && delete dt.cbs[mode];
            if (Object.keys(dt.cbs).length === 0) {
                this.stickState.delete(boundary)
            }
        }
        addEvent(mode, boundary, cbf) {
            let dt = this.stickState.get(boundary);
            if (dt) { } else {
                dt = { body: boundary, prevstate: false, cbs: {} };
                this.stickState.set(boundary, dt);
            };
            dt.cbs[mode] = { cbf }
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
            if (PLANCKMODE) {
                for (let b = bbb.planckBody.getContactList(); b; b = b.next) {
                    let aa = b.contact.getFixtureA().getBody();
                    let bb = b.contact.getFixtureB().getBody();
                    if (bbb.planckBody !== aa) { !contactList.has(aa) && contactList.set(aa, true) }
                    if (bbb.planckBody !== bb) { !contactList.has(bb) && contactList.set(bb, true) }
                }
            } else {
                for (let b = bbb.planckBody.GetContactList(); b; b = b.next) {
                    let aa = b.contact.GetFixtureA().GetBody();
                    let bb = b.contact.GetFixtureB().GetBody();
                    if (bbb.planckBody !== aa) { !contactList.has(aa) && contactList.set(aa, true) }
                    if (bbb.planckBody !== bb) { !contactList.has(bb) && contactList.set(bb, true) }
                }
            }
            return [...contactList.keys()];
        }
        easingTo(x, y, d, f) {
            if (!f) f = 'linearTween';
            f = Ease[f];
            const _point = this;
            const pixics = point.pixics;
            let max = y !== null ? getMovableMaxDistancePerFrame() : Math.PI / 2;
            let ticktime = (1 / magicNumber) * 1000;
            let startPoint;// = this.getPosition();
            let endPoint;// = { x, y };
            let radian;// = ksttool.math.get_angle_in_radian_between_two_points(startPoint, endPoint); // 엘라스틱에서 신경쓰자.
            let moveLength;// = ksttool.math.get_distance_between_two_point(startPoint, endPoint);
            if (y !== null) {
                startPoint = this.getPosition();
                startPoint.y *= -1;
                endPoint = { x, y };
                radian = ksttool.math.get_angle_in_radian_between_two_points(startPoint, endPoint); // 엘라스틱에서 신경쓰자.
                moveLength = ksttool.math.get_distance_between_two_point(startPoint, endPoint);
            } else {
                startPoint = this.getAngle();
                endPoint = x;
                moveLength = (endPoint - startPoint);// * magicNumber;
            }
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
            if (PLANCKMODE) {
                this.getBody().setKinematic();
            } else {
                this.getBody().SetType(b2.BodyType.b2_kinematicBody);
            }
            return new Promise(r => {
                let cnt = 0;
                pixics.update(function upf(tk) {
                    if (tasks[cnt] === undefined) {
                        if (y !== null) {
                            if (PLANCKMODE) {
                                _point.getBody().setLinearVelocity(planck.Vec2(0, 0))
                            } else {
                                _point.getBody().SetLinearVelocity(new b2.Vec2(0, 0))
                            }
                            _point.setPosition(x, -y);
                        } else {
                            if (PLANCKMODE) {
                                _point.getBody().setAngularVelocity(0)
                            } else {
                                _point.getBody().SetAngularVelocity(0)
                            }
                            _point.setAngle(x);
                        }
                        pixics.unupdate(upf);
                        r();
                        return;
                    }
                    let distanceToMoveOnThisTick = tasks[cnt];
                    let point = _point;
                    if (y !== null) {
                        let s = getVelocityPerFrame(distanceToMoveOnThisTick);//*0.0001;
                        let _startPoint = point.getPosition();
                        _startPoint.y *= -1;
                        let rtn = ksttool.math.get_coordinate_distance_away_from_center_with_radian(s, _startPoint, radian);
                        if (PLANCKMODE) {
                            point.getBody().setLinearVelocity(planck.Vec2(rtn.x - _startPoint.x, _startPoint.y - rtn.y))
                        } else {
                            point.getBody().SetLinearVelocity(new b2.Vec2(rtn.x - _startPoint.x, _startPoint.y - rtn.y))
                        }
                    } else {
                        if (PLANCKMODE) {
                            point.getBody().setAngularVelocity(distanceToMoveOnThisTick * magicNumber)
                        } else {
                            point.getBody().SetAngularVelocity(distanceToMoveOnThisTick * magicNumber)
                        }
                    }
                    cnt++;
                });
            });


            // console.log('w', whole);
            // console.log(acc-d)
            // let lastAmount = d%ticktime;

            // console.log(d,ticktime, d%ticktime)
            // console.log(f)

        }
        // async moveBy(x, y, s) {
        //     let startPoint = this.getPosition();
        //     await this.moveTo(startPoint.x + x, startPoint.y + y, s);
        // }
        // moveTo(x, y, s) {
        //     //working
        //     const pixics = point.pixics;
        //     this.getBody().setKinematic();
        //     return new Promise(r => {
        //         let point = this;
        //         let startPoint = point.getPosition();
        //         let endPoint = { x, y };
        //         var moveLength = ksttool.math.get_distance_between_two_point(startPoint, endPoint); // 충돌벽 길이
        //         let moveDistance = getMoveDistancePerFrame(s);
        //         let maxDistance = getMovableMaxDistancePerFrame();
        //         let frid = moveDistance >= maxDistance ? maxDistance : moveDistance;
        //         if (frid > moveLength) s = getVelocityPerFrame(moveLength)
        //         var radian = ksttool.math.get_angle_in_radian_between_two_points(startPoint, endPoint);
        //         var rtn = ksttool.math.get_coordinate_distance_away_from_center_with_radian(s, startPoint, radian);
        //         point.getBody().setLinearVelocity(planck.Vec2(rtn.x - startPoint.x, startPoint.y - rtn.y))
        //         let beforeLength = 0;
        //         let endtrigger = false;
        //         pixics.update(function upf() {
        //             let currentPoint = point.getPosition();
        //             var currentLength = ksttool.math.get_distance_between_two_point(startPoint, currentPoint); // 충돌벽 길이
        //             let moveStep = currentLength - beforeLength;
        //             0 && console.log('*뭅', moveStep);
        //             beforeLength = currentLength;
        //             function final() {
        //                 point.getBody().setLinearVelocity(planck.Vec2(0, 0))
        //                 1 && point.setPosition(x, y);
        //                 0 && console.log('끝');
        //                 pixics.unupdate(upf);
        //                 r();
        //             }
        //             if (!endtrigger && moveLength <= currentLength + moveStep) {
        //                 endtrigger = true;
        //                 let currentLength2 = ksttool.math.get_distance_between_two_point(currentPoint, endPoint);
        //                 if (currentLength2 > Number.EPSILON * 100000000) {
        //                     let s = pixics.getVelocityPerFrame(currentLength2);
        //                     var rtn = ksttool.math.get_coordinate_distance_away_from_center_with_radian(s, currentPoint, radian);
        //                     point.getBody().setLinearVelocity(planck.Vec2(rtn.x - currentPoint.x, currentPoint.y - rtn.y))
        //                 } else {
        //                     final();
        //                 }
        //             } else {
        //                 endtrigger && final();
        //             }
        //         });
        //     })
        // }
        async rotateEaseBy(x, duration, f) {
            let startPoint = this.getAngle();
            await this.rotateEaseTo(startPoint + x, duration, f);
        }
        async moveEaseBy(x, y, duration, f) {
            let startPoint = this.getPosition();
            startPoint.y *= -1;
            await this.moveEaseTo(startPoint.x + x, startPoint.y + y, duration, f);
        }
        async moveBy(x, y, duration, f) {
            let startPoint = this.getPosition();
            startPoint.y *= -1;
            await this.moveEaseTo(startPoint.x + x, startPoint.y + y, duration, f);
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
        // xxxxeasingTo(x, y, duration, f) {
        //     const pixics = point.pixics;
        //     const ratio = point.ratio;
        //     if (!f) f = 'linearTween';
        //     f = Ease[f];
        //     this.getBody().setKinematic();
        //     return new Promise(r => {
        //         let _point = this;
        //         let startPoint;// = _point.getPosition();
        //         let endPoint;// = { x, y };
        //         if (y !== null) {
        //             startPoint = _point.getPosition();
        //             endPoint = { x, y };
        //         } else {
        //             startPoint = _point.getAngle();
        //             endPoint = x;
        //         }
        //         let startTime = 0;//new Date();
        //         let boj = magicNumber * (1 / (PIXICS.worldscale / ratio));
        //         let moveLength;
        //         let radian;
        //         if (y !== null) {
        //             moveLength = ksttool.math.get_distance_between_two_point({
        //                 x: startPoint.x / ratio * boj,
        //                 y: startPoint.y / ratio * boj,
        //             }, {
        //                 x: endPoint.x / ratio * boj,
        //                 y: endPoint.y / ratio * boj,
        //             }); // 충돌벽 길이
        //             radian = ksttool.math.get_angle_in_radian_between_two_points(startPoint, endPoint);
        //         } else {
        //             moveLength = (endPoint - startPoint) * magicNumber;
        //         }
        //         let bf = 0;
        //         pixics.update(function upf(dt) {
        //             // console.log(dt);
        //             startTime += dt;
        //             let currentTime = (startTime / magicNumber) * 1000;//new Date() - startTime;
        //             let rat = currentTime / duration;
        //             if (rat >= 1) { rat = 1; }
        //             let fv = f(rat, 0, 1, 1);
        //             let st = (fv - bf)
        //             bf = fv;
        //             // let cur = ksttool.math.get_coordinate_between_two_points(startPoint, endPoint, fv);
        //             if (false) {
        //                 // _point.setPosition(cur.x, cur.y)
        //             } else {
        //                 if (y !== null) {
        //                     var rtn = ksttool.math.get_coordinate_distance_away_from_center_with_radian(st * moveLength, startPoint, radian);
        //                     _point.getBody().setLinearVelocity(planck.Vec2(rtn.x - startPoint.x, startPoint.y - rtn.y))
        //                 } else {
        //                     _point.getBody().setAngularVelocity((st * moveLength))
        //                 }
        //             }
        //             if (rat === 1) {
        //                 if (y !== null) {
        //                     // var rtn = ksttool.math.get_coordinate_distance_away_from_center_with_radian(st * moveLength, startPoint, radian);
        //                     _point.getBody().setLinearVelocity(planck.Vec2(0, 0))
        //                     _point.setPosition(x, y);
        //                 } else {
        //                     _point.getBody().setAngularVelocity(0)
        //                     _point.setAngle(x);
        //                 }
        //                 // if (y !== null) {
        //                 //     _point.setPosition(x, y);
        //                 // } else {
        //                 //     _point.setAngle(x);
        //                 // }
        //                 pixics.unupdate(upf);
        //                 r();
        //             }
        //         });
        //     })
        // }

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
                    fixture = butter.drawRect(
                        (((center.x - data.pivotpoint.x) + width) / data.scale) * scale * ratio,
                        -(((center.y - data.pivotpoint.y) + height) / data.scale) * scale * ratio,
                        (width / data.scale) * scale * ratio,
                        (height / data.scale) * scale * ratio,
                        color
                    );
                }
                else if (class_ === 'circle' && layer.dots[class_].length === 2) {
                    let center = layer.dots[class_][0];
                    let another = layer.dots[class_][1];
                    let r = ksttool.math.get_distance_between_two_point(center, another);
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
                    this.graphic.drawRect(x, y, width, height, color)
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
            // y = -y
            // y*=-1;
            if (color === undefined) color = 0xffffff;
            if (PLANCKMODE) {
                let position = planck.Vec2((x + (width / 2)) / PIXICS.worldscale, -(y + (height / 2)) / PIXICS.worldscale);
                let shape = planck.Box(width / 2 / PIXICS.worldscale, height / 2 / PIXICS.worldscale, position);
                let fixture = this.createFixture(shape, { density: 1, friction: 1, restitution: 0 });
                fixture.drawingProfile = { type: this._drawRect, arg: arguments };
                fixture.drawingProfile.type.bind(this)(...arguments);
                // this._drawRect(...arguments);
                return fixture;
            } else {
                let position = new b2.Vec2(
                    x / PIXICS.worldscale,
                    y / PIXICS.worldscale
                );
                // let shape = planck.Box(width / 2 / PIXICS.worldscale, height / 2 / PIXICS.worldscale, position);
                const shape = new b2.PolygonShape();
                shape.SetAsBox(width / PIXICS.worldscale, height / PIXICS.worldscale, position);

                const fd = new b2.FixtureDef();
                fd.shape = shape;
                fd.density = 1;
                fd.friction = 1;
                fd.restitution = 0;

                let fixture = this.createFixture(fd);
                fixture.drawingProfile = { type: this._drawRect, arg: arguments };
                fixture.drawingProfile.type.bind(this)(...arguments);
                // this._drawRect(...arguments);
                // 0 && this.planckBody.SetPosition(new b2.Vec2(x / PIXICS.worldscale, y / PIXICS.worldscale));
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
            if (PLANCKMODE) {
                for (let b = this.planckBody.getContactList(); b; b = b.next) {
                    b.contact.getFixtureA().getBody().setAwake(true);
                    b.contact.getFixtureB().getBody().setAwake(true);
                }
            } else {
                for (let b = this.planckBody.GetContactList(); b; b = b.next) {
                    b.contact.GetFixtureA().GetBody().SetAwake(true);
                    b.contact.GetFixtureB().GetBody().SetAwake(true);
                }
            }
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
                    density = density ? density : 1;
                    fixtures.set(fixture, {
                        shape,
                        restitution,
                        friction,
                        density
                    });
                }
            }

            // 접해있는것의 목록을 담기
            let contactList = [];
            if (PLANCKMODE) {
                for (let b = this.planckBody.getContactList(); b; b = b.next) {
                    let aa = b.contact.getFixtureA().getBody();
                    let bb = b.contact.getFixtureB().getBody();
                    contactList.push(aa, bb);
                }
            } else {
                for (let b = this.planckBody.GetContactList(); b; b = b.next) {
                    let aa = b.contact.GetFixtureA().GetBody();
                    let bb = b.contact.GetFixtureB().GetBody();
                    contactList.push(aa, bb);
                }
            }

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
                    density
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
                contactList.forEach(contact => contact.setAwake(true));
            } else {
                contactList.forEach(contact => contact.SetAwake(true));
            }
        }
        setActive(v) { PLANCKMODE ? this.getBody().setActive(v) : null; } //oo
        isActive() { return PLANCKMODE ? this.getBody().isActive() : true; } //oo
        setAwake(v) { PLANCKMODE ? this.getBody().setAwake(v) : this.getBody().SetAwake(v); }
        isAwake() { return PLANCKMODE ? this.getBody().isAwake() : this.getBody().IsAwake(); }
        setStatic() { PLANCKMODE ? this.getBody().setStatic() : this.getBody().SetType(b2.BodyType.b2_staticBody); } // dynamic의 반대
        isStatic() { return PLANCKMODE ? this.getBody().isStatic() : this.getBody().GetType() === b2.BodyType.b2_staticBody; }
        destroy() {
            // console.log()
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
                let radian = ksttool.math.get_angle_in_radian_between_two_points(zero, cur);
                let resistance = (1 - fric);
                if (resistance < 0) resistance = 0;
                let vv = ksttool.math.get_distance_between_two_point(zero, cur);
                let dist = Math.abs(vv) * resistance;
                let rtn = ksttool.math.get_coordinate_distance_away_from_center_with_radian(dist, zero, radian);
                ball1.getBody().SetLinearVelocity(rtn);
                if (prev) {
                    let dist2 = (ksttool.math.get_distance_between_two_point(ball1.getGraphic().position, prev));
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
    let syncStateAll = world => {
        for (let body = world.GetBodyList(); body; body = body.GetNext()) {
            body.GetUserData()?.syncState();
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

    let lineList = new Map();
    let point = {
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
                }
                PostSolve(contact, impulse) {
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
                            let radian = ksttool.math.get_angle_in_radian_between_two_points(anchor, origin);
                            let leng = ksttool.math.get_distance_between_two_point(origin, anchor);
                            let center = pixics.getWorldCenter();
                            let point = ksttool.math.get_coordinate_distance_away_from_center_with_radian(leng, body.getPosition(), (-radian) + body.getAngle())
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
                update: function (cb) {
                    updateList.set(cb);
                },
                unupdate: function (cb) {
                    updateList.delete(cb);
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
