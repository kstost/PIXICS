window.addEventListener('load', async () => {

   const { app, pixics, world, size, PIXICS, b2, math } = await initPixics({
      resolution: { width: 1080, height: 1920 },
      fpsmonitor: true,
      container: document.querySelector('body'),
      gravity: { x: 0, y: -30 },
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

   //------------------------------
   L('0x0 좌표에 박스를 만든다');
   L(`크기값의 관계: ${ratio * 1080} === ${width}`);
   let boxsize = (1080 / 2) * ratio;
   let rectangle = new PIXICS.PhysicsGraphics({ world });
   rectangle.drawRect(0, 0, boxsize, boxsize, 0x00ff00);
   app.stage.addChild(rectangle.getGraphic());
});