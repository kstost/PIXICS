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

   let bl = new PIXICS.PhysicsGraphics({ world });
   bl.drawCircle(0, 0, 100 * ratio, 0x00ff00);
   bl.drawRect(100 * ratio, -100 * ratio, 100 * ratio, 100 * ratio, 0xff0000);
   bl.drawCircle(0, 300 * ratio, 100 * ratio);
   // bl.setDynamic()
   app.stage.addChild(bl.getGraphic());
   bl.setFixtureProp(true, 'sensor', 1);


   bl.getDraw(0).alpha = 0.5;
   bl.getDraw(0).color = 0xff00ff;
   bl.getDraw(0).radius = 100 * ratio;
   bl.getDraw(1).alpha = 0.9;
   bl.getDraw(1).y = 100 * ratio;
   bl.getDraw(1).width = 100 * ratio;
   bl.getDraw(1).x = 1;
   console.log(bl.getDraw(1).x);
   // console.log(bl.getFixtureValues(0))
   // console.log(100 * ratio);
   // console.log(bl.getFixture(0).drawingProfile.rawArg[2])
   // console.log(bl.getFixture(1).drawingProfile.rawArg[1])
   // console.log(bl.getFixture(1).drawingProfile.rawArg[2])

   // bl.setDrawColor(0, 0xff0000, 0.5);

   //


   // let type = bl.getDrawType(idx);
   // if (PIXICS.DrawType.RECTANGLE === type) {
   // }

















   // console.clear()
   // bl.redrawFixture()
   // console.log()
   // console.log(bl.getFixtures()[1].drawingProfile.arg)

   // bl.setFixtureProp(true, 'sensor', 1)
   // window.ddd = bl;



});