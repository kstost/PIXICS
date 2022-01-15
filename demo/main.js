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

   class Bar {
      constructor({ width }) {
         this.width = width;
         let _static = new PIXICS.PhysicsGraphics({ world });
         _static.drawRect(0, 0, this.width, 30 * ratio, 0xffffff);
         _static.getGraphic().tint = 0x00ff00;
         app.stage.addChild(_static.getGraphic());
         this.pg = _static;
      }
      run() {
         this.pg.setUpdate(e => {
            console.log(e)
         });
      }
      set pos(pos) {
         this.pg.setPosition((this.width * pos) + (-width / 2) + this.width / 2, 0)
      }
   }
   let bar = new Bar({ width: width / 4 });
   bar.pos = 1;
   // bar.run()

   // let dd=
   await pixics.update(function (deltatime, resolver, accumulator) {
      // cnt += v;
      // 0 && console.log(Math.floor(cnt / 60), new Date() - tm)
      // console.log(p);
      // p()
      console.log(accumulator);
      if (accumulator === 60) resolver()
      // console.log((p - 1) % 2);
   });
   console.log(123)



});