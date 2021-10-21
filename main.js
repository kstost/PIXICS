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
   const display = displaySystem(1080, 1920, true); // 스크린너비, 스크린높이, 성능측정모니터사용여부
   const app = display.createPIXIApp(); // 화면을 생성한다 PIXI Application Stage 를 생성한다
   const { ratio, width, height } = display; // 계산된 실제 화면크기를 얻는다. width/ratio 한 값은 displaySystem 함수 첫번째인자로 넣은 숫자와 같다.
   document.querySelector('body').appendChild(app.view);

   //------------------------------
   // 피직스월드의 준비
   const gravity = { x: 0, y: -10 }; // 중력을 설정한다. 중력의 방향이다 0, -200 으로 설정하면 아래로 200만큼의 힘으로 잡아당긴다
   const pixics = PIXICS.createWorld(200, ratio, gravity, true, display); // 첫번째 인자의 숫자는 커질수록 요소의 움직임이 빨라진다. 빨라지는 이유는 실제 화면상 픽셀수와 피직스월드의 수치와의 스케일을 나타내는 값이기 때문이다.
   const world = pixics.world;
   const L = pixics.log;


   //

   //------------------------------
   L('메인 코드의 시작');
   await pixics.sleep(10);

   L('바운더리 생성');
   let tickness = 2 * ratio;
   let boundary = new PIXICS.PhysicsGraphics({ world });
   boundary.getBody().SetBullet(true);
   boundary.drawRect(width * 0.7 / 2, 0, tickness, width * 0.35);
   boundary.drawRect(-width * 0.7 / 2, 0, tickness, width * 0.35);
   boundary.drawRect(0, width * 0.7 / 2, width * 0.35, tickness);
   boundary.drawRect(0, -width * 0.7 / 2, width * 0.35, tickness);
   (async () => {
      while (true) await boundary.rotateEaseBy(Math.PI / 8, 4000);
   })();
   app.stage.addChild(boundary.getGraphic());
   await pixics.sleep(500);

   let list = [];
   for (let i = 0; i < 40; i++) {
      L(`공${i+1} 생성`);
      !(i % 1) && await pixics.sleep(1);
      let cir = new PIXICS.PhysicsGraphics({ world });
      cir.drawCircle(0 * ratio, 0 * ratio, (50) * ratio)
      cir.setDynamic()
      cir.addIgnoreContact(boundary);
      cir.setGravityScale(1)
      cir.setPosition((0.5 - Math.random()) * width * 0.5, (0.5 - Math.random()) * width * 0.5)
      cir.getBody().SetLinearVelocity(new b2.Vec2(1 * ratio * (0.5 - Math.random()), 1 * ratio * (0.5 - Math.random())));
      app.stage.addChild(cir.getGraphic());
      cir.getGraphic().interactive = true;
      setEvent(cir.getGraphic(), ['mousedown', 'touchstart'], e => {
         cir.destroy();
      });
      let text = new PIXI.Text('', { fontFamily: 'Arial', fontSize: 70 * ratio, fill: 0x000000, align: 'center' });
      cir.getGraphic().addChild(text);
      function setLabel(val) {
         text.text = val;
         text.x = -(text.width / 2)
         text.y = -(text.height / 2)
      }
      cir.setRestitution(0);
      cir.setTag(i);
      list.push(cir);
      pixics.update(function () {
         let vd = cir;
         vd.getGraphic().tint = vd.getContactCount() ? 0xaa77ff : 0xffffff;
         setLabel(vd.getContactCount());
      })
   }
   for (let i = 0; 1 && i < list.length; i++) {
      for (let j = 0; j < list.length; j++) {
         let vd = list[i];
         let vx = list[j];
         vd.addEvent('contact', vx, function (vx) {
            // console.log('on_', vd.getTag())
         });
         vd.addEvent('untact', vx, function (vx) {
            // console.log('off', vd.getTag())
         });
      }
   }

});