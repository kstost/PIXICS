window.addEventListener('load', async () => {

   function setEvent(thing, names, fn) {
      thing.interactive = true;
      [names].flat(Infinity).forEach(name => thing.on(name, fn));
   }
   function setDragable(thing) {
      let startpoint = null;
      let base = null;
      let dotposes = null;
      let dn = false;
      const onDragStart = function (event) {
         this.data = event.data; this.dragging = true;
         const newPosition = this.data.getLocalPosition(this.parent);
         startpoint = (newPosition);
         base = { x: 0, y: 0 };
         dotposes = { x: thing.x, y: thing.y };
         dn = thing.isDynamic();
         thing.setStatic()
      }
      const onDragEnd = function () {
         this.dragging = false; this.data = null;
         startpoint = null;
         base = null;
         if (dn) thing.setDynamic()
      }
      const onDragMove = function (e) {
         if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            let cha = {
               x: (newPosition.x - startpoint.x),
               y: (newPosition.y - startpoint.y),
            };
            base.x += cha.x;
            base.y += cha.y;
            let cp = thing.getPosition();
            cp.x += cha.x;
            cp.y += -cha.y;
            thing.setPosition(cp.x, cp.y);
            startpoint = (newPosition);
         }
      }
      setEvent(thing.getGraphic(), ['mousedown', 'touchstart'], onDragStart);
      setEvent(thing.getGraphic(), ['mousemove', 'touchmove'], onDragMove);
      setEvent(thing.getGraphic(), ['mouseup', 'mouseupoutside', 'touchend', 'touchendoutside'], onDragEnd);
   }
   //------------------------------
   // 스크린의 준비
   const display = displaySystem(100, 150, true); // 스크린너비, 스크린높이, 성능측정모니터사용여부
   const app = display.createPIXIApp(); // 화면을 생성한다 PIXI Application Stage 를 생성한다
   const { ratio, width, height } = display; // 계산된 실제 화면크기를 얻는다. width/ratio 한 값은 displaySystem 함수 첫번째인자로 넣은 숫자와 같다.
   document.querySelector('body').appendChild(app.view);

   //------------------------------
   // 피직스월드의 준비
   const gravity = { x: 0, y: -10 }; // 중력을 설정한다. 중력의 방향이다 0, -200 으로 설정하면 아래로 200만큼의 힘으로 잡아당긴다
   const pixics = PIXICS.createWorld(5, ratio, gravity, true, display); // 첫번째 인자의 숫자는 커질수록 요소의 움직임이 빨라진다. 빨라지는 이유는 실제 화면상 픽셀수와 피직스월드의 수치와의 스케일을 나타내는 값이기 때문이다.
   const world = pixics.world;
   const L = pixics.log;
   // let dv=
   // let dv = new Date();
   // pixics.update(function (dt) {
   //    let c = new Date();
   //    L('*'.repeat(c - dv));
   //    dv = c

   // });



   //------------------------------
   L('메인 코드의 시작');
   await pixics.sleep(10);

   // L('바운더리 생성');
   // let tickness = 10 * ratio;
   // let boundary = new PIXICS.PhysicsGraphics({ world });
   // boundary.getBody().SetBullet(true);
   // boundary.drawRect(width / 2, 0, tickness, height);
   // boundary.drawRect(-width / 2, 0, tickness, height);
   // boundary.drawRect(0, height / 2, width, tickness);
   // boundary.drawRect(0, -height / 2, width, tickness);
   // app.stage.addChild(boundary.getGraphic());

   L('복합도형을 JSON으로 만들어보자');
   /*
      JSON은 여기서 만들면 된다
      https://kstost.github.io/PIXICS/editor.html
   */
   let ball1 = new PIXICS.PhysicsGraphics({ world });
   ball1.drawRect(0, 0, 5 * ratio, 5 * ratio)
   // while (true) await stick.rotateEaseBy(Math.PI / 8, 400, 'easeOutElastic');

   // ball1.setDynamic();
   // ball1.getBody().SetType(b2.BodyType.b2_kinematicBody);
   // ball1.getBody().SetAngularVelocity(1)
   ball1.getBody().SetGravityScale(-10)
   ball1.getGraphic().alpha = 0.5;
   app.stage.addChild(ball1.getGraphic());
   setDragable(ball1)

   let ball2 = new PIXICS.PhysicsGraphics({ world });
   ball2.drawRect(0, 0, 5 * ratio, 5 * ratio)
   ball2.drawRect(10 * ratio, 0, 5 * ratio, 5 * ratio)
   ball2.setDynamic();
   // ball2.setDensity(1,0)
   // ball2.setDensity(1,1)
   // ball2.setFriction(0)
   ball2.getGraphic().alpha = 0.5;
   app.stage.addChild(ball2.getGraphic());
   setDragable(ball2)
   ball2.setPosition(0, -12 * ratio)
   ball2.getGraphic().tint = 0xff00ff
   console.log(ball2.getBody().GetPosition())
   console.log((-12 * ratio) / pixics.worldscale);
   // ball2.getBody().SetLinearVelocity(new b2.Vec2(1,1))
   // ball2.getBody().SetGravityScale(10)
   // console.log()
   setDistanceJoint(world, ball1, ball2, { x: 0 * ratio, y: 0 }, { x: 5 * ratio, y: -7 * ratio })

   function setDistanceJoint(world, ball1, ball2, anchor1, anchor2) {
      // anchor1.x = -anchor1.x;
      // anchor2.x = -anchor2.x;
      let body1 = ball1;
      let ball1Origin = { ...ball1.getPosition() };
      let ball1Anchor = anchor1;//{ x: 0, y: -5 * ratio };
      let body2 = ball2;
      let ball2Origin = { ...ball2.getPosition() };
      let ball2Anchor = anchor2;//{ x: 0, y: -7 * ratio };
      const jd = new b2.DistanceJointDef();
      let p1 = new b2.Vec2(ball1Anchor.x / pixics.worldscale, ball1Anchor.y / pixics.worldscale);
      let p2 = new b2.Vec2(ball2Anchor.x / pixics.worldscale, ball2Anchor.y / pixics.worldscale);
      jd.Initialize(body2.getBody(), body1.getBody(), p2, p1);
      jd.collideConnected = true;
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
         ]
      });

      let jointWire = new PIXICS.Line();
      jointWire.alpha = 1;
      jointWire.tint = 0xffff00;
      jointWire.thickness = 0.2 * ratio;
      app.stage.addChild(jointWire);
      pixics.update(function (dt) {
         {
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
               } else {
                  jointWire.bx = point.x + center.x;
                  jointWire.by = -point.y + center.y;
               }
            });
         }
      });
   }

   // let gr = new PIXI.Graphics();
   // gr.beginFill(0xffffff);
   // gr.drawCircle(0, 0, 3);
   // gr.endFill();
   // app.stage.addChild(gr);

   // let dot = new PIXI.Graphics();
   // dot.beginFill(0xffffff);
   // dot.drawCircle(0, 0, 3);
   // dot.endFill();
   // app.stage.addChild(dot);

   // jjj=joint;
   // dot.setPosition((1080 / 0.8) * 0.5 * ratio, 1720 * 0.5 * ratio);
   // console.log(joint);




});