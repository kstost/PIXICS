window.addEventListener('load', async () => {
   // return
   function pickRandomColor() {
      let colors = [0x6aaaaa, 0x6aaa6a, 0xaa6a6a, 0xaa6a6a, 0xfaa6a0, 0xaa0aa0];
      let rn = Math.floor(Math.random() * colors.length);
      return colors[rn];
   }
   const { app, pixics, world, size, PIXICS, b2, math } = await initPixics({
      resolution: { width: 1080, height: 1920 },
      fpsmonitor: true,
      container: document.querySelector('body'),
      gravity: { x: 0, y: -50 },
      worldscale: 100,
      scriptlist: [
         "https://pixijs.download/v6.2.1/pixi.min.js",
         "../src/pixics.js",
         "https://cdn.jsdelivr.net/gh/flyover/box2d.ts@52eb0773a59592dc573c4bc4d0f1451676a43ef9/dist/box2d.umd.js",
      ]
   });
   const { ratio } = size;
   const { width, height } = size.actualSize;
   const L = pixics.log;
   pixics.update(function (dt) { /*매프레임(1/60sec)마다 수행시킬코드*/ });



   let tickness = 10 * ratio;
   let boundary = new PIXICS.PhysicsGraphics({ world });
   boundary.getBody().SetBullet(true);
   boundary.drawRect(width / 2, 0, tickness, height);
   boundary.drawRect(-width / 2, 0, tickness, height);
   boundary.drawRect(0, height / 2, width, tickness);
   boundary.drawRect(0, -height / 2, width, tickness);
   app.stage.addChild(boundary.getGraphic());
   // window.boundary = boundary;

   //------------------------------
   L('긴 네모를 만든다 (바닥으로 쓸거다)');
   let floor = new PIXICS.PhysicsGraphics({ world });
   floor.drawRect(0, 0, 1080 * 0.5 * size.ratio, 1920 * 0.5 * size.ratio * 0.05, 0xffaaff);
   app.stage.addChild(floor.getGraphic());

   L('긴 네모 위치를 이동시킨다');
   floor.setPosition(0, -1920 * 0.5 * size.ratio);
   await pixics.sleep(0);

   L('바디를 생성한다');
   let boxsize = (1080 * 0.25 * 0.25) * size.ratio;
   let ball = new PIXICS.PhysicsGraphics({ world });
   app.stage.addChild(ball.getGraphic());
   await pixics.sleep(500);

   L('자주색 박스 그리기');
   ball.drawRect(0, 0, boxsize, boxsize, 0xaa55aa);
   await pixics.sleep(500);

   L('하늘색 박스 그리기');
   ball.drawRect(0, boxsize * 2, boxsize, boxsize, 0x00ddf0);
   L(`${ball.getDraw(1).width === boxsize}`);
   L(`${ball.getDraw(1).y === boxsize * 2}`);
   ball.getDraw(1).width = boxsize;
   await pixics.sleep(500);

   L('주황색 박스 그리기');
   ball.drawRect(boxsize * 2, 0, boxsize, boxsize, 0xffaa00);
   await pixics.sleep(500);

   L('자주색 박스안에 원 그리기');
   ball.drawCircle(0, 0, boxsize * 0.2, 0x000000);
   await pixics.sleep(500);

   L('노란색 원 그리기 (반투명값 0.5)');
   ball.drawCircle(-boxsize, -boxsize, boxsize, 0xffdd00, 0.5);
   await pixics.sleep(500);

   L('각도바꾸기');
   ball.setAngle(Math.PI * 0.1)
   await pixics.sleep(500);

   L('중력 영향받게 하기');
   ball.setDynamic()

   L('탄성을 부여하기');
   ball.setRestitution(0.2)

   await pixics.sleep(1500);
   L('네번째 요소(반투명동그라미)를 센서화 하기');
   ball.setSensor(true, 4)

   L('네번째 요소(반투명동그라미) 색, 투명도를 바꿈.');
   await pixics.sleep(1500);
   ball.getDraw(4).color = 0xff0000;
   ball.getDraw(4).alpha = 1;

   await pixics.sleep(1500);
   L('세번째 요소(작은동그라미)를 지움');
   ball.removeDraw(3);

   await pixics.sleep(1500);
   L('다 지움 (지우기만한것임 바디는 살아있음)');
   ball.removeDraw();

   await pixics.sleep(1500);
   L('바디에 다시 그림');
   ball.setPosition(0, 0);
   ball.drawCircle(0, 0, boxsize, 0xffdd00, 0.5);



});