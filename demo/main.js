let bars = new Map();
let balls = new Map();
let sww = true;
window.addEventListener('load', async () => {
   // return
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

   let op = new PIXICS.ObjectPool()
   pixics.update(async function (deltatime, resolver, accumulator) {
      for (let i = 0; i < 4; i++) {
         op.get(() => {
            // 생성
            // 풀에서 가지고 올때는 수행하지 않음
            console.log('생성')
            let object = new PIXICS.PhysicsGraphics({ world });
            object.drawRect(0, 0, 10, 10, 0xff0000);
            object.setDynamic();
            app.stage.addChild(object.getGraphic());
            return object;
         }, object => {
            // 초기화
            // 매번 get 할때마다 수행
            object.setPosition(Math.random() * width * 0.3, Math.random() * width * 0.3)
            object.setUpdate(async function (deltatime, resolver, accumulator) {
               if (accumulator > 60) {
                  resolver();
                  // 풀에 넣기
                  // 풀에 넣으면 화면에서 안보이게 되면서 비활성화 된다
                  // 비활성화 되면 setUpdate 걸려있는 콜백들은 수행되지 않는다
                  op.put(object);
               }
            });
         });
      }
   })

   app.stage.addChild(PIXICS.ObjectPool.memoryMonitor(width));

});