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



   class Bar {
      constructor({ width, color }) {
         this.width = width;
         this.color = color;
         let _static = new PIXICS.PhysicsGraphics({ world });
         _static.drawRect(0, 0, this.width, 30 * ratio, 0xffffff);
         _static.getGraphic().tint = color;
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
   let colors = [
      0x00ffff,
      0x00ff00,
      0xff0000,
      0xaa0000,
      0xfaa000,
      0xff0aa0,
   ];
   function pickRandomColor() {
      let rn = Math.floor(Math.random() * colors.length);
      return colors[rn];
   }
   // console.log();
   let bars = [];
   let div = 5;
   // bars.push()
   // bar.pos = 3;
   function generateLine() {
      for (let i = 0; i < div; i++) {
         let color = pickRandomColor();
         let bar = new Bar({ width: width / div, color: color })
         bar.pos = i;
         // bar.pg.setKinematic();
         bars.push(bar);
      }

   }
   for (let i = 0; i < 15; i++) {
      generateLine();
   }
   pixics.update((deltatime, resolver, accumulator) => {
      if (!(accumulator % (PIXICS.framerate * 2))) {
         // generateLine();
         bars.forEach(async bar => {
            await pixics.sleep(Math.random() * 200)
            bar.pg.moveEaseBy(0, -30 * ratio, 1000, 'easeOutElastic')
         });
      }
   }, -1);

   // bar.run()

   // let dd=
   // console.log(bar.pg.moveEaseBy(0, -1920 * 0.2 * ratio, 1000, 'easeOutElastic'))
   // await pixics.sleep(2001)
   // console.log(bar.pg.moveEaseBy(0, -1920 * 0.2 * ratio, 1000, 'easeOutElastic'))
   // console.log(bar.pg.moveEaseBy(0, -1920 * 0.2 * ratio, 400, 'easeOutElastic'))
   // bar.pg.rotateEaseBy(Math.PI, 40000, 'easeOutElastic');

   // bar.pg.moveEaseBy(-1920 * 0.1 * ratio, 0, 2000, 'easeInQuad');
   // await bar.pg.moveEaseBy(0, -1920 * 0.1 * ratio, 2000, 'easeInQuad');

   // await pixics.update(async function (deltatime, resolver, accumulator) {
   //    if (!(accumulator % 60)) {
   //       await bar.pg.moveEaseBy(0, -1920 * 0.1 * ratio, 2000, 'easeInQuad');
   //       // console.log(1);
   //    }
   // })
   // await bar.pg.setUpdate(function (deltatime, resolver, accumulator) {
   //    // cnt += v;
   //    // 0 && console.log(Math.floor(cnt / 60), new Date() - tm)
   //    // console.log(p);
   //    // p()
   //    console.log(accumulator);
   //    if (accumulator === 60) resolver()
   //    // console.log((p - 1) % 2);
   // }, 50);
   // console.log(123)



});