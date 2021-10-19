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
   const display = displaySystem(130, 150, true); // 스크린너비, 스크린높이, 성능측정모니터사용여부
   const app = display.createPIXIApp(); // 화면을 생성한다 PIXI Application Stage 를 생성한다
   const { ratio, width, height } = display; // 계산된 실제 화면크기를 얻는다. width/ratio 한 값은 displaySystem 함수 첫번째인자로 넣은 숫자와 같다.
   document.querySelector('body').appendChild(app.view);

   //------------------------------
   // 피직스월드의 준비
   const gravity = { x: 0, y: -10 }; // 중력을 설정한다. 중력의 방향이다 0, -200 으로 설정하면 아래로 200만큼의 힘으로 잡아당긴다
   const pixics = PIXICS.createWorld(7, ratio, gravity, true, display); // 첫번째 인자의 숫자는 커질수록 요소의 움직임이 빨라진다. 빨라지는 이유는 실제 화면상 픽셀수와 피직스월드의 수치와의 스케일을 나타내는 값이기 때문이다.
   const world = pixics.world;
   const L = pixics.log;

   //------------------------------
   L('메인 코드의 시작');
   await pixics.sleep(10);

   L('바운더리 생성');
   let tickness = 0.2 * ratio;
   let boundary = new PIXICS.PhysicsGraphics({ world });
   boundary.getBody().SetBullet(true);
   boundary.drawRect(width / 2, 0, tickness, height);
   boundary.drawRect(-width / 2, 0, tickness, height);
   boundary.drawRect(0, height / 2, width, tickness);
   boundary.drawRect(0, -height / 2, width, tickness);
   app.stage.addChild(boundary.getGraphic());

   {

      let ball1 = new PIXICS.PhysicsGraphics({ world });
      ball1.drawRect(0 * ratio, 0 * ratio, 5 * ratio, 5 * ratio)
      ball1.getBody().SetType(b2.BodyType.b2_kinematicBody);
      app.stage.addChild(ball1.getGraphic());
      ball1.setPosition(-40 * ratio, 60 * ratio);


      let ball2 = new PIXICS.PhysicsGraphics({ world });
      ball2.drawRect(00 * ratio, 0 * ratio, 10 * ratio, 5 * ratio)
      ball2.getGraphic().alpha = 0.5;
      app.stage.addChild(ball2.getGraphic());
      ball2.setPosition(-30 * ratio, 40 * ratio);
      ball2.setDynamic();
      ball2.getGraphic().interactive = true;
      ball2.getGraphic().on('mousedown', e => {
         ball2.getBody().SetLinearVelocity(new b2.Vec2(10, 0));
      });

      pixics.setJoint(
         { body: ball1, x: 0 * ratio, y: 0 * ratio },
         { body: ball2 },
         { collideConnected: true },
         { app, color: 0x00aaff, thickness: 1.5 * ratio }
      );
   }


});