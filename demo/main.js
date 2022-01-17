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



   // _static.addEvent('untact', boundary, function (boundary) {
   //    console.log('볼1')
   // });
   // boundary.addEvent('contact', _static, function (_static) {
   //    console.log('바운더리')
   // });
   // _static.addEvent('contact', boundary, function (boundary) {
   //    console.log('볼2')
   // });

   
   L('바운더리 생성');
   let tickness = 10 * ratio;
   let boundary = new PIXICS.PhysicsGraphics({ world });
   boundary.getBody().SetBullet(true);
   boundary.drawRect(width / 2, 0, tickness, height);
   boundary.drawRect(-width / 2, 0, tickness, height);
   boundary.drawRect(0, height / 2, width, tickness);
   boundary.drawRect(0, -height / 2, width, tickness);
   app.stage.addChild(boundary.getGraphic());


   let ball = new PIXICS.PhysicsGraphics({ world });
   ball.drawCircle(0, 0, width / 2 * 0.1 * ratio, 0xffffff);
   ball.setPosition((-width * 0.25) + (Math.random() * width * 0.5), 800 * ratio)
   ball.setDynamic();
   ball.setRestitution(1)
   app.stage.addChild(ball.getGraphic());


   // boundary.addEvent('contact', ball, function (ball) {
   //    L('바운더리')
   // });
   ball.addEvent('contact', boundary, boundary => { L('볼1'); });
   ball.addEvent('contact', boundary, boundary => { L('볼2'); });
   // ball.addEvent('contact', boundary, boundary => { L('볼3'); });
   // ball.addEvent('contact', boundary, boundary => { L('볼3'); });
   // ball.addEvent('contact', boundary, boundary => { L('볼1'); });





   return;


   let heightss = 50;
   class Bar {
      constructor({ width, color }) {
         this.width = width;
         this.color = color;
         let _static = new PIXICS.PhysicsGraphics({ world });
         _static.drawRect(0, 0, this.width, heightss * ratio, 0xffffff);
         _static.getGraphic().tint = color;
         // _static.setPosition(height / 2, 0);
         app.stage.addChild(_static.getGraphic());
         this.pg = _static;
      }
      run() {
         this.pg.setUpdate(e => {
            console.log(e)
         });
      }
      set pos(pos) {
         this.pg.setPosition((0) + (this.width * pos) + (-width / 2) + this.width / 2, -height / 2)
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
   let div = 1;
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
      setContact();
   }
   // for (let i = 0; i < 100; i++) {
   //    generateLine();
   // }
   // setI
   pixics.update((deltatime, resolver, accumulator) => {
      if (!(accumulator % (PIXICS.framerate * 200))) {
         generateLine();
         bars.forEach(async bar => {
            await pixics.sleep(Math.random() * 200)
            bar.pg.moveEaseBy(0, -heightss * ratio, 1000, 'easeOutElastic')
         });
      }
   }, -1);
   let balls = [];
   pixics.update((deltatime, resolver, accumulator) => {
      if (!(accumulator % (PIXICS.framerate * 200))) {
         let _static = new PIXICS.PhysicsGraphics({ world });
         _static.drawCircle(0, 0, width / 2 * 0.1 * ratio, 0xffffff);
         // _static.getGraphic().tint = color;
         _static.setPosition((-width * 0.25) + (Math.random() * width * 0.5), 800 * ratio)
         _static.setDynamic();
         _static.setRestitution(1)
         app.stage.addChild(_static.getGraphic());
         balls.push(_static);
         setContact();
      }
   }, -1);

   function setContact() {
      balls.forEach(async ball => {
         bars.forEach(async bar => {
            bar.pg.addEvent('contact', ball, function (ball) {
               bar.pg.destroy();
            });
         });
      });

   }

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