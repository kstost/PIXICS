window.addEventListener('load', async () => {

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

   //------------------------------
   L('긴 네모를 만든다 (바닥으로 쓸거다)');
   let floor = new PIXICS.PhysicsGraphics({ world });
   floor.drawRect(0, 0, 1080 * 0.5 * ratio, 1920 * 0.5 * ratio * 0.05, 0xffaaff);
   app.stage.addChild(floor.getGraphic());

   L('긴 네모 위치를 이동시킨다');
   floor.setPosition(0, -1920 * 0.5 * ratio);
   await pixics.sleep(0);

   L('0x0 좌표에 동그라미를 하나 만든다');
   let boxsize = (1080 * 0.25 * 0.25) * ratio;
   let ball = new PIXICS.PhysicsGraphics({ world });
   app.stage.addChild(ball.getGraphic());

   ball.drawRect(0, 0, boxsize, boxsize, 0xaa55aa);
   ball.drawRect(0, boxsize * 2, boxsize, boxsize, 0x00ddf0);
   ball.drawRect(boxsize * 2, 0, boxsize, boxsize, 0xffaa00);
   ball.drawCircle(-boxsize, 0, boxsize, 0xffdd00);

   // ball.setPosition(0, 0)

   L('각도바꾸기 (동그라미라 각도를 바꿔도 티가 안난다)');
   // ball.setAngle(-Math.PI * 0.17)

   L('중력 영향받게 하기');
   // ball.setDynamic()

   L('탄성을 부여하기');
   ball.setRestitution(0.5)

});