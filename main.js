window.addEventListener('load', async () => {

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
      // ball1.getBody().SetType(b2.BodyType.b2_kinematicBody);
      ball1.setDynamic()
      ball1.setGravityScale(0)
      app.stage.addChild(ball1.getGraphic());
      ball1.setPosition(0 * ratio, 50 * ratio);
      // ent.body.applyForceToCenter(appliedDrag, true);
      ball1.getGraphic().interactive = true;
      ball1.getGraphic().on('mousedown', e => {
         ball1.getBody().SetLinearVelocity(new b2.Vec2(0, -10))
         ball1.setResistance(0.02, e => console.log('end'));
      });

      // setTimeout(function () {
      //    ball1.getBody().ApplyForceToCenter(new b2.Vec2(0, 1000));
      // }, 100)

   }

});