window.addEventListener('load', async () => {
   // return
   function pickRandomColor() {
      let colors = [0x6aaaaa, 0x6aaa6a, 0xaa6a6a, 0xaa6a6a, 0xfaa6a0, 0xaa0aa0];
      let rn = Math.floor(Math.random() * colors.length);
      return colors[rn];
   }
   const { app, pixics, world, size, PIXICS, b2, math } = await initPixics({
      resolution: { width: 108, height: 192 },
      rotation: true,
      fpsmonitor: true,
      container: document.querySelector('body'),
      gravity: { x: 0, y: -10 },
      worldscale: 5,
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


   //------------------------------
   L('메인 코드의 시작');
   await pixics.sleep(10);

   L('바운더리 생성');
   let tickness = 0.2 * ratio * 2;
   let boundary = new PIXICS.PhysicsGraphics({ world });
   boundary.getBody().SetBullet(true);
   boundary.drawRect(width / 2, 0, tickness, height / 2);
   boundary.drawRect(-width / 2, 0, tickness, height / 2);
   boundary.drawRect(0, height / 2, width / 2, tickness);
   boundary.drawRect(0, -height / 2, width / 2, tickness);
   app.stage.addChild(boundary.getGraphic());

   L('도형생성');
   let ball1 = new PIXICS.PhysicsGraphics({ world });
   ball1.drawRect(0, 0, 5 * ratio * 2, 5 * ratio * 2)
   ball1.setDynamic();
   ball1.getBody().SetType(b2.BodyType.b2_kinematicBody);
   ball1.getBody().SetAngularVelocity(1)
   ball1.getBody().SetGravityScale(-2)
   ball1.setFriction(0, 0);
   ball1.getGraphic().alpha = 0.5;
   app.stage.addChild(ball1.getGraphic());
   // setDragable(ball1)

   L('도형생성');
   let ball2 = new PIXICS.PhysicsGraphics({ world });
   ball2.drawRect(0, 0, 5 * ratio * 2, 5 * ratio * 2)
   ball2.drawRect(10 * ratio, 0, 5 * ratio * 2, 5 * ratio * 2)
   ball2.setFriction(0, 0);
   ball2.setFriction(0, 1);
   ball2.setDynamic();
   ball2.getGraphic().alpha = 0.5;
   app.stage.addChild(ball2.getGraphic());
   // setDragable(ball2)
   ball2.setPosition(0, -12 * ratio)
   ball2.getGraphic().tint = 0xff00ff

   L('도형생성');
   let ball3 = new PIXICS.PhysicsGraphics({ world });
   ball3.drawRect(0, 0, 5 * ratio * 2, 5 * ratio * 2)
   ball3.drawRect(10 * ratio, 0, 5 * ratio * 2, 5 * ratio * 2)
   ball3.setFriction(0, 0);
   ball3.setFriction(0, 1);
   ball3.setDynamic();
   ball3.getGraphic().alpha = 0.5;
   app.stage.addChild(ball3.getGraphic());
   // setDragable(ball3)
   ball3.setPosition(0, -24 * ratio)
   ball3.getGraphic().tint = 0xff00ff

   L('조인트 연결');
   let joint1 = pixics.setJoint({ body: ball1, x: 0 * ratio, y: 0 * ratio }, { body: ball2, x: 5 * ratio, y: 5 * ratio }, { collideConnected: true }, { app, color: 0x00ffff, thickness: 1.5 * ratio })
   let joint2 = pixics.setJoint({ body: ball2, x: 0 * ratio, y: -5 * ratio }, { body: ball3, x: 0 * ratio, y: 5 * ratio }, { collideConnected: true }, { app, color: 0x00ffff, thickness: 0.5 * ratio })
   let joint3 = pixics.setJoint([ball2, 10 * ratio, -5 * ratio], { body: ball3, x: 10 * ratio, y: 5 * ratio }, { collideConnected: true }, { app, color: 0x00ffff, thickness: 0.5 * ratio })

   console.log(pixics.getJointList()[0] === joint1)
   console.log(pixics.getJointList()[1] === joint2)
   console.log(pixics.getJointList()[2] === joint3)
   // console.log(joint2);

   await pixics.sleep(2000);
   L('조인트 파괴');
   joint2.GetUserData().destroy()

   await pixics.sleep(2000);
   L('도형 파괴');
   // 도형을 파괴하면 연결되있던 조인트도 제거된다
   ball1.destroy();

});