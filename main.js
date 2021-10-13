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
            cp.y += cha.y;
            thing.setPosition(cp.x, -cp.y);
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
   const gravity = { x: 0, y: -30 }; // 중력을 설정한다. 중력의 방향이다 0, -200 으로 설정하면 아래로 200만큼의 힘으로 잡아당긴다
   const pixics = PIXICS.createWorld(100, ratio, gravity, true, display); // 첫번째 인자의 숫자는 커질수록 요소의 움직임이 빨라진다. 빨라지는 이유는 실제 화면상 픽셀수와 피직스월드의 수치와의 스케일을 나타내는 값이기 때문이다.
   const world = pixics.world;
   const L = pixics.log;
   pixics.update(function (dt) { /*매프레임(1/60sec)마다 수행시킬코드*/ });


   L('길다란 화면너비만큼의 막대기 생성');
   // let stick = new PIXICS.PhysicsGraphics({ world });
   // // stick.drawRect(0, 0, 10, 10);
   // //
   // let qq = 1080 * 0.25 * ratio;
   // stick.drawRect(0, qq, 1080 * 0.25 * ratio, 108 * 0.5 * ratio);
   // stick.drawRect(0, -qq, 1080 * 0.25 * ratio, 108 * 0.5 * ratio);
   // // stick.drawRect(0, 1, 1080 * 0.25 * ratio, 108 * 0.5 * ratio);
   // // stick.drawRect(0, 3*ratio, 1080 * 0.5 * ratio, 108 * 0.5 * ratio);
   // // stick.setPosition(0, -1920 * 0.5 * ratio);
   // stick.getGraphic().tint = 0x44aa44;
   // app.stage.addChild(stick.getGraphic());
   // await pixics.sleep(500);


   //------------------------------
   L('메인 코드의 시작');
   await pixics.sleep(10);

   {
      // polyObj.drawCircle(130+(1080 * 2) * ra * ratio, 0, 40 * ratio);
      // polyObj.drawPolygon([
      //    { x: 0, y: 0 },
      //    { x: 0, y: 130 },
      //    { x: 130, y: 130 },
      // ]);
      let polyObj = new PIXICS.PhysicsGraphics({ world });
      let ra = 0.5;
      polyObj.drawRect(0 + 0, 1920 * ra * ratio, 1080 * ra * ratio, 20 * ratio);
      polyObj.drawRect(0 + 0, -1920 * ra * ratio, 1080 * ra * ratio, 20 * ratio);
      polyObj.drawRect(0 + -1080 * ra * ratio, 0, 20 * ratio, 1920 * ra * ratio);
      polyObj.drawRect(0 + 1080 * ra * ratio, 0, 20 * ratio, 1920 * ra * ratio);
      // polyObj.setDynamic();
      polyObj.getBody().SetGravityScale(0);
      app.stage.addChild(polyObj.getGraphic());
      // polyObj.drawRect(0 + (1080 * 2) * ra * ratio, 0, 20 * ratio, (1920 * 0.5) * ra * ratio);
      // polyObj.drawCircle(0 + 0, 0, 40 * ratio,0xffff00);
      // polyObj.getBody().SetAngularVelocity(1);
      // polyObj.setPosition(1080 * 0.5 * ratio, 1920 * 0.5 * ratio);

      // polyObj.setPosition()
      // polyObj.setPosition(0,0)
   }
   {
      for (let i = 0; i < 4; i++) {
         await pixics.sleep(1000);

         let polyObj = new PIXICS.PhysicsGraphics({ world });
         let ra = 0.05;
         polyObj.drawRect(0 + 0, 1920 * ra * ratio, 1080 * ra * ratio, 20 * ratio);
         polyObj.drawRect(0 + 0, -1920 * ra * ratio, 1080 * ra * ratio, 20 * ratio);
         polyObj.drawRect(0 + -1080 * ra * ratio, 0, 20 * ratio, 1920 * ra * ratio);
         polyObj.drawRect(0 + 1080 * ra * ratio, 0, 20 * ratio, 1920 * ra * ratio);
         polyObj.drawRect(0 + 108 * ra * ratio, 0, 20 * ratio, 1920 * 0.1 * ratio);
         polyObj.setDynamic();
         polyObj.setPosition(i * 10, 300)
         // polyObj.getBody().SetGravityScale(0);
         app.stage.addChild(polyObj.getGraphic());
      }

   }

   // let polyObj = new PIXICS.PhysicsGraphics({ world });
   // polyObj.drawRect(0, 0, 108 * 0.5 * ratio, 108 * 0.5 * ratio);
   // polyObj.setDynamic();
   // polyObj.getBody().SetGravityScale(0);
   // app.stage.addChild(polyObj.getGraphic());
   // polyObj.getBody().SetAngularVelocity(0.010);
   // for(let i=0;i<10;i++){
   // }
   // {
   //    let polyObj = new PIXICS.PhysicsGraphics({ world });
   //    app.stage.addChild(polyObj.getGraphic());
   // }
   // {
   //    let polyObj = new PIXICS.PhysicsGraphics({ world });
   //    app.stage.addChild(polyObj.getGraphic());
   // }
   // {
   //    let polyObj = new PIXICS.PhysicsGraphics({ world });
   //    app.stage.addChild(polyObj.getGraphic());
   // }



});